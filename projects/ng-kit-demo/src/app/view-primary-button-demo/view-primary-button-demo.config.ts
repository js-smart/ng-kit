import { DemoConfig } from '../types/demo-config';

/**
 * Generates a DemoConfig for the view-primary-button-demo component
 */
export function getViewPrimaryButtonDemoConfig(): DemoConfig {
	return {
		title: 'View Primary Button Demo',
		description: 'Demo showcasing the ViewPrimaryButtonComponent and viewPrimaryButton directive from @js-smart/ng-kit',
		componentName: 'view-primary-button-demo',
		requiredImports: ['BrowserAnimationsModule'],
		componentTs: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ViewPrimaryButtonComponent, ViewPrimaryButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-view-primary-button-demo',
	standalone: true,
	imports: [ViewPrimaryButtonComponent, ViewPrimaryButtonDirective],
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
	<button ariaLabel="View details" (click)="onView()" viewPrimaryButton>View</button>
</div>

<div>
	<h2>Component</h2>
	<view-primary-button ariaLabel="View details" (click)="onView()">View</view-primary-button>
</div>

<p>{{ status() }}</p>`,
	};
}
