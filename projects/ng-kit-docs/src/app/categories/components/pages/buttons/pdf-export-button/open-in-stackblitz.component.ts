import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StackBlitzService } from '@ng-kit-demo/services/stackblitz.service';
import { getPdfExportButtonDemoConfig } from '@ng-kit-demo/pdf-export-button-demo/pdf-export-button-demo.config';

@Component({
	selector: 'ng-kit-pdf-export-button-open-in-stackblitz',
	standalone: true,
	template: `<button (click)="open()" class="btn btn-primary">🚀 Open in StackBlitz</button>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdfExportButtonOpenInStackblitzComponent {
	private readonly stackBlitzService = inject(StackBlitzService);

	open(): void {
		this.stackBlitzService.openDemo(getPdfExportButtonDemoConfig());
	}
}
