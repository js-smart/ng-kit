import { Directive, input } from '@angular/core';
import { BaseButtonDirective } from '../base-button/base-button.directive';

@Directive({
	selector: '[manageButton]',
})
export class ManageButtonDirective extends BaseButtonDirective {
	override icon = input<string>('settings');

	constructor() {
		super();
		this.elementRef.nativeElement.classList.add('mr-3');
		this.elementRef.nativeElement.classList.add('secondary-button');
	}
}
