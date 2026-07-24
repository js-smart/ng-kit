import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ViewPrimaryButtonComponent, ViewPrimaryButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-view-primary-button-demo',
	standalone: true,
	imports: [ViewPrimaryButtonComponent, ViewPrimaryButtonDirective, MatButton],
	template: `
		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="View details" (click)="onView()" viewPrimaryButton mat-raised-button>View</button>
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

	onView(): void {
		this.status.set('View clicked!');
	}
}
