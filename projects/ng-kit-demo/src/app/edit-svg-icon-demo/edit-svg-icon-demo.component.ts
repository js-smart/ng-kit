import { Component } from '@angular/core';
import { EditSvgIconButtonComponent } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-edit-svg-icon-demo',
	standalone: true,
	imports: [EditSvgIconButtonComponent],
	template: ` <edit-svg-icon-button class="m-5"></edit-svg-icon-button> `,
	styles: [],
})
export class EditSvgIconDemoComponent {}
