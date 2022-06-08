import { Component } from '@angular/core';
import { EditSvgIconButtonComponent } from '@ngxsmart/ngxsmart';

@Component({
	selector: 'ngxsmart-edit-svg-icon-demo',
	standalone: true,
	imports: [EditSvgIconButtonComponent],
	template: ` <edit-svg-icon-button class="m-5"></edit-svg-icon-button> `,
	styles: [],
})
export class EditSvgIconDemoComponent {}
