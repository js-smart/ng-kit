import { Directive, input } from '@angular/core';
import { BaseButtonDirective } from '../base-button/base-button.directive';

@Directive({
	selector: '[viewPrimaryButton]',
})
export class ViewPrimaryButtonDirective extends BaseButtonDirective {
	override icon = input<string>('visibility');

	constructor() {
		super();
		this.elementRef.nativeElement.classList.add('btn-primary');
		this.elementRef.nativeElement.classList.add('primary-button');
	}
}
