import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StackBlitzService } from '@ng-kit-demo/services/stackblitz.service';
import { getEditBsButtonDemoConfig } from '@ng-kit-demo/edit-bs-button-demo/edit-bs-button-demo.config';

@Component({
	selector: 'ng-kit-edit-bs-button-open-in-stackblitz',
	standalone: true,
	template: `<button (click)="open()" class="btn btn-primary">🚀 Open in StackBlitz</button>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditBsButtonOpenInStackblitzComponent {
	private readonly stackBlitzService = inject(StackBlitzService);

	open(): void {
		this.stackBlitzService.openDemo(getEditBsButtonDemoConfig());
	}
}
