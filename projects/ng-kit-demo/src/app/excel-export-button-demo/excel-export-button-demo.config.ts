import { DemoConfig } from '../types/demo-config';

/**
 * Generates a DemoConfig for the excel-export-button-demo component
 */
export function getExcelExportButtonDemoConfig(): DemoConfig {
	return {
		title: 'Excel Export Button Demo',
		description: 'Demo showcasing the ExcelExportButtonComponent and excelExportButton directive from @js-smart/ng-kit',
		componentName: 'excel-export-button-demo',
		componentTs: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ExcelExportButtonComponent, ExcelExportButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-excel-export-button-demo',
	standalone: true,
	imports: [ExcelExportButtonComponent, ExcelExportButtonDirective],
	templateUrl: './excel-export-button-demo.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExcelExportButtonDemoComponent {
	status = signal('');

	onExport(): void {
		this.status.set('Excel export clicked!');
	}
}`,
		componentHtml: `<div>
	<h2>Directive (Preferred)</h2>
	<button (click)="onExport()" excelExportButton>Excel</button>
</div>

<div>
	<h2>Component</h2>
	<excel-export-button (click)="onExport()"></excel-export-button>
</div>

<p>{{ status() }}</p>`,
	};
}
