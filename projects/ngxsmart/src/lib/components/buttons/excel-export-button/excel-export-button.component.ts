import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";

@Component({
	selector: "excel-export-button",
	standalone: true,
	imports: [CommonModule, MatButtonModule],
	template: `
		<button class="excel-export-button" mat-raised-button type="button" data-cy="excel-export-button">Excel</button> `,
  styleUrls: ['../../../../assets/app-buttons.css'],
	styles: [
		`
			.excel-export-button {
				margin-left: 20px !important;
				margin-right: 20px !important;
				width: 100px;
				color: white !important;
				background-color: darkgreen !important;
				border-radius: 24px !important;
			}
		`
	],
})
export class ExcelExportButtonComponent {}
