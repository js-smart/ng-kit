import { Component } from '@angular/core';
import {
	BsLinkButtonComponent,
	DeleteButtonComponent,
	EditBsButtonComponent,
	EditButtonComponent,
	EditSvgIconButtonComponent,
	ExcelExportButtonComponent,
	ManageButtonComponent,
	PdfExportButtonComponent,
	PrimaryButtonComponent,
	SavePrimaryButtonComponent,
	SearchButtonComponent,
	SuccessButtonComponent,
	ViewButtonComponent,
	ViewPrimaryButtonComponent,
} from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-buttons-demo',
	imports: [
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
		SuccessButtonComponent,
		DeleteButtonComponent,
	],
	templateUrl: './buttons-demo.component.html',
	styles: [],
})
export class ButtonsDemoComponent {
	loading = false;

	setLoading(): void {
		this.loading = true;
		setTimeout(() => {
			this.loading = false;
		}, 3000);
	}

	setDeleteLoading(_$event: MouseEvent): void {
		this.loading = true;
		setTimeout(() => {
			this.loading = false;
		}, 3000);
	}
}
