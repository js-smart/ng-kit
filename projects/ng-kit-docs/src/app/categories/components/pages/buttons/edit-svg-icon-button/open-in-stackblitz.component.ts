import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StackBlitzService } from '@ng-kit-demo/services/stackblitz.service';
import { getEditSvgIconButtonDemoConfig } from '@ng-kit-demo/edit-svg-icon-button-demo/edit-svg-icon-button-demo.config';

@Component({
	selector: 'ng-kit-edit-svg-icon-button-open-in-stackblitz',
	standalone: true,
	template: `<button (click)="open()" class="btn btn-primary">🚀 Open in StackBlitz</button>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditSvgIconButtonOpenInStackblitzComponent {
	private readonly stackBlitzService = inject(StackBlitzService);

	open(): void {
		this.stackBlitzService.openDemo(getEditSvgIconButtonDemoConfig());
	}
}
