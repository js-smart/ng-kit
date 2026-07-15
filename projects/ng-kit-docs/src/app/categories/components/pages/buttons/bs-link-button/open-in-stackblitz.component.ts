import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StackBlitzService } from '@ng-kit-demo/services/stackblitz.service';
import { getBsLinkButtonDemoConfig } from '@ng-kit-demo/bs-link-button-demo/bs-link-button-demo.config';

@Component({
	selector: 'ng-kit-bs-link-button-open-in-stackblitz',
	standalone: true,
	template: `<button (click)="open()" class="btn btn-primary">🚀 Open in StackBlitz</button>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BsLinkButtonOpenInStackblitzComponent {
	private readonly stackBlitzService = inject(StackBlitzService);

	open(): void {
		this.stackBlitzService.openDemo(getBsLinkButtonDemoConfig());
	}
}
