import { AfterViewInit, DestroyRef, Directive, ElementRef, inject, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

/**
 * Single directive that adds clear and dropdown-toggle icon buttons to a
 * Material autocomplete input. Unlike {@link LibAutocompleteActionsDirective},
 * this directive is applied directly to the `input` element and does not require
 * an anchor directive or a separate suffix component.
 *
 * Usage:
 * ```html
 * <mat-form-field appearance="outline">
 *   <mat-label>City</mat-label>
 *   <input matInput [matAutocomplete]="auto" formControlName="city" autocompleteSuffix />
 *   <mat-autocomplete #auto="matAutocomplete"> … </mat-autocomplete>
 * </mat-form-field>
 * ```
 *
 * @author Pavan Kumar Jadda
 * @since 21.8.0
 */
@Directive({
	selector: 'input[matAutocomplete][autocompleteSuffix]',
	standalone: true,
})
export class AutocompleteSuffixDirective implements AfterViewInit {
	private readonly trigger = inject(MatAutocompleteTrigger);
	private readonly el = inject(ElementRef<HTMLInputElement>);
	private readonly renderer = inject(Renderer2);
	private readonly destroyRef = inject(DestroyRef);
	private readonly ngControl = inject(NgControl, { optional: true, self: true });

	private clearBtn: HTMLElement | null = null;
	private clearPlaceholder: HTMLElement | null = null;
	private dropdownIconSpan: HTMLElement | null = null;
	private isExpanded = false;
	private readonly unlisten: (() => void)[] = [];

	ngAfterViewInit(): void {
		this.createSuffixElements();
		this.setupListeners();
		this.updateClearButtonVisibility();
	}

	private createSuffixElements(): void {
		const formField = this.el.nativeElement.closest('mat-form-field');
		if (!formField) {
			return;
		}

		const flexContainer = formField.querySelector('.mat-mdc-form-field-flex');
		if (!flexContainer) {
			return;
		}

		// Find or create the suffix wrapper
		let suffixWrapper = flexContainer.querySelector('.mat-mdc-form-field-icon-suffix');
		if (!suffixWrapper) {
			suffixWrapper = this.renderer.createElement('div');
			this.renderer.addClass(suffixWrapper, 'mat-mdc-form-field-icon-suffix');
			this.renderer.setAttribute(suffixWrapper, 'data-mat-icon-type', 'font');
			this.renderer.appendChild(flexContainer, suffixWrapper);
		}

		const container = this.renderer.createElement('div');
		this.renderer.setStyle(container, 'display', 'flex');
		this.renderer.setStyle(container, 'align-items', 'center');

		// Clear button (hidden when input is empty)
		this.clearBtn = this.createIconButton('close', 'Clear value', (e) => this.clearInput(e));
		this.renderer.setStyle(this.clearBtn, 'display', 'none');

		// Placeholder keeps layout stable when clear button is hidden
		this.clearPlaceholder = this.renderer.createElement('span');
		this.renderer.setStyle(this.clearPlaceholder, 'display', 'inline-block');
		this.renderer.setStyle(this.clearPlaceholder, 'width', '35px');

		// Dropdown toggle button
		const dropdownBtn = this.createIconButton('arrow_drop_down', 'Open options', (e) => this.togglePanel(e));
		this.dropdownIconSpan = dropdownBtn.querySelector('.material-icons');

		this.renderer.appendChild(container, this.clearBtn);
		this.renderer.appendChild(container, this.clearPlaceholder);
		this.renderer.appendChild(container, dropdownBtn);
		this.renderer.appendChild(suffixWrapper, container);
	}

	private createIconButton(iconName: string, ariaLabel: string, handler: (event: Event) => void): HTMLElement {
		const button = this.renderer.createElement('button');
		this.renderer.setAttribute(button, 'type', 'button');
		this.renderer.setAttribute(button, 'aria-label', ariaLabel);
		this.renderer.setStyle(button, 'width', '35px');
		this.renderer.setStyle(button, 'height', '35px');
		this.renderer.setStyle(button, 'padding', '0');
		this.renderer.setStyle(button, 'border', 'none');
		this.renderer.setStyle(button, 'background', 'transparent');
		this.renderer.setStyle(button, 'cursor', 'pointer');
		this.renderer.setStyle(button, 'display', 'inline-flex');
		this.renderer.setStyle(button, 'align-items', 'center');
		this.renderer.setStyle(button, 'justify-content', 'center');
		this.renderer.setStyle(button, 'border-radius', '50%');
		this.renderer.setStyle(button, 'color', 'inherit');

		const icon = this.renderer.createElement('span');
		this.renderer.addClass(icon, 'material-icons');
		this.renderer.setStyle(icon, 'font-size', '24px');
		this.renderer.appendChild(icon, this.renderer.createText(iconName));
		this.renderer.appendChild(button, icon);

		this.unlisten.push(this.renderer.listen(button, 'click', handler));
		return button;
	}

	private setupListeners(): void {
		// Track user typing
		this.unlisten.push(this.renderer.listen(this.el.nativeElement, 'input', () => this.updateClearButtonVisibility()));

		const autocomplete = this.trigger.autocomplete;

		// Track autocomplete panel open/close
		const openedSub = autocomplete.opened.subscribe(() => {
			this.isExpanded = true;
			this.updateDropdownIcon();
			this.scrollSelectedOptionIntoView();
		});
		const closedSub = autocomplete.closed.subscribe(() => {
			this.isExpanded = false;
			this.updateDropdownIcon();
			this.updateClearButtonVisibility();
		});

		// Track option selection
		const selectedSub = autocomplete.optionSelected.subscribe(() => this.updateClearButtonVisibility());

		// Track programmatic value changes via NgControl
		let valueChangesSub: { unsubscribe(): void } | null = null;
		if (this.ngControl?.control) {
			valueChangesSub = this.ngControl.control.valueChanges.subscribe(() => this.updateClearButtonVisibility());
		}

		this.destroyRef.onDestroy(() => {
			this.unlisten.forEach((fn) => fn());
			openedSub.unsubscribe();
			closedSub.unsubscribe();
			selectedSub.unsubscribe();
			valueChangesSub?.unsubscribe();
		});
	}

	private clearInput(event: Event): void {
		event.preventDefault();
		event.stopPropagation();
		this.trigger.closePanel();
		this.el.nativeElement.value = '';

		if (this.ngControl?.control) {
			this.ngControl.control.setValue(null, { emitEvent: true });
			this.ngControl.control.markAsTouched();
		}

		this.updateClearButtonVisibility();
		queueMicrotask(() => this.el.nativeElement.focus());
	}

	private togglePanel(event: Event): void {
		event.stopPropagation();
		if (this.trigger.panelOpen) {
			this.trigger.closePanel();
		} else {
			this.trigger.openPanel();
		}
	}

	private updateClearButtonVisibility(): void {
		const hasValue = !!(this.el.nativeElement.value || this.ngControl?.control?.value);
		if (this.clearBtn) {
			this.renderer.setStyle(this.clearBtn, 'display', hasValue ? 'inline-flex' : 'none');
		}
		if (this.clearPlaceholder) {
			this.renderer.setStyle(this.clearPlaceholder, 'display', hasValue ? 'none' : 'inline-block');
		}
	}

	private scrollSelectedOptionIntoView(): void {
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				const panelEl = this.trigger.autocomplete.panel?.nativeElement as HTMLElement | undefined;
				if (!panelEl) {
					return;
				}
				const selected = panelEl.querySelector('.mat-mdc-option.mdc-list-item--selected') as HTMLElement | null;
				selected?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
			});
		});
	}

	private updateDropdownIcon(): void {
		if (this.dropdownIconSpan) {
			this.dropdownIconSpan.textContent = this.isExpanded ? 'arrow_drop_up' : 'arrow_drop_down';
		}
		const button = this.dropdownIconSpan?.parentElement;
		if (button) {
			this.renderer.setAttribute(button, 'aria-label', this.isExpanded ? 'Close options' : 'Open options');
		}
	}
}
