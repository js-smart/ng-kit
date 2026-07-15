import { DemoConfig } from '../types/demo-config';

/**
 * Generates a DemoConfig for the save-primary-button-demo component
 */
export function getSavePrimaryButtonDemoConfig(): DemoConfig {
	return {
		title: 'Save Primary Button Demo',
		description: 'Demo showcasing the SavePrimaryButtonComponent and savePrimaryButton directive from @js-smart/ng-kit',
		componentName: 'save-primary-button-demo',
		requiredImports: ['BrowserAnimationsModule'],
		componentTs: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SavePrimaryButtonComponent, SavePrimaryButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-save-primary-button-demo',
	standalone: true,
	imports: [SavePrimaryButtonComponent, SavePrimaryButtonDirective],
	templateUrl: './save-primary-button-demo.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavePrimaryButtonDemoComponent {
	status = signal('');

	onSave(): void {
		this.status.set('Save clicked!');
	}
}`,
		componentHtml: `<div>
	<h2>Directive (Preferred)</h2>
	<button ariaLabel="Save" (click)="onSave()" savePrimaryButton>Save</button>
</div>

<div>
	<h2>Component</h2>
	<save-primary-button ariaLabel="Save" (click)="onSave()">Save</save-primary-button>
</div>

<p>{{ status() }}</p>`,
	};
}
