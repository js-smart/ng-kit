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
		this.elementRef.nativeElement.classList.add('text-primary', 'gap-1');
	}

	protected override createIcon(): void {
		if (this.icon()) {
			const iconElement = this.document.createElement('mat-icon');
			iconElement.classList.add('mat-icon', 'edit-square-icon', 'pe-2');
			iconElement.textContent = this.icon();
			this.iconSpan.set(iconElement);
		}
	}
}
