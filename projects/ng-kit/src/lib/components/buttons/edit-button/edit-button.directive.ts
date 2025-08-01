import { Directive, input } from '@angular/core';
import { BaseButtonDirective } from '../base-button/base-button.directive';

@Directive({
	selector: '[editButton]',
})
export class EditButtonDirective extends BaseButtonDirective {
	override icon = input<string>('edit');
	override loadingLabel = input<string>('Editing...');

	constructor() {
		super();
		this.elementRef.nativeElement.classList.add('primary-button');
	}
}
