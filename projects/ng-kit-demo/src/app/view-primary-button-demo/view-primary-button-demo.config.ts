import { DemoConfig } from '../types/demo-config';

/**
 * Generates a DemoConfig for the view-primary-button-demo component
 */
export function getViewPrimaryButtonDemoConfig(): DemoConfig {
	return {
		title: 'View Primary Button Demo',
		description: 'Demo showcasing the ViewPrimaryButtonDirective from @js-smart/ng-kit',
		componentName: 'view-primary-button-demo',
		requiredImports: ['BrowserAnimationsModule'],
		componentTs: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ViewPrimaryButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-view-primary-button-demo',
	standalone: true,
	imports: [ViewPrimaryButtonDirective, MatButton],
	templateUrl: './view-primary-button-demo.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewPrimaryButtonDemoComponent {
	status = signal('');

	onView(): void {
		this.status.set('View clicked!');
	}
}`,
		componentHtml: `<div>
	<h2>Directive (Preferred)</h2>
	<button ariaLabel="View details" (click)="onView()" viewPrimaryButton mat-raised-button>View</button>
</div>

<p>{{ status() }}</p>`,
	};
}
