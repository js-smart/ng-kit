import { Directive, input } from '@angular/core';
import { BaseButtonDirective } from '../base-button/base-button.directive';
import { BS_PRIMARY_BUTTON_CLASSES } from '../bootstrap-classes';

@Directive({
	selector: '[viewPrimaryButton]',
})
export class ViewPrimaryButtonDirective extends BaseButtonDirective {
	override icon = input<string>('visibility');

	constructor() {
		super();
		this.elementRef.nativeElement.classList.add(...BS_PRIMARY_BUTTON_CLASSES);
		this.elementRef.nativeElement.classList.add('primary-button');
	}
}
