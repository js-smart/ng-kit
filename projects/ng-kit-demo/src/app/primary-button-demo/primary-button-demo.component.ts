import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { PrimaryButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-primary-button-demo',
	standalone: true,
	imports: [PrimaryButtonDirective, MatButton],
	template: `
		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="Submit" (click)="onSubmit()" primaryButton mat-raised-button>Submit</button>
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
