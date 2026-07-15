import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ViewPrimaryButtonComponent, ViewPrimaryButtonDirective } from '@js-smart/ng-kit';
import { StackBlitzService } from '../services/stackblitz.service';
import { OpenInStackblitzButtonComponent } from '../shared/open-in-stackblitz-button.component';
import { getViewPrimaryButtonDemoConfig } from './view-primary-button-demo.config';

@Component({
	selector: 'ng-kit-view-primary-button-demo',
	standalone: true,
	imports: [ViewPrimaryButtonComponent, ViewPrimaryButtonDirective, OpenInStackblitzButtonComponent],
	template: `
		<div style="margin-bottom: 20px;">
			<ng-kit-open-in-stackblitz-button (open)="openInStackBlitz()" />
		</div>

		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="View details" (click)="onView()" viewPrimaryButton>View</button>
		</div>

		<div>
			<h2>Component</h2>
			<view-primary-button ariaLabel="View details" (click)="onView()">View</view-primary-button>
		</div>

		<p>{{ status() }}</p>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewPrimaryButtonDemoComponent {
	status = signal('');

	private readonly stackBlitzService = inject(StackBlitzService);

	openInStackBlitz(): void {
		this.stackBlitzService.openDemo(getViewPrimaryButtonDemoConfig());
	}

	onView(): void {
		this.status.set('View clicked!');
	}
}
