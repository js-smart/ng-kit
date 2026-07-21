import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { EditBsButtonComponent, EditBsButtonDirective } from '@js-smart/ng-kit';
import { StackBlitzService } from '../services/stackblitz.service';
import { OpenInStackblitzButtonComponent } from '../shared/open-in-stackblitz-button.component';
import { getEditBsButtonDemoConfig } from './edit-bs-button-demo.config';

@Component({
	selector: 'ng-kit-edit-bs-button-demo',
	standalone: true,
	imports: [EditBsButtonComponent, EditBsButtonDirective, OpenInStackblitzButtonComponent],
	template: `
		<div style="margin-bottom: 20px;">
			<ng-kit-open-in-stackblitz-button (open)="openInStackBlitz()" />
		</div>

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

	private readonly stackBlitzService = inject(StackBlitzService);

	openInStackBlitz(): void {
		this.stackBlitzService.openDemo(getEditBsButtonDemoConfig());
	}

	onEdit(): void {
		this.status.set('Edit clicked!');
	}
}
