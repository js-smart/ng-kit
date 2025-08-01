import { Directive, input } from '@angular/core';
import { BaseButtonDirective } from '../base-button/base-button.directive';

@Directive({
	selector: '[manageButton]',
})
export class ManageButtonDirective extends BaseButtonDirective {
	override icon = input<string>('settings');

	constructor() {
		super();
		this.renderer.addClass(this.elementRef.nativeElement, 'mr-3');
		this.renderer.addClass(this.elementRef.nativeElement, 'secondary-button');
	}
}
