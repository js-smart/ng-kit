import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent, initializeState, markLoading, markSuccess, SavePrimaryButtonComponent } from '@js-smart/ngxsmart';

@Component({
	selector: 'app-progress-state-demo',
	standalone: true,
	imports: [CommonModule, SavePrimaryButtonComponent, AlertComponent],
	templateUrl: './progress-state-demo.component.html',
})
export class ProgressStateDemoComponent {
	updateState = initializeState();

	setLoading() {
		markLoading(this.updateState);

		setTimeout(() => {
			markSuccess(this.updateState, 'Successfully saved data');
		}, 2000);
	}
}
