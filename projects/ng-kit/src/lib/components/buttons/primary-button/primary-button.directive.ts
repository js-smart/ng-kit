import { Directive, input } from '@angular/core';
import { BaseButtonDirective } from '../base-button/base-button.directive';

@Directive({
	selector: '[primaryButton]',
})
export class PrimaryButtonDirective extends BaseButtonDirective {
	override icon = input<string>('save');
	override loadingLabel = input<string>('Saving...');

	constructor() {
		super();
		this.renderer.addClass(this.elementRef.nativeElement, 'btn-primary');
		this.renderer.addClass(this.elementRef.nativeElement, 'primary-button');
	}
}
