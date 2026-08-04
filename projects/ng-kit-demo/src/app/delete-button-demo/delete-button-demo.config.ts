import { DemoConfig } from '../types/demo-config';

/**
 * Generates a DemoConfig for the delete-button-demo component
 */
export function getDeleteButtonDemoConfig(): DemoConfig {
	return {
		title: 'Delete Button Demo',
		description: 'Demo showcasing the DeleteButtonDirective from @js-smart/ng-kit',
		componentName: 'delete-button-demo',
		requiredImports: ['BrowserAnimationsModule'],
		componentTs: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { DeleteButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-delete-button-demo',
	standalone: true,
	imports: [DeleteButtonDirective, MatButton],
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
	<button ariaLabel="Delete item" (click)="onDelete()" deleteButton mat-raised-button>Delete</button>
</div>

<p>{{ status() }}</p>`,
	};
}
