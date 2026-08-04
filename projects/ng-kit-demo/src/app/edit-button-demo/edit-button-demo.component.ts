import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { EditButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-edit-button-demo',
	standalone: true,
	imports: [EditButtonDirective, MatButton],
	template: `
		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="Edit item" (click)="onEdit()" editButton mat-raised-button>Edit</button>
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
