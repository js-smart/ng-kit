import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DeleteButtonComponent, DeleteButtonDirective } from '@js-smart/ng-kit';
import { StackBlitzService } from '../services/stackblitz.service';
import { OpenInStackblitzButtonComponent } from '../shared/open-in-stackblitz-button.component';
import { getDeleteButtonDemoConfig } from './delete-button-demo.config';

@Component({
	selector: 'ng-kit-delete-button-demo',
	standalone: true,
	imports: [DeleteButtonComponent, DeleteButtonDirective, OpenInStackblitzButtonComponent],
	template: `
		<div style="margin-bottom: 20px;">
			<ng-kit-open-in-stackblitz-button (open)="openInStackBlitz()" />
		</div>

		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="Delete item" (click)="onDelete()" deleteButton>Delete</button>
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

	private readonly stackBlitzService = inject(StackBlitzService);

	openInStackBlitz(): void {
		this.stackBlitzService.openDemo(getDeleteButtonDemoConfig());
	}

	onDelete(): void {
		this.status.set('Delete clicked!');
	}
}
