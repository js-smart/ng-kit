import { Directive, effect, ElementRef, inject, input, OnInit, Renderer2, signal } from '@angular/core';

@Directive()
export abstract class BaseButtonDirective implements OnInit {
	icon = input<string>('');
	loadingLabel = input<string>('Loading...');
	loading = input<boolean>(false);
	elementRef = inject(ElementRef);
	renderer = inject(Renderer2);

	protected originalText = signal('');
	protected iconSpan = signal<HTMLElement | null>(null);

	constructor() {
		this.renderer.addClass(this.elementRef.nativeElement, 'btn');

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
			const iconElement = this.renderer.createElement('span');
			this.renderer.addClass(iconElement, 'material-icons');
			this.renderer.addClass(iconElement, 'pe-2');
			this.renderer.setProperty(iconElement, 'textContent', this.icon());
			this.renderer.appendChild(this.elementRef.nativeElement, iconElement);
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
		// Add spinner and loadingLabel text
		const spinner = this.renderer.createElement('span');
		this.renderer.addClass(spinner, 'spinner-border');
		this.renderer.addClass(spinner, 'spinner-border-sm');
		this.renderer.addClass(spinner, 'me-2');
		this.renderer.setAttribute(spinner, 'role', 'status');
		element.appendChild(spinner);
		element.appendChild(this.renderer.createText(this.loadingLabel()));
		this.renderer.setProperty(element, 'disabled', true);
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
		element.appendChild(this.renderer.createText(this.originalText()));
		this.renderer.setProperty(element, 'disabled', false);
	}
}
