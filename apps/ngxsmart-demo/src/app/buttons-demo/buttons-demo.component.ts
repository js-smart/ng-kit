import { Component, NgModule, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	EditBsButtonComponentModule,
	ExcelExportButtonComponentModule,
	PdfExportButtonComponentModule,
	PrimaryButtonComponentModule,
	SavePrimaryButtonComponentModule,
	ViewPrimaryButtonComponentModule,
} from '@ngxsmart/ngxsmart';

@Component({
	selector: 'ngxsmart-buttons-demo',
	templateUrl: './buttons-demo.component.html',
	styles: [``],
})
export class ButtonsDemoComponent implements OnInit {
	loading = false;

	constructor() {}

	ngOnInit(): void {}

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
		ViewPrimaryButtonComponentModule,
	],
	declarations: [ButtonsDemoComponent],
	exports: [ButtonsDemoComponent],
})
export class ButtonsDemoComponentModule {}
