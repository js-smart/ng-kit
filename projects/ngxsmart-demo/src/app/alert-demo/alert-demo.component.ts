import {Component} from '@angular/core';
import {AlertComponent} from '@js-smart/ngxsmart';

@Component({
	selector: 'ngxsmart-alert-demo',
	standalone: true,
	imports: [AlertComponent],
	templateUrl: './alert-demo.component.html',
})
export class AlertDemoComponent {
	dismissOnTimeout = true;
	dismissible = true;
}
