import { Directive, ElementRef, inject, OnInit, Renderer2, signal } from '@angular/core';

@Directive({
	selector: '[editBsButton]',
})
export class EditBsButtonDirective implements OnInit {
	elementRef = inject(ElementRef);
	renderer = inject(Renderer2);

	protected originalText = signal('');
	protected iconElement = signal<HTMLElement | null>(null);

	constructor() {
		// Move class addition to ngOnInit to ensure element is ready
	}

	ngOnInit(): void {
		// Add the btn class first
		this.renderer.addClass(this.elementRef.nativeElement, 'btn');
		this.renderer.addClass(this.elementRef.nativeElement, 'text-primary');

		// Capture original text before creating icon
		this.originalText.set(this.elementRef.nativeElement.textContent?.trim() || 'Edit');

		// Create edit icon
		this.createEditIcon();

		// Update content to show icon and text
		this.updateContent();
	}

	private createEditIcon(): void {
		console.log('Creating edit icon');
		// Create a simple SVG icon element for edit
		const iconElement = this.renderer.createElement('svg');
		this.renderer.setAttribute(iconElement, 'xmlns', 'http://www.w3.org/2000/svg');
		this.renderer.setAttribute(iconElement, 'viewBox', '0 0 512 512');
		this.renderer.setAttribute(iconElement, 'width', '18');
		this.renderer.setAttribute(iconElement, 'height', '18');
		this.renderer.setAttribute(iconElement, 'fill', '#007bff');
		this.renderer.setStyle(iconElement, 'display', 'inline-block');
		this.renderer.setStyle(iconElement, 'vertical-align', 'middle');
		this.renderer.addClass(iconElement, 'pe-2');

		// Create the path element for edit icon
		const pathElement = this.renderer.createElement('path');
		const pathData =
			'M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4z' +
			'M172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7z' +
			'M192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z';
		this.renderer.setAttribute(pathElement, 'd', pathData);

		// Append path to SVG
		this.renderer.appendChild(iconElement, pathElement);

		this.iconElement.set(iconElement);
		console.log('Edit icon created', iconElement);
	}

	private updateContent(): void {
		const element = this.elementRef.nativeElement;
		element.innerHTML = '';

		// Add icon and original text
		const iconElement = this.iconElement();
		if (iconElement) {
			element.appendChild(iconElement);
		}
		element.appendChild(this.renderer.createText(this.originalText()));
	}
}
