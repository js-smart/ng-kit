import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { EditSvgIconButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-edit-svg-icon-button-demo',
	imports: [EditSvgIconButtonDirective, MatButton],
	template: `
		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="Edit item" (click)="onEdit()" editSvgIconButton mat-raised-button>Edit</button>
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
