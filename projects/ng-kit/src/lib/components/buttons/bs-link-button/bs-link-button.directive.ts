import { Directive, DOCUMENT, effect, ElementRef, inject, input } from '@angular/core';
import { injectButtonStyles } from '../button-styles.component';

@Directive({
	selector: '[bsLinkButton]',
})
export class BsLinkButtonDirective {
	/** Material icon name rendered before the link label. */
	readonly icon = input<string>('search');

	private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
	private readonly document = inject(DOCUMENT);
	private readonly iconElement = this.document.createElement('span');

	constructor() {
		injectButtonStyles();
		const element = this.elementRef.nativeElement;
		element.classList.add('btn', 'text-primary');
		this.iconElement.classList.add('material-icons', 'pe-2');
		this.iconElement.setAttribute('aria-hidden', 'true');

		effect(() => {
			const icon = this.icon();

			if (!icon) {
				this.iconElement.remove();
				return;
			}

			this.iconElement.textContent = icon;
			const label = element.querySelector<HTMLElement>('.mdc-button__label');
			element.insertBefore(this.iconElement, label ?? element.firstChild);
		});
	}
}
