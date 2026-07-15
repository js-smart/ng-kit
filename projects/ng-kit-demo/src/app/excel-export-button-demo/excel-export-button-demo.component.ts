import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ExcelExportButtonComponent, ExcelExportButtonDirective } from '@js-smart/ng-kit';
import { StackBlitzService } from '../services/stackblitz.service';
import { getExcelExportButtonDemoConfig } from './excel-export-button-demo.config';

@Component({
	selector: 'ng-kit-excel-export-button-demo',
	standalone: true,
	imports: [ExcelExportButtonComponent, ExcelExportButtonDirective],
	template: `
		<div style="margin-bottom: 20px;">
			<button (click)="openInStackBlitz()" class="btn btn-primary">🚀 Open in StackBlitz</button>
		</div>

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

	private readonly stackBlitzService = inject(StackBlitzService);

	openInStackBlitz(): void {
		this.stackBlitzService.openDemo(getExcelExportButtonDemoConfig());
	}

	onExport(): void {
		this.status.set('Excel export clicked!');
	}
}
