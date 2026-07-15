import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StackBlitzService } from '@ng-kit-demo/services/stackblitz.service';
import { OpenInStackblitzButtonComponent } from '@ng-kit-demo/shared/open-in-stackblitz-button.component';
import { getManageButtonDemoConfig } from '@ng-kit-demo/manage-button-demo/manage-button-demo.config';

@Component({
	selector: 'ng-kit-manage-button-open-in-stackblitz',
	standalone: true,
	imports: [OpenInStackblitzButtonComponent],
	template: `<ng-kit-open-in-stackblitz-button (open)="open()" />`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageButtonOpenInStackblitzComponent {
	private readonly stackBlitzService = inject(StackBlitzService);

	open(): void {
		this.stackBlitzService.openDemo(getManageButtonDemoConfig());
	}
}
