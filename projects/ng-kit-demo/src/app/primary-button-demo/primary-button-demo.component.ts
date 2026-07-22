import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PrimaryButtonComponent, PrimaryButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-primary-button-demo',
	standalone: true,
	imports: [PrimaryButtonComponent, PrimaryButtonDirective],
	template: `
		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="Submit" (click)="onSubmit()" primaryButton>Submit</button>
		</div>

		<div>
			<h2>Component</h2>
			<primary-button ariaLabel="Submit" (click)="onSubmit()">Submit</primary-button>
		</div>

		<p>{{ status() }}</p>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimaryButtonDemoComponent {
	status = signal('');

	onSubmit(): void {
		this.status.set('Submit clicked!');
	}
}
