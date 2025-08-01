import { Directive, ElementRef, inject, input, Renderer2 } from '@angular/core';

@Directive({
	selector: '[bsLinkButton]',
})
export class BsLinkButtonDirective {
	icon = input<string>('search');
	elementRef = inject(ElementRef);
	renderer = inject(Renderer2);

	constructor() {
		this.renderer.addClass(this.elementRef.nativeElement, 'btn');
		this.renderer.addClass(this.elementRef.nativeElement, 'text-primary');

		// if icon present, add material-icons class and set text content
		if (this.icon()) {
			const iconSpan = this.renderer.createElement('span');
			this.renderer.addClass(iconSpan, 'material-icons');
			this.renderer.addClass(iconSpan, 'pe-2');
			this.renderer.setProperty(iconSpan, 'textContent', this.icon());
			this.renderer.appendChild(this.elementRef.nativeElement, iconSpan);
		}
	}
}
