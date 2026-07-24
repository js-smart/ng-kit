import { DemoConfig } from '../types/demo-config';

/**
 * Generates a DemoConfig for the edit-bs-button-demo component
 */
export function getEditBsButtonDemoConfig(): DemoConfig {
	return {
		title: 'Edit Bootstrap Button Demo',
		description: 'Demo showcasing the EditBsButtonComponent and editBsButton directive from @js-smart/ng-kit',
		componentName: 'edit-bs-button-demo',
		requiredImports: ['BrowserAnimationsModule'],
		componentTs: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { EditBsButtonComponent, EditBsButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-edit-bs-button-demo',
	standalone: true,
	imports: [EditBsButtonComponent, EditBsButtonDirective, MatButton],
	templateUrl: './edit-bs-button-demo.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditBsButtonDemoComponent {
	status = signal('');

	onEdit(): void {
		this.status.set('Edit clicked!');
	}
}`,
		componentHtml: `<div>
	<h2>Directive (Preferred)</h2>
	<button ariaLabel="Edit item" (click)="onEdit()" editBsButton mat-button>Edit</button>
</div>

<div>
	<h2>Component</h2>
	<edit-bs-button ariaLabel="Edit item" (click)="onEdit()"></edit-bs-button>
</div>

<p>{{ status() }}</p>`,
	};
}
