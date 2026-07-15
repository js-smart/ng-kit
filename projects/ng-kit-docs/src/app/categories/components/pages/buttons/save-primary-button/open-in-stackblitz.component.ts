import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StackBlitzService } from '@ng-kit-demo/services/stackblitz.service';
import { getSavePrimaryButtonDemoConfig } from '@ng-kit-demo/save-primary-button-demo/save-primary-button-demo.config';

@Component({
	selector: 'ng-kit-save-primary-button-open-in-stackblitz',
	standalone: true,
	template: `<button (click)="open()" class="btn btn-primary">🚀 Open in StackBlitz</button>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavePrimaryButtonOpenInStackblitzComponent {
	private readonly stackBlitzService = inject(StackBlitzService);

	open(): void {
		this.stackBlitzService.openDemo(getSavePrimaryButtonDemoConfig());
	}
}
