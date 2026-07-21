import { DemoConfig } from '../types/demo-config';

/**
 * Generates a DemoConfig for the manage-button-demo component
 */
export function getManageButtonDemoConfig(): DemoConfig {
	return {
		title: 'Manage Button Demo',
		description: 'Demo showcasing the ManageButtonComponent and manageButton directive from @js-smart/ng-kit',
		componentName: 'manage-button-demo',
		requiredImports: ['BrowserAnimationsModule'],
		componentTs: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ManageButtonComponent, ManageButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-manage-button-demo',
	standalone: true,
	imports: [ManageButtonComponent, ManageButtonDirective],
	templateUrl: './manage-button-demo.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageButtonDemoComponent {
	status = signal('');

	onManage(): void {
		this.status.set('Manage clicked!');
	}
}`,
		componentHtml: `<div>
	<h2>Directive (Preferred)</h2>
	<button ariaLabel="Manage settings" (click)="onManage()" manageButton>Manage</button>
</div>

<div>
	<h2>Component</h2>
	<manage-button ariaLabel="Manage settings" (click)="onManage()"></manage-button>
</div>

<p>{{ status() }}</p>`,
	};
}
