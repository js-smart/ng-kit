import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PdfExportButtonComponent, PdfExportButtonDirective } from '@js-smart/ng-kit';
import { StackBlitzService } from '../services/stackblitz.service';
import { OpenInStackblitzButtonComponent } from '../shared/open-in-stackblitz-button.component';
import { getPdfExportButtonDemoConfig } from './pdf-export-button-demo.config';

@Component({
	selector: 'ng-kit-pdf-export-button-demo',
	standalone: true,
	imports: [PdfExportButtonComponent, PdfExportButtonDirective, OpenInStackblitzButtonComponent],
	template: `
		<div style="margin-bottom: 20px;">
			<ng-kit-open-in-stackblitz-button (open)="openInStackBlitz()" />
		</div>

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

	private readonly stackBlitzService = inject(StackBlitzService);

	openInStackBlitz(): void {
		this.stackBlitzService.openDemo(getPdfExportButtonDemoConfig());
	}

	onExport(): void {
		this.status.set('PDF export clicked!');
	}
}
