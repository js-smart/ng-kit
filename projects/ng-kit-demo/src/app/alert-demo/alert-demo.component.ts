import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AlertComponent } from '@js-smart/ng-kit';
import { StackBlitzService } from '../services/stackblitz.service';
import { getAlertDemoConfig } from '../utils/demo-config-generator';

@Component({
	selector: 'ng-kit-alert-demo',
	imports: [AlertComponent],
	templateUrl: './alert-demo.component.html',
	styles: [``],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDemoComponent {
	dismissOnTimeout = false;
	dismissible = true;

	private readonly stackBlitzService = inject(StackBlitzService);

	openInStackBlitz(): void {
		this.stackBlitzService.openDemo(getAlertDemoConfig());
	}
}
