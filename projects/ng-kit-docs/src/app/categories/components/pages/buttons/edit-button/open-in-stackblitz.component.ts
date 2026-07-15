import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StackBlitzService } from '@ng-kit-demo/services/stackblitz.service';
import { getEditButtonDemoConfig } from '@ng-kit-demo/edit-button-demo/edit-button-demo.config';

@Component({
	selector: 'ng-kit-edit-button-open-in-stackblitz',
	standalone: true,
	template: `<button (click)="open()" class="btn btn-primary">🚀 Open in StackBlitz</button>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditButtonOpenInStackblitzComponent {
	private readonly stackBlitzService = inject(StackBlitzService);

	open(): void {
		this.stackBlitzService.openDemo(getEditButtonDemoConfig());
	}
}
