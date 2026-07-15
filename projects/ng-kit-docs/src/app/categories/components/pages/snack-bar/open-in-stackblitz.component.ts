import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StackBlitzService } from '@ng-kit-demo/services/stackblitz.service';
import { getSnackBarDemoConfig } from '@ng-kit-demo/utils/demo-config-generator';

@Component({
	selector: 'ng-kit-snack-bar-open-in-stackblitz',
	standalone: true,
	template: `<button (click)="open()" class="btn btn-primary">🚀 Open in StackBlitz</button>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackBarOpenInStackblitzComponent {
	private readonly stackBlitzService = inject(StackBlitzService);

	open(): void {
		this.stackBlitzService.openDemo(getSnackBarDemoConfig());
	}
}
