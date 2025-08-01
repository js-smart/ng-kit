import { Directive, input } from '@angular/core';
import { BaseButtonDirective } from '../base-button/base-button.directive';

@Directive({
	selector: '[viewPrimaryButton]',
})
export class ViewPrimaryButtonDirective extends BaseButtonDirective {
	override icon = input<string>('visibility');

	constructor() {
		super();
		this.renderer.addClass(this.elementRef.nativeElement, 'btn-primary');
		this.renderer.addClass(this.elementRef.nativeElement, 'primary-button');
	}
}
