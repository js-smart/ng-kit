import { Component, ChangeDetectionStrategy } from '@angular/core';
import { EditSvgIconButtonComponent } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-edit-svg-icon-demo',
	imports: [EditSvgIconButtonComponent],
	template: ` <edit-svg-icon-button class="m-5"></edit-svg-icon-button> `,
	changeDetection: ChangeDetectionStrategy.Eager,
	styles: [],
})
export class EditSvgIconDemoComponent {}
