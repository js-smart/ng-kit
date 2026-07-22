import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SuccessButtonComponent, SuccessButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-success-button-demo',
	standalone: true,
	imports: [SuccessButtonComponent, SuccessButtonDirective],
	template: `
		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="Success" (click)="onSuccess()" successButton>Success</button>
		</div>

		<div>
			<h2>Component</h2>
			<success-button ariaLabel="Success" (click)="onSuccess()">Success</success-button>
		</div>

		<p>{{ status() }}</p>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessButtonDemoComponent {
	status = signal('');

	onSuccess(): void {
		this.status.set('Success clicked!');
	}
}
