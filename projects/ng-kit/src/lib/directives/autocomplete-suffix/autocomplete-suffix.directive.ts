import { AfterViewInit, ApplicationRef, ComponentRef, createComponent, DestroyRef, Directive, ElementRef, EnvironmentInjector, inject, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { AutocompleteClearButtonComponent } from './autocomplete-clear-button.component';
import { AutocompleteDropdownButtonComponent } from './autocomplete-dropdown-button.component';

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
	private readonly appRef = inject(ApplicationRef);
	private readonly envInjector = inject(EnvironmentInjector);

	private clearRef: ComponentRef<AutocompleteClearButtonComponent> | null = null;
	private dropdownRef: ComponentRef<AutocompleteDropdownButtonComponent> | null = null;
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

		this.clearRef = createComponent(AutocompleteClearButtonComponent, { environmentInjector: this.envInjector });
		this.appRef.attachView(this.clearRef.hostView);
		this.clearRef.instance.clicked.subscribe((e) => this.clearInput(e));
		this.renderer.setStyle(this.clearRef.location.nativeElement, 'visibility', 'hidden');

		this.dropdownRef = createComponent(AutocompleteDropdownButtonComponent, { environmentInjector: this.envInjector });
		this.appRef.attachView(this.dropdownRef.hostView);
		this.dropdownRef.instance.clicked.subscribe((e) => this.togglePanel(e));

		this.renderer.appendChild(container, this.clearRef.location.nativeElement);
		this.renderer.appendChild(container, this.dropdownRef.location.nativeElement);
		this.renderer.appendChild(suffixWrapper, container);

		this.destroyRef.onDestroy(() => {
			this.clearRef?.destroy();
			this.dropdownRef?.destroy();
		});
	}

	private setupListeners(): void {
		this.unlisten.push(this.renderer.listen(this.el.nativeElement, 'input', () => this.updateClearButtonVisibility()));

		const autocomplete = this.trigger.autocomplete;

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

		const selectedSub = autocomplete.optionSelected.subscribe(() => this.updateClearButtonVisibility());

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
		if (this.clearRef) {
			this.renderer.setStyle(this.clearRef.location.nativeElement, 'visibility', hasValue ? 'visible' : 'hidden');
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
		if (this.dropdownRef) {
			this.dropdownRef.instance.expanded.set(this.isExpanded);
		}
	}
}
