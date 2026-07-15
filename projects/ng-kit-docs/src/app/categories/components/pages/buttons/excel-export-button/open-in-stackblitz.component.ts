import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StackBlitzService } from '@ng-kit-demo/services/stackblitz.service';
import { getExcelExportButtonDemoConfig } from '@ng-kit-demo/excel-export-button-demo/excel-export-button-demo.config';

@Component({
	selector: 'ng-kit-excel-export-button-open-in-stackblitz',
	standalone: true,
	template: `<button (click)="open()" class="btn btn-primary">🚀 Open in StackBlitz</button>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExcelExportButtonOpenInStackblitzComponent {
	private readonly stackBlitzService = inject(StackBlitzService);

	open(): void {
		this.stackBlitzService.openDemo(getExcelExportButtonDemoConfig());
	}
}
