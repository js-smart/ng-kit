import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreventsMultipleClicksDirectiveModule, ViewButtonComponentModule } from '@ngxsmart/ngxsmart';

@Component({
	selector: 'ngxsmart-directives-demo',
	template: `
		<div class="m-5">
			<view-button class="m-3" label="Throttle Button" (throttleClick)="click()" [throttleTime]="5000" preventMultipleClicks></view-button>
		</div>
	`,
	styles: [],
})
export class DirectivesDemoComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	click() {
		console.log('Clicked');
	}
}

@NgModule({
	imports: [CommonModule, ViewButtonComponentModule, PreventsMultipleClicksDirectiveModule],
	declarations: [DirectivesDemoComponent],
	exports: [DirectivesDemoComponent],
})
export class DirectivesDemoComponentModule {}
