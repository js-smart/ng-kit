import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StackBlitzService } from '@ng-kit-demo/services/stackblitz.service';
import { OpenInStackblitzButtonComponent } from '@ng-kit-demo/shared/open-in-stackblitz-button.component';
import { getDeleteButtonDemoConfig } from '@ng-kit-demo/delete-button-demo/delete-button-demo.config';

@Component({
	selector: 'ng-kit-delete-button-open-in-stackblitz',
	standalone: true,
	imports: [OpenInStackblitzButtonComponent],
	template: `<ng-kit-open-in-stackblitz-button (open)="open()" />`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteButtonOpenInStackblitzComponent {
	private readonly stackBlitzService = inject(StackBlitzService);

	open(): void {
		this.stackBlitzService.openDemo(getDeleteButtonDemoConfig());
	}
}
