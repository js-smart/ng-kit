import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PdfExportButtonComponent, PdfExportButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-pdf-export-button-demo',
	standalone: true,
	imports: [PdfExportButtonComponent, PdfExportButtonDirective],
	template: `
		<div>
			<h2>Directive (Preferred)</h2>
			<button (click)="onExport()" pdfExportButton>PDF</button>
		</div>

		<div>
			<h2>Component</h2>
			<pdf-export-button (click)="onExport()"></pdf-export-button>
		</div>

		<p>{{ status() }}</p>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdfExportButtonDemoComponent {
	status = signal('');

	onExport(): void {
		this.status.set('PDF export clicked!');
	}
}
