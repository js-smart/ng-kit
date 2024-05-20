import { Component } from '@angular/core';
import { AlertComponent } from '@js-smart/ng-utils';

@Component({
	selector: 'ng-utils-alert-demo',
	standalone: true,
	imports: [AlertComponent],
	templateUrl: './alert-demo.component.html',
	styles: [``],
})
export class AlertDemoComponent {
	dismissOnTimeout = false;
	dismissible = true;
}
