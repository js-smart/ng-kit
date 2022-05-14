import { Component } from '@angular/core';
import {
	BsLinkButtonComponent,
	EditBsButtonComponent,
	EditButtonComponent,
	EditSvgIconButtonComponent,
	ExcelExportButtonComponent,
	ManageButtonComponent,
	PdfExportButtonComponent,
	PrimaryButtonComponent,
	SavePrimaryButtonComponent,
	SearchButtonComponent,
	ViewButtonComponent,
	ViewPrimaryButtonComponent,
} from '@ngxsmart/ngxsmart';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'ngxsmart-buttons-demo',
	standalone: true,
	imports: [
		CommonModule,
		SavePrimaryButtonComponent,
		PrimaryButtonComponent,
		PdfExportButtonComponent,
		ExcelExportButtonComponent,
		EditBsButtonComponent,
		ViewButtonComponent,
		ViewPrimaryButtonComponent,
		EditButtonComponent,
		EditSvgIconButtonComponent,
		EditBsButtonComponent,
		BsLinkButtonComponent,
		ManageButtonComponent,
		SearchButtonComponent,
	],
	templateUrl: './buttons-demo.component.html',
	styles: [``],
})
export class ButtonsDemoComponent {
	loading = false;

	setLoading() {
		this.loading = true;
		setTimeout(() => {
			this.loading = false;
		}, 3000);
	}
}
