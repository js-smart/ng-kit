import { DemoConfig } from '../types/demo-config';

/**
 * Generates a DemoConfig for the edit-button-demo component
 */
export function getEditButtonDemoConfig(): DemoConfig {
	return {
		title: 'Edit Button Demo',
		description: 'Demo showcasing the EditButtonComponent and editButton directive from @js-smart/ng-kit',
		componentName: 'edit-button-demo',
		requiredImports: ['BrowserAnimationsModule'],
		componentTs: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { EditButtonComponent, EditButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-edit-button-demo',
	standalone: true,
	imports: [EditButtonComponent, EditButtonDirective],
	templateUrl: './edit-button-demo.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditButtonDemoComponent {
	status = signal('');

	onEdit(): void {
		this.status.set('Edit clicked!');
	}
}`,
		componentHtml: `<div>
	<h2>Directive (Preferred)</h2>
	<button ariaLabel="Edit item" (click)="onEdit()" editButton>Edit</button>
</div>

<div>
	<h2>Component</h2>
	<edit-button ariaLabel="Edit item" (click)="onEdit()"></edit-button>
</div>

<p>{{ status() }}</p>`,
	};
}
