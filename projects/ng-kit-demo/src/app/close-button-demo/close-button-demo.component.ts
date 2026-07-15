import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CloseButtonDirective } from '@js-smart/ng-kit';
import { StackBlitzService } from '@ng-kit-demo/services/stackblitz.service';
import { getCloseButtonDemoConfig } from '@ng-kit-demo/close-button-demo/close-button-demo.config';

@Component({
	selector: 'ng-kit-close-button-demo',
	imports: [CloseButtonDirective],
	templateUrl: './close-button-demo.component.html',
	styles: [``],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloseButtonDemoComponent {
	isPanelVisible = signal(true);

	private readonly stackBlitzService = inject(StackBlitzService);

	openInStackBlitz(): void {
		this.stackBlitzService.openDemo(getCloseButtonDemoConfig());
	}

	closePanel(): void {
		this.isPanelVisible.set(false);
	}

	resetPanel(): void {
		this.isPanelVisible.set(true);
	}
}
