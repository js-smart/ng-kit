import { Directive, input } from '@angular/core';
import { BaseButtonDirective } from '../base-button/base-button.directive';

@Directive({
	selector: '[editBsButton]',
})
export class EditBsButtonDirective extends BaseButtonDirective {
	override icon = input<string>('edit_square');
	override loadingLabel = input<string>('Editing...');

	constructor() {
		super();
		this.elementRef.nativeElement.classList.add('text-primary');
	}
}
