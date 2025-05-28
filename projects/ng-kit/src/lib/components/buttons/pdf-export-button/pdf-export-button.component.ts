import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'pdf-export-button',
	imports: [MatButtonModule],
	template: ` <button class="pdf-export-button" mat-raised-button type="button" data-cy="pdf-export-button">PDF</button> `,
	styles: [
		`
			.pdf-export-button {
				margin-left: 20px !important;
				width: 100px;
				color: white !important;
				background-color: #a3071b !important;
				border-radius: 24px !important;
			}
		`,
	],
})
export class PdfExportButtonComponent {}
