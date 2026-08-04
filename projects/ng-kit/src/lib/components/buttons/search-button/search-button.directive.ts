import { Directive, input } from '@angular/core';
import { BaseButtonDirective } from '../base-button/base-button.directive';

@Directive({
	selector: '[searchButton]',
})
export class SearchButtonDirective extends BaseButtonDirective {
	override icon = input<string>('search');
	override loadingLabel = input<string>('Searching...');

	constructor() {
		super();
		this.elementRef.nativeElement.classList.add('btn-primary');
		this.elementRef.nativeElement.classList.add('primary-button');
	}
}
