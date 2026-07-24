import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { DeleteButtonComponent, DeleteButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-delete-button-demo',
	standalone: true,
	imports: [DeleteButtonComponent, DeleteButtonDirective, MatButton],
	template: `
		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="Delete item" (click)="onDelete()" deleteButton mat-raised-button>Delete</button>
		</div>

		<div>
			<h2>Component</h2>
			<delete-button ariaLabel="Delete item" (click)="onDelete()"></delete-button>
		</div>

		<p>{{ status() }}</p>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteButtonDemoComponent {
	status = signal('');

	onDelete(): void {
		this.status.set('Delete clicked!');
	}
}
