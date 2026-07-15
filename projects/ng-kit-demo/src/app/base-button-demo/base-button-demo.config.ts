import { DemoConfig } from '../types/demo-config';

/**
 * Generates a DemoConfig for the base-button-demo component
 */
export function getBaseButtonDemoConfig(): DemoConfig {
	return {
		title: 'Base Button Demo',
		description: 'Demo showcasing inherited Base Button inputs via PrimaryButtonComponent from @js-smart/ng-kit',
		componentName: 'base-button-demo',
		requiredImports: ['BrowserAnimationsModule'],
		componentTs: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PrimaryButtonComponent, PrimaryButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-base-button-demo',
	standalone: true,
	imports: [PrimaryButtonComponent, PrimaryButtonDirective],
	templateUrl: './base-button-demo.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseButtonDemoComponent {
	loading = signal(false);

	toggleLoading(): void {
		this.loading.update((value) => !value);
	}
}`,
		componentHtml: `<div>
	<h2>Loading state</h2>
	<primary-button [loading]="loading()" label="Save" (click)="toggleLoading()"></primary-button>
</div>

<div>
	<h2>Disabled state</h2>
	<primary-button [disabled]="true" label="Disabled"></primary-button>
</div>

<div>
	<h2>With icon</h2>
	<primary-button [showIcon]="true" icon="save" label="Save with icon"></primary-button>
</div>

<div>
	<h2>Directive with loading</h2>
	<button ariaLabel="Submit" [loading]="loading()" primaryButton>Submit</button>
</div>`,
	};
}
