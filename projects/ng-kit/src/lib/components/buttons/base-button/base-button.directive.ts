import { Directive, DOCUMENT, effect, ElementRef, inject, input, OnInit, signal } from '@angular/core';

@Directive()
export abstract class BaseButtonDirective implements OnInit {
	icon = input<string>('');
	label = input<string>('');
	loadingLabel = input<string>('Loading...');
	loading = input<boolean>(false);
	elementRef = inject(ElementRef);
	document = inject(DOCUMENT);

	protected originalText = signal('');
	protected iconSpan = signal<HTMLElement | null>(null);

	constructor() {
		this.elementRef.nativeElement.classList.add('btn');

		effect(() => {
			// If a consumer provides a label input, always use it. Otherwise, fall back to the initially captured host text.
			const nextText = this.label() || this.originalText();
			this.originalText.set(nextText);

			// Keep the icon element in sync with [icon]
			this.createIcon();

			// Re-render on any relevant signal change
			this.updateContent();
		});
	}

	ngOnInit(): void {
		// Capture original text before creating icon
		this.originalText.set(this.elementRef.nativeElement.textContent?.trim() || 'Button');

		// Create icon after capturing text
		this.createIcon();
	}

	protected createIcon(): void {
		if (this.icon()) {
			const iconElement = this.document.createElement('mat-icon');
			iconElement.classList.add('mat-icon', 'material-icons', 'pe-2');
			iconElement.textContent = this.icon();
			this.iconSpan.set(iconElement);
		}
	}

	protected updateContent(): void {
		const element = this.elementRef.nativeElement;
		element.innerHTML = '';

		if (this.loading()) {
			this.showLoadingState(element);
		} else {
			this.showNormalState(element);
		}
	}

	protected showLoadingState(element: HTMLElement): void {
		const newSpan = this.document.createElement('span');
		newSpan.classList.add('spinner-border', 'spinner-border-sm', 'me-2');
		newSpan.setAttribute('role', 'status');

		element.appendChild(newSpan);
		element.appendChild(this.document.createTextNode(this.loadingLabel()));
		element.setAttribute('disabled', 'true');
	}

	protected showNormalState(element: HTMLElement): void {
		const iconElement = this.iconSpan();
		if (iconElement) {
			element.appendChild(iconElement);
		}

		element.appendChild(this.document.createTextNode(this.originalText()));
		element.removeAttribute('disabled');
	}
}
