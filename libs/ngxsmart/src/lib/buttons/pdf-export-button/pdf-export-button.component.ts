import { Component, NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";

@Component({
	selector: "pdf-export-button",
	template:
		`
			<button
				class="pdf-export-button"
				mat-raised-button
				type="button">
				PDF
			</button>
		`,
	styles: [`
		.pdf-export-button {
			margin-left: 20px !important;
			width: 100px;
			color: white;
			background-color: #a3071b;
			border-radius: 24px !important;
		}
	`]
})
export class PdfExportButtonComponent {
}

@NgModule({
	imports: [MatButtonModule],
	declarations: [PdfExportButtonComponent],
	exports: [PdfExportButtonComponent]
})
export class PdfExportButtonComponentModule {
}
