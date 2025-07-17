import { Directive, ElementRef, inject, Renderer2 } from '@angular/core';

@Directive({
	selector: '[closeButton]',
})
export class CloseButtonDirective {
	elementRef = inject(ElementRef);
	renderer = inject(Renderer2);

	constructor() {
		this.renderer.addClass(this.elementRef.nativeElement, 'secondary-button');
	}
}
