import { Component, OnInit } from '@angular/core';
import { AlertComponent } from '@ngxsmart/ngxsmart';

@Component({
	selector: 'ngxsmart-alert-demo',
	standalone: true,
	imports: [AlertComponent],
	templateUrl: './alert-demo.component.html',
	styleUrls: ['./alert-demo.component.scss'],
})
export class AlertDemoComponent implements OnInit {
	dismissOnTimeout = true;
	dismissible = true;

	constructor() {}

	ngOnInit(): void {}
}
