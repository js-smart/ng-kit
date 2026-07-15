import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { SuccessButtonComponent, SuccessButtonDirective } from '@js-smart/ng-kit';
import { StackBlitzService } from '../services/stackblitz.service';
import { getSuccessButtonDemoConfig } from './success-button-demo.config';

@Component({
	selector: 'ng-kit-success-button-demo',
	standalone: true,
	imports: [SuccessButtonComponent, SuccessButtonDirective],
	template: `
		<div style="margin-bottom: 20px;">
			<button (click)="openInStackBlitz()" class="btn btn-primary">🚀 Open in StackBlitz</button>
		</div>

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

	private readonly stackBlitzService = inject(StackBlitzService);

	openInStackBlitz(): void {
		this.stackBlitzService.openDemo(getSuccessButtonDemoConfig());
	}

	onSuccess(): void {
		this.status.set('Success clicked!');
	}
}
