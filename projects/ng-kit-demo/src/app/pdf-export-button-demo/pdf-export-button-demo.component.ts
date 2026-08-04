import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { PdfExportButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-pdf-export-button-demo',
	standalone: true,
	imports: [PdfExportButtonDirective, MatButton],
	template: `
		<div>
			<h2>Directive (Preferred)</h2>
			<button (click)="onExport()" pdfExportButton mat-raised-button>PDF</button>
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
