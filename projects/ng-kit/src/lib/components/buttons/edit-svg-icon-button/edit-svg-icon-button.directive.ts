import { Directive, input } from '@angular/core';
import { BaseButtonDirective } from '../base-button/base-button.directive';

@Directive({
	selector: '[editSvgIconButton]',
})
export class EditSvgIconButtonDirective extends BaseButtonDirective {
	override icon = input<string>('edit_square');
	override loadingLabel = input<string>('Editing...');

	constructor() {
		super();
		this.elementRef.nativeElement.classList.add('primary-button');
	}
}
