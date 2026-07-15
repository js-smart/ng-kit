import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { EditButtonComponent, EditButtonDirective } from '@js-smart/ng-kit';
import { StackBlitzService } from '../services/stackblitz.service';
import { OpenInStackblitzButtonComponent } from '../shared/open-in-stackblitz-button.component';
import { getEditButtonDemoConfig } from './edit-button-demo.config';

@Component({
	selector: 'ng-kit-edit-button-demo',
	standalone: true,
	imports: [EditButtonComponent, EditButtonDirective, OpenInStackblitzButtonComponent],
	template: `
		<div style="margin-bottom: 20px;">
			<ng-kit-open-in-stackblitz-button (open)="openInStackBlitz()" />
		</div>

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

	private readonly stackBlitzService = inject(StackBlitzService);

	openInStackBlitz(): void {
		this.stackBlitzService.openDemo(getEditButtonDemoConfig());
	}

	onEdit(): void {
		this.status.set('Edit clicked!');
	}
}
