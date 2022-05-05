import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	BsLinkButtonComponentModule,
	EditBsButtonComponentModule,
	EditButtonComponentModule,
	EditSvgIconButtonComponentModule,
	ExcelExportButtonComponentModule,
	ManageButtonComponentModule,
	PdfExportButtonComponentModule,
	PrimaryButtonComponentModule,
	SavePrimaryButtonComponentModule,
	SearchButtonComponentModule,
	ViewButtonComponentModule,
	ViewPrimaryButtonComponentModule,
} from '@ngxsmart/ngxsmart';

@Component({
	selector: 'ngxsmart-buttons-demo',
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

@NgModule({
	imports: [
		CommonModule,
		SavePrimaryButtonComponentModule,
		PrimaryButtonComponentModule,
		PdfExportButtonComponentModule,
		ExcelExportButtonComponentModule,
		EditBsButtonComponentModule,
		ViewButtonComponentModule,
		ViewPrimaryButtonComponentModule,
		EditButtonComponentModule,
		EditSvgIconButtonComponentModule,
		EditBsButtonComponentModule,
		BsLinkButtonComponentModule,
		ManageButtonComponentModule,
		SearchButtonComponentModule,
	],
	declarations: [ButtonsDemoComponent],
	exports: [ButtonsDemoComponent],
})
export class ButtonsDemoComponentModule {}
