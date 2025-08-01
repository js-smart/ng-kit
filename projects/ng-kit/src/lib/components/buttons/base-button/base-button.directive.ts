import { Directive, DOCUMENT, effect, ElementRef, inject, input, OnInit, signal } from '@angular/core';

@Directive()
export abstract class BaseButtonDirective implements OnInit {
	icon = input<string>('');
	loadingLabel = input<string>('Loading...');
	loading = input<boolean>(false);
	elementRef = inject(ElementRef);
	document = inject(DOCUMENT);

	protected originalText = signal('');
	protected iconSpan = signal<HTMLElement | null>(null);

	constructor() {
		this.elementRef.nativeElement.classList.add('btn');

		effect(() => {
			this.updateContent();
		});
	}

	ngOnInit(): void {
		// Capture original text before creating icon
		this.originalText.set(this.elementRef.nativeElement.textContent?.trim() || 'Button');

		// Create icon after capturing text
		this.createIcon();
	}

	/**
	 * Create icon element if icon name is provided
	 */
	protected createIcon(): void {
		if (this.icon()) {
			const iconElement = this.document.createElement('mat-icon');
			iconElement.classList.add('mat-icon', 'material-icons', 'pe-2');
			iconElement.textContent = this.icon();
			this.iconSpan.set(iconElement);
		}
	}

	/**
	 * Update content of the button
	 */
	protected updateContent(): void {
		const element = this.elementRef.nativeElement;
		element.innerHTML = '';

		if (this.loading()) {
			this.showLoadingState(element);
		} else {
			this.showNormalState(element);
		}
	}

	/**
	 * Show loading state. Add spinner and loadingLabel text
	 */
	protected showLoadingState(element: HTMLElement): void {
		// Create a new span element
		const newSpan = this.document.createElement('span');

		// Set its text content
		newSpan.classList.add('spinner-border', 'spinner-border-sm', 'me-2');
		newSpan.setAttribute('role', 'status');

		// Append the new element to the host element
		element.appendChild(newSpan);
		element.appendChild(this.document.createTextNode(this.loadingLabel()));
		element.setAttribute('disabled', 'true');
	}

	/**
	 * Show normal state. Add icon and original text
	 */
	protected showNormalState(element: HTMLElement): void {
		// Add icon and original text
		const iconElement = this.iconSpan();
		if (iconElement) {
			element.appendChild(iconElement);
		}

		// Append text node instead of setting textContent (which overwrites the icon)
		element.appendChild(this.document.createTextNode(this.originalText()));
		element.removeAttribute('disabled');
	}
}
