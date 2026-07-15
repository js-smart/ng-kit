import { DemoConfig } from '../types/demo-config';

/**
 * Generates a DemoConfig for the edit-svg-icon-button-demo component
 */
export function getEditSvgIconButtonDemoConfig(): DemoConfig {
	return {
		title: 'Edit SVG Icon Button Demo',
		description: 'Demo showcasing the EditSvgIconButtonComponent and editSvgIconButton directive from @js-smart/ng-kit',
		componentName: 'edit-svg-icon-button-demo',
		componentTs: `import { Component } from '@angular/core';
import { EditSvgIconButtonComponent, EditSvgIconButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-edit-svg-icon-button-demo',
	standalone: true,
	imports: [EditSvgIconButtonComponent, EditSvgIconButtonDirective],
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
	<button ariaLabel="Edit item" (click)="onEdit()" editSvgIconButton>Edit</button>
</div>

<div>
	<h2>Component</h2>
	<edit-svg-icon-button ariaLabel="Edit item" (click)="onEdit()"></edit-svg-icon-button>
</div>

<hr />`,
	};
}
