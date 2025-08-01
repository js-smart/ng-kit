import { Directive, DOCUMENT, effect, ElementRef, inject, input } from '@angular/core';

@Directive({
	selector: '[bsLinkButton]',
})
export class BsLinkButtonDirective {
	icon = input<string>('search');
	elementRef = inject(ElementRef);
	document = inject(DOCUMENT);

	constructor() {
		this.elementRef.nativeElement.classList.add('btn', 'text-primary');

		effect(() => {
			this.updateContent();
		});
	}

	private updateContent(): void {
		// if icon present, add material-icons class and set text content
		if (this.icon()) {
			const iconSpan = this.document.createElement('span');
			iconSpan.classList.add('material-icons', 'pe-2');
			iconSpan.textContent = this.icon();
			this.elementRef.nativeElement.appendChild(iconSpan);
		}
	}
}
