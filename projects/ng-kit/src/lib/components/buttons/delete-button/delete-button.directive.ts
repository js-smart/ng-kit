import { Directive, input } from '@angular/core';
import { BaseButtonDirective } from '../base-button/base-button.directive';

@Directive({
	selector: '[deleteButton]',
})
export class DeleteButtonDirective extends BaseButtonDirective {
	override icon = input<string>('delete');
	override loadingLabel = input<string>('Deleting...');

	constructor() {
		super();
		this.elementRef.nativeElement.classList.add('delete-button');
	}
}
