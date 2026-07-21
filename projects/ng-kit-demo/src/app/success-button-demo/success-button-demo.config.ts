import { DemoConfig } from '../types/demo-config';

/**
 * Generates a DemoConfig for the success-button-demo component
 */
export function getSuccessButtonDemoConfig(): DemoConfig {
	return {
		title: 'Success Button Demo',
		description: 'Demo showcasing the SuccessButtonComponent and successButton directive from @js-smart/ng-kit',
		componentName: 'success-button-demo',
		requiredImports: ['BrowserAnimationsModule'],
		componentTs: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SuccessButtonComponent, SuccessButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-success-button-demo',
	standalone: true,
	imports: [SuccessButtonComponent, SuccessButtonDirective],
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
	<button ariaLabel="Success" (click)="onSuccess()" successButton>Success</button>
</div>

<div>
	<h2>Component</h2>
	<success-button ariaLabel="Success" (click)="onSuccess()">Success</success-button>
</div>

<p>{{ status() }}</p>`,
	};
}
