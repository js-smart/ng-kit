import { DemoConfig } from '../types/demo-config';

/**
 * Generates a DemoConfig for the success-button-demo component
 */
export function getSuccessButtonDemoConfig(): DemoConfig {
	return {
		title: 'Success Button Demo',
		description: 'Demo showcasing the SuccessButtonDirective from @js-smart/ng-kit',
		componentName: 'success-button-demo',
		requiredImports: ['BrowserAnimationsModule'],
		componentTs: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { SuccessButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-success-button-demo',
	standalone: true,
	imports: [SuccessButtonDirective, MatButton],
	templateUrl: './success-button-demo.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessButtonDemoComponent {
	status = signal('');

	onSuccess(): void {
		this.status.set('Success clicked!');
	}
}`,
		componentHtml: `<div>
	<h2>Directive (Preferred)</h2>
	<button ariaLabel="Success" (click)="onSuccess()" successButton mat-raised-button>Success</button>
</div>

<p>{{ status() }}</p>`,
	};
}
