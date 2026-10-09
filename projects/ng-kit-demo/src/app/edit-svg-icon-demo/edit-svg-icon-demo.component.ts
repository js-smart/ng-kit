import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { EditSvgIconButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-edit-svg-icon-demo',
	imports: [EditSvgIconButtonDirective, MatButton],
	template: ` <button class="m-12" editSvgIconButton mat-raised-button>Edit</button> `,
	changeDetection: ChangeDetectionStrategy.Eager,
	styles: [],
})
export class EditSvgIconDemoComponent {}
