import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ExcelExportButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-excel-export-button-demo',
	standalone: true,
	imports: [ExcelExportButtonDirective, MatButton],
	template: `
		<div>
			<h2>Directive (Preferred)</h2>
			<button (click)="onExport()" excelExportButton mat-raised-button>Excel</button>
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
