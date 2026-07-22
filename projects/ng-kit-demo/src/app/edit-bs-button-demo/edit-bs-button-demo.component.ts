import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { EditBsButtonComponent, EditBsButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-edit-bs-button-demo',
	standalone: true,
	imports: [EditBsButtonComponent, EditBsButtonDirective],
	template: `
		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="Edit item" (click)="onEdit()" editBsButton>Edit</button>
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
