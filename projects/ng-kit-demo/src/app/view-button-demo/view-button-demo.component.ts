import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ViewButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-view-button-demo',
	standalone: true,
	imports: [ViewButtonDirective],
	template: `
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

	onView(): void {
		this.status.set('View clicked!');
	}
}
