import { Directive, input } from '@angular/core';
import { BaseButtonDirective } from '../base-button/base-button.directive';

@Directive({
	selector: '[viewButton]',
})
export class ViewButtonDirective extends BaseButtonDirective {
	override icon = input<string>('visibility');
	override loadingLabel = input<string>('Loading...');

	constructor() {
		super();
	}
}
