import { Component } from '@angular/core';
import { PreventMultipleClicksDirective, ViewButtonComponent } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-directives-demo',
	imports: [ViewButtonComponent, PreventMultipleClicksDirective],
	template: `
		<div class="m-5">
			<view-button class="m-3" label="Throttle Button" (throttleClick)="click()" preventMultipleClicks></view-button>
		</div>
	`,
	standalone: true,
})
export class DirectivesDemoComponent {
	click() {
		console.log('Clicked');
	}
}
