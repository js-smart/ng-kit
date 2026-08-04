import { DemoConfig } from '../types/demo-config';

/**
 * Generates a DemoConfig for the edit-svg-icon-button-demo component
 */
export function getEditSvgIconButtonDemoConfig(): DemoConfig {
	return {
		title: 'Edit SVG Icon Button Demo',
		description: 'Demo showcasing the EditSvgIconButtonDirective from @js-smart/ng-kit',
		componentName: 'edit-svg-icon-button-demo',
		componentTs: `import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { EditSvgIconButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-edit-svg-icon-button-demo',
	standalone: true,
	imports: [EditSvgIconButtonDirective, MatButton],
	templateUrl: './edit-svg-icon-button-demo.component.html',
	styles: [\`\`],
})
export class EditSvgIconButtonDemoComponent {
	onEdit(): void {
		console.log('Edit clicked');
	}
}`,
		componentHtml: `<div>
	<h2>Directive (Preferred)</h2>
	<button ariaLabel="Edit item" (click)="onEdit()" editSvgIconButton mat-raised-button>Edit</button>
</div>

<hr />`,
	};
}
