import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'excel-export-button',
	template: ` <button class="excel-export-button" mat-raised-button type="button" data-cy="excel-export-button">Excel</button> `,
	styles: [
		`
			.excel-export-button {
				margin-left: 20px !important;
				margin-right: 20px !important;
				width: 100px;
				color: white;
				background-color: darkgreen;
				border-radius: 24px !important;
			}
		`,
	],
})
export class ExcelExportButtonComponent {}

@NgModule({
	imports: [CommonModule, MatButtonModule],
	declarations: [ExcelExportButtonComponent],
	exports: [ExcelExportButtonComponent],
})
export class ExcelExportButtonComponentModule {}
