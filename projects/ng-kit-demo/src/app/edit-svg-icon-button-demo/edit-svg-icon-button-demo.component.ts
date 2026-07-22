import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EditSvgIconButtonComponent, EditSvgIconButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-edit-svg-icon-button-demo',
	imports: [EditSvgIconButtonComponent, EditSvgIconButtonDirective],
	template: `
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
	onEdit(): void {
		console.log('Edit clicked');
	}
}
