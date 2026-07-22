import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ExcelExportButtonComponent, ExcelExportButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-excel-export-button-demo',
	standalone: true,
	imports: [ExcelExportButtonComponent, ExcelExportButtonDirective],
	template: `
		<div>
			<h2>Directive (Preferred)</h2>
			<button (click)="onExport()" excelExportButton>Excel</button>
		</div>

		<div>
			<h2>Component</h2>
			<excel-export-button (click)="onExport()"></excel-export-button>
		</div>

		<p>{{ status() }}</p>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExcelExportButtonDemoComponent {
	status = signal('');

	onExport(): void {
		this.status.set('Excel export clicked!');
	}
}
