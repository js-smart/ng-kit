import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AlertComponent, initializeState, markError, markLoading, markSuccess, SavePrimaryButtonComponent } from '@js-smart/ng-kit';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-progress-state-demo',
	imports: [SavePrimaryButtonComponent, AlertComponent],
	templateUrl: './progress-state-demo.component.html',
})
export class ProgressStateDemoComponent {
	updateState = initializeState();

	setLoading(): void {
		markLoading(this.updateState);

		setTimeout(() => {
			markSuccess(this.updateState, 'Successfully saved data');
		}, 2000);

		setTimeout(() => {
			markError(this.updateState, 'Failed to save data');
		}, 5000);
	}
}
