import { DemoConfig } from '../types/demo-config';

/**
 * Generates a DemoConfig for the primary-button-demo component
 */
export function getPrimaryButtonDemoConfig(): DemoConfig {
	return {
		title: 'Primary Button Demo',
		description: 'Demo showcasing the PrimaryButtonDirective from @js-smart/ng-kit',
		componentName: 'primary-button-demo',
		requiredImports: ['BrowserAnimationsModule'],
		componentTs: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { PrimaryButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-primary-button-demo',
	standalone: true,
	imports: [PrimaryButtonDirective, MatButton],
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
	<button ariaLabel="Submit" (click)="onSubmit()" primaryButton mat-raised-button>Submit</button>
</div>

<p>{{ status() }}</p>`,
	};
}
