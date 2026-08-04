import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { PreventMultipleClicksDirective, ViewButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-directives-demo',
	imports: [ViewButtonDirective, MatButton, PreventMultipleClicksDirective],
	changeDetection: ChangeDetectionStrategy.Eager,
	template: `
		<div class="m-5">
			<button class="m-3" viewButton mat-button preventMultipleClicks (throttleClick)="click()">Throttle Button</button>
		</div>
	`,
})
export class DirectivesDemoComponent {
	click(): void {
		console.log('Clicked');
	}
}
