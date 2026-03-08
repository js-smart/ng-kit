import { Directive, input } from '@angular/core';
import { BaseButtonDirective } from '../base-button/base-button.directive';

@Directive({
	selector: '[successButton]',
})
export class SuccessButtonDirective extends BaseButtonDirective {
	override icon = input<string>('save');
	override label = input<string>('Update');
	override loadingLabel = input<string>('Updating...');

	constructor() {
		super();
		this.elementRef.nativeElement.classList.add('success-button');
	}
}
