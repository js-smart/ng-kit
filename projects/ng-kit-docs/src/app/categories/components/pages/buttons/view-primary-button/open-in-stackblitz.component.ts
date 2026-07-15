import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StackBlitzService } from '@ng-kit-demo/services/stackblitz.service';
import { getViewPrimaryButtonDemoConfig } from '@ng-kit-demo/view-primary-button-demo/view-primary-button-demo.config';

@Component({
	selector: 'ng-kit-view-primary-button-open-in-stackblitz',
	standalone: true,
	template: `<button (click)="open()" class="btn btn-primary">🚀 Open in StackBlitz</button>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewPrimaryButtonOpenInStackblitzComponent {
	private readonly stackBlitzService = inject(StackBlitzService);

	open(): void {
		this.stackBlitzService.openDemo(getViewPrimaryButtonDemoConfig());
	}
}
