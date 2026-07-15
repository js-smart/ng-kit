import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EditSvgIconButtonComponent, EditSvgIconButtonDirective } from '@js-smart/ng-kit';
import { StackBlitzService } from '../services/stackblitz.service';
import { OpenInStackblitzButtonComponent } from '../shared/open-in-stackblitz-button.component';
import { getEditSvgIconButtonDemoConfig } from './edit-svg-icon-button-demo.config';

@Component({
	selector: 'ng-kit-edit-svg-icon-button-demo',
	imports: [EditSvgIconButtonComponent, EditSvgIconButtonDirective, OpenInStackblitzButtonComponent],
	template: `
		<div style="margin-bottom: 20px;">
			<ng-kit-open-in-stackblitz-button (open)="openInStackBlitz()" />
		</div>

		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="Edit item" (click)="onEdit()" editSvgIconButton>Edit</button>
		</div>

		<div>
			<h2>Component</h2>
			<edit-svg-icon-button ariaLabel="Edit item" (click)="onEdit()"></edit-svg-icon-button>
		</div>
	`,
	styles: [``],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditSvgIconButtonDemoComponent {
	private readonly stackBlitzService = inject(StackBlitzService);

	onEdit(): void {
		console.log('Edit clicked');
	}

	openInStackBlitz(): void {
		this.stackBlitzService.openDemo(getEditSvgIconButtonDemoConfig());
	}
}
