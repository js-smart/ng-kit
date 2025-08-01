import { Directive, input } from '@angular/core';
import { BaseButtonDirective } from '../base-button/base-button.directive';

@Directive({
	selector: '[savePrimaryButton]',
})
export class SavePrimaryButtonDirective extends BaseButtonDirective {
	override icon = input<string>('save');
	override loadingLabel = input<string>('Saving...');

	constructor() {
		super();
		this.elementRef.nativeElement.classList.add('btn-primary');
		this.elementRef.nativeElement.classList.add('primary-button');
	}
}
