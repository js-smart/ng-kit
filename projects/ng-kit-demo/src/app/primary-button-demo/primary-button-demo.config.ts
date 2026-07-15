import { DemoConfig } from '../types/demo-config';

/**
 * Generates a DemoConfig for the primary-button-demo component
 */
export function getPrimaryButtonDemoConfig(): DemoConfig {
	return {
		title: 'Primary Button Demo',
		description: 'Demo showcasing the PrimaryButtonComponent and primaryButton directive from @js-smart/ng-kit',
		componentName: 'primary-button-demo',
		requiredImports: ['BrowserAnimationsModule'],
		componentTs: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PrimaryButtonComponent, PrimaryButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-primary-button-demo',
	standalone: true,
	imports: [PrimaryButtonComponent, PrimaryButtonDirective],
	templateUrl: './primary-button-demo.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimaryButtonDemoComponent {
	status = signal('');

	onSubmit(): void {
		this.status.set('Submit clicked!');
	}
}`,
		componentHtml: `<div>
	<h2>Directive (Preferred)</h2>
	<button ariaLabel="Submit" (click)="onSubmit()" primaryButton>Submit</button>
</div>

<div>
	<h2>Component</h2>
	<primary-button ariaLabel="Submit" (click)="onSubmit()">Submit</primary-button>
</div>

<p>{{ status() }}</p>`,
	};
}
