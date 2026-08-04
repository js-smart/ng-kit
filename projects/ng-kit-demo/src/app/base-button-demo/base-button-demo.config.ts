import { DemoConfig } from '../types/demo-config';

/**
 * Generates a DemoConfig for the base-button-demo component
 */
export function getBaseButtonDemoConfig(): DemoConfig {
	return {
		title: 'Base Button Demo',
		description: 'Demo showcasing inherited Base Button inputs via PrimaryButtonDirective from @js-smart/ng-kit',
		componentName: 'base-button-demo',
		requiredImports: ['BrowserAnimationsModule'],
		componentTs: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { PrimaryButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-base-button-demo',
	standalone: true,
	imports: [PrimaryButtonDirective, MatButton],
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
	<button [loading]="loading()" label="Save" (click)="toggleLoading()" primaryButton mat-raised-button>Save</button>
</div>

<div>
	<h2>Disabled state</h2>
	<button [disabled]="true" primaryButton mat-raised-button>Disabled</button>
</div>

<div>
	<h2>With icon</h2>
	<button icon="save" primaryButton mat-raised-button>Save with icon</button>
</div>`,
	};
}
