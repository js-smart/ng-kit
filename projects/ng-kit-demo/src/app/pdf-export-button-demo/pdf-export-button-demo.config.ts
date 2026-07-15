import { DemoConfig } from '../types/demo-config';

/**
 * Generates a DemoConfig for the pdf-export-button-demo component
 */
export function getPdfExportButtonDemoConfig(): DemoConfig {
	return {
		title: 'PDF Export Button Demo',
		description: 'Demo showcasing the PdfExportButtonComponent and pdfExportButton directive from @js-smart/ng-kit',
		componentName: 'pdf-export-button-demo',
		componentTs: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PdfExportButtonComponent, PdfExportButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-pdf-export-button-demo',
	standalone: true,
	imports: [PdfExportButtonComponent, PdfExportButtonDirective],
	templateUrl: './pdf-export-button-demo.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdfExportButtonDemoComponent {
	status = signal('');

	onExport(): void {
		this.status.set('PDF export clicked!');
	}
}`,
		componentHtml: `<div>
	<h2>Directive (Preferred)</h2>
	<button (click)="onExport()" pdfExportButton>PDF</button>
</div>

<div>
	<h2>Component</h2>
	<pdf-export-button (click)="onExport()"></pdf-export-button>
</div>

<p>{{ status() }}</p>`,
	};
}
