import { Directive } from '@angular/core';
import { BaseSvgButtonDirective } from '@js-smart/ng-kit';

@Directive({
	selector: '[editBsButton]',
})
export class EditBsButtonDirective extends BaseSvgButtonDirective {
	constructor() {
		super();
		this.renderer.addClass(this.elementRef.nativeElement, 'text-primary');
	}
}
