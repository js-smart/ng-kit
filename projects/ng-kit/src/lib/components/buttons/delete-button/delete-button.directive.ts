import { Directive, effect, ElementRef, inject, input, OnInit, Renderer2, signal } from '@angular/core';

@Directive({
	selector: '[deleteButton]',
})
export class DeleteButtonDirective implements OnInit {
	icon = input<string>('delete');
	loadingLabel = input<string>('Deleting...');
	loading = input<boolean>(false);
	elementRef = inject(ElementRef);
	renderer = inject(Renderer2);
	private originalText = signal('');
	private iconSpan = signal<HTMLElement | null>(null);

	constructor() {
		this.renderer.addClass(this.elementRef.nativeElement, 'btn');
		this.renderer.addClass(this.elementRef.nativeElement, 'delete-button');

		effect(() => {
			this.updateContent();
		});
	}

	ngOnInit(): void {
		// Capture original text before creating icon
		this.originalText.set(this.elementRef.nativeElement.textContent?.trim() || 'Delete');

		// Create icon after capturing text
		this.createIcon();
	}

	private createIcon(): void {
		if (this.icon()) {
			const iconElement = this.renderer.createElement('span');
			this.renderer.addClass(iconElement, 'material-icons');
			this.renderer.addClass(iconElement, 'pe-2');
			this.renderer.setProperty(iconElement, 'textContent', this.icon());
			this.renderer.appendChild(this.elementRef.nativeElement, iconElement);
			this.iconSpan.set(iconElement);
		}
	}

	private updateContent(): void {
		const element = this.elementRef.nativeElement;
		element.innerHTML = '';

		if (this.loading()) {
			// Add spinner and loadingLabel text
			const spinner = this.renderer.createElement('span');
			this.renderer.addClass(spinner, 'spinner-border');
			this.renderer.addClass(spinner, 'spinner-border-sm');
			this.renderer.addClass(spinner, 'me-2');
			this.renderer.setAttribute(spinner, 'role', 'status');
			element.appendChild(spinner);
			element.appendChild(this.renderer.createText(this.loadingLabel()));
			this.renderer.setProperty(element, 'disabled', true);
		} else {
			// Add icon and original text
			const iconElement = this.iconSpan();
			if (iconElement) {
				element.appendChild(iconElement);
			}
			element.appendChild(this.renderer.createText(this.originalText()));
			this.renderer.setProperty(element, 'disabled', false);
		}
	}
}
