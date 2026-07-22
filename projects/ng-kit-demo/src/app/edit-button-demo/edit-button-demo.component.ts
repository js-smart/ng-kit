import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { EditButtonComponent, EditButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-edit-button-demo',
	standalone: true,
	imports: [EditButtonComponent, EditButtonDirective],
	template: `
		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="Edit item" (click)="onEdit()" editButton>Edit</button>
		</div>

		<div>
			<h2>Component</h2>
			<edit-button ariaLabel="Edit item" (click)="onEdit()"></edit-button>
		</div>

		<p>{{ status() }}</p>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditButtonDemoComponent {
	status = signal('');

	onEdit(): void {
		this.status.set('Edit clicked!');
	}
}
