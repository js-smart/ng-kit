import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StackBlitzService } from '@ng-kit-demo/services/stackblitz.service';
import { OpenInStackblitzButtonComponent } from '@ng-kit-demo/shared/open-in-stackblitz-button.component';
import { getBaseButtonDemoConfig } from '@ng-kit-demo/base-button-demo/base-button-demo.config';

@Component({
	selector: 'ng-kit-base-button-open-in-stackblitz',
	standalone: true,
	imports: [OpenInStackblitzButtonComponent],
	template: `<ng-kit-open-in-stackblitz-button (open)="open()" />`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseButtonOpenInStackblitzComponent {
	private readonly stackBlitzService = inject(StackBlitzService);

	open(): void {
		this.stackBlitzService.openDemo(getBaseButtonDemoConfig());
	}
}
