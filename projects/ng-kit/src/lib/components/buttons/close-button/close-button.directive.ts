import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
	selector: '[closeButton]',
})
export class CloseButtonDirective {
	elementRef = inject(ElementRef);

	constructor() {
		this.elementRef.nativeElement.classList.add('secondary-button');
	}
}
