import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { EditBsButtonComponent, EditBsButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-edit-bs-button-demo',
	standalone: true,
	imports: [EditBsButtonComponent, EditBsButtonDirective, MatButton],
	template: `
		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="Edit item" (click)="onEdit()" editBsButton mat-button>Edit</button>
		</div>

		<div>
			<h2>Component</h2>
			<edit-bs-button ariaLabel="Edit item" (click)="onEdit()"></edit-bs-button>
		</div>

		<p>{{ status() }}</p>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditBsButtonDemoComponent {
	status = signal('');

	onEdit(): void {
		this.status.set('Edit clicked!');
	}
}
