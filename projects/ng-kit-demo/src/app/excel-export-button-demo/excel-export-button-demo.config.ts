import { DemoConfig } from '../types/demo-config';

/**
 * Generates a DemoConfig for the excel-export-button-demo component
 */
export function getExcelExportButtonDemoConfig(): DemoConfig {
	return {
		title: 'Excel Export Button Demo',
		description: 'Demo showcasing the ExcelExportButtonDirective from @js-smart/ng-kit',
		componentName: 'excel-export-button-demo',
		componentTs: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ExcelExportButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-excel-export-button-demo',
	standalone: true,
	imports: [ExcelExportButtonDirective, MatButton],
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
	<button (click)="onExport()" excelExportButton mat-raised-button>Excel</button>
</div>

<p>{{ status() }}</p>`,
	};
}
