import { DemoConfig } from '../types/demo-config';

/**
 * Generates a DemoConfig for the delete-button-demo component
 */
export function getDeleteButtonDemoConfig(): DemoConfig {
	return {
		title: 'Delete Button Demo',
		description: 'Demo showcasing the DeleteButtonComponent and deleteButton directive from @js-smart/ng-kit',
		componentName: 'delete-button-demo',
		requiredImports: ['BrowserAnimationsModule'],
		componentTs: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { DeleteButtonComponent, DeleteButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-delete-button-demo',
	standalone: true,
	imports: [DeleteButtonComponent, DeleteButtonDirective],
	templateUrl: './delete-button-demo.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteButtonDemoComponent {
	status = signal('');

	onDelete(): void {
		this.status.set('Delete clicked!');
	}
}`,
		componentHtml: `<div>
	<h2>Directive (Preferred)</h2>
	<button ariaLabel="Delete item" (click)="onDelete()" deleteButton>Delete</button>
</div>

<div>
	<h2>Component</h2>
	<delete-button ariaLabel="Delete item" (click)="onDelete()"></delete-button>
</div>

<p>{{ status() }}</p>`,
	};
}
