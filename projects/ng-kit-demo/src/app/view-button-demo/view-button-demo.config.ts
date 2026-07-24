import { DemoConfig } from '../types/demo-config';

/**
 * Generates a DemoConfig for the view-button-demo component
 */
export function getViewButtonDemoConfig(): DemoConfig {
	return {
		title: 'View Button Demo',
		description: 'Demo showcasing the ViewButtonDirective from @js-smart/ng-kit',
		componentName: 'view-button-demo',
		requiredImports: ['BrowserAnimationsModule'],
		componentTs: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ViewButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-view-button-demo',
	standalone: true,
	imports: [ViewButtonDirective, MatButton],
	templateUrl: './view-button-demo.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewButtonDemoComponent {
	status = signal('');

	onView(): void {
		this.status.set('View clicked!');
	}
}`,
		componentHtml: `<div>
	<h2>Directive (Preferred)</h2>
	<button ariaLabel="View details" (click)="onView()" viewButton mat-button>View</button>
</div>

<p>{{ status() }}</p>`,
	};
}
