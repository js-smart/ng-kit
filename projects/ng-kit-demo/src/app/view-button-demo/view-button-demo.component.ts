import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ViewButtonDirective } from '@js-smart/ng-kit';
import { StackBlitzService } from '../services/stackblitz.service';
import { OpenInStackblitzButtonComponent } from '../shared/open-in-stackblitz-button.component';
import { getViewButtonDemoConfig } from './view-button-demo.config';

@Component({
	selector: 'ng-kit-view-button-demo',
	standalone: true,
	imports: [ViewButtonDirective, OpenInStackblitzButtonComponent],
	template: `
		<div style="margin-bottom: 20px;">
			<ng-kit-open-in-stackblitz-button (open)="openInStackBlitz()" />
		</div>

		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="View details" (click)="onView()" viewButton>View</button>
		</div>

		<p>{{ status() }}</p>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewButtonDemoComponent {
	status = signal('');

	private readonly stackBlitzService = inject(StackBlitzService);

	openInStackBlitz(): void {
		this.stackBlitzService.openDemo(getViewButtonDemoConfig());
	}

	onView(): void {
		this.status.set('View clicked!');
	}
}
