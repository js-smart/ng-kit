import { DemoConfig } from '../types/demo-config';

/**
 * Generates a DemoConfig for the edit-button-demo component
 */
export function getEditButtonDemoConfig(): DemoConfig {
	return {
		title: 'Edit Button Demo',
		description: 'Demo showcasing the EditButtonDirective from @js-smart/ng-kit',
		componentName: 'edit-button-demo',
		requiredImports: ['BrowserAnimationsModule'],
		componentTs: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { EditButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-edit-button-demo',
	standalone: true,
	imports: [EditButtonDirective, MatButton],
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
	<button ariaLabel="Edit item" (click)="onEdit()" editButton mat-raised-button>Edit</button>
</div>

<p>{{ status() }}</p>`,
	};
}
