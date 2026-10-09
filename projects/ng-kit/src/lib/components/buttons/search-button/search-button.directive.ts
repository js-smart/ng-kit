import { Directive, input } from '@angular/core';
import { BaseButtonDirective } from '../base-button/base-button.directive';
import { BS_PRIMARY_BUTTON_CLASSES } from '../bootstrap-classes';

@Directive({
	selector: '[searchButton]',
})
export class SearchButtonDirective extends BaseButtonDirective {
	override icon = input<string>('search');
	override loadingLabel = input<string>('Searching...');

	constructor() {
		super();
		this.elementRef.nativeElement.classList.add(...BS_PRIMARY_BUTTON_CLASSES);
		this.elementRef.nativeElement.classList.add('primary-button');
	}
}
