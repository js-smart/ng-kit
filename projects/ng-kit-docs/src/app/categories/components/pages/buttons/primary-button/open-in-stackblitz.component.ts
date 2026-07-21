import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StackBlitzService } from '@ng-kit-demo/services/stackblitz.service';
import { OpenInStackblitzButtonComponent } from '@ng-kit-demo/shared/open-in-stackblitz-button.component';
import { getPrimaryButtonDemoConfig } from '@ng-kit-demo/primary-button-demo/primary-button-demo.config';

@Component({
	selector: 'ng-kit-primary-button-open-in-stackblitz',
	standalone: true,
	imports: [OpenInStackblitzButtonComponent],
	template: `<ng-kit-open-in-stackblitz-button (open)="open()" />`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimaryButtonOpenInStackblitzComponent {
	private readonly stackBlitzService = inject(StackBlitzService);

	open(): void {
		this.stackBlitzService.openDemo(getPrimaryButtonDemoConfig());
	}
}
