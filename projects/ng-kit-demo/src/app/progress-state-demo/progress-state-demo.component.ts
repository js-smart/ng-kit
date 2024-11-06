import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent, initializeState, markError, markLoading, markSuccess, SavePrimaryButtonComponent } from '@js-smart/ng-kit';

@Component({
    selector: 'app-progress-state-demo',
    imports: [CommonModule, SavePrimaryButtonComponent, AlertComponent],
    templateUrl: './progress-state-demo.component.html'
})
export class ProgressStateDemoComponent {
	updateState = initializeState();

	setLoading() {
		markLoading(this.updateState);

		setTimeout(() => {
			markSuccess(this.updateState, 'Successfully saved data');
		}, 2000);

		setTimeout(() => {
			markError(this.updateState, 'Failed to save data');
		}, 5000);
	}
}
