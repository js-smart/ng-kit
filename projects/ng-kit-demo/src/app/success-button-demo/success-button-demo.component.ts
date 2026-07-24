import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { SuccessButtonComponent, SuccessButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-success-button-demo',
	standalone: true,
	imports: [SuccessButtonComponent, SuccessButtonDirective, MatButton],
	template: `
		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="Success" (click)="onSuccess()" successButton mat-raised-button>Success</button>
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
