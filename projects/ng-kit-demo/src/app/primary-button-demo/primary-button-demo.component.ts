import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PrimaryButtonComponent, PrimaryButtonDirective } from '@js-smart/ng-kit';
import { StackBlitzService } from '../services/stackblitz.service';
import { getPrimaryButtonDemoConfig } from './primary-button-demo.config';

@Component({
	selector: 'ng-kit-primary-button-demo',
	standalone: true,
	imports: [PrimaryButtonComponent, PrimaryButtonDirective],
	template: `
		<div style="margin-bottom: 20px;">
			<button (click)="openInStackBlitz()" class="btn btn-primary">🚀 Open in StackBlitz</button>
		</div>

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

	private readonly stackBlitzService = inject(StackBlitzService);

	openInStackBlitz(): void {
		this.stackBlitzService.openDemo(getPrimaryButtonDemoConfig());
	}

	onSubmit(): void {
		this.status.set('Submit clicked!');
	}
}
