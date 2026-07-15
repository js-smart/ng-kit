import { DemoConfig } from '@ng-kit-demo/types/demo-config';

/**
 * Generates a DemoConfig for the close-button-demo component
 */
export function getCloseButtonDemoConfig(): DemoConfig {
	return {
		title: 'Close Button Demo',
		description: 'Demo showcasing the CloseButtonDirective from @js-smart/ng-kit',
		componentName: 'close-button-demo',
		componentTs: `import { Component, signal } from '@angular/core';
import { CloseButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-close-button-demo',
	standalone: true,
	imports: [CloseButtonDirective],
	templateUrl: './close-button-demo.component.html',
	styles: [\`\`],
})
export class CloseButtonDemoComponent {
	isPanelVisible = signal(true);

	closePanel(): void {
		this.isPanelVisible.set(false);
	}

	resetPanel(): void {
		this.isPanelVisible.set(true);
	}
}`,
		componentHtml: `@if (isPanelVisible()) {
	<div class="alert alert-info d-flex justify-content-between align-items-center">
		<span>This is a dismissible panel. Click the close button to hide it.</span>
		<button ariaLabel="Close panel" closeButton (click)="closePanel()">&times;</button>
	</div>
} @else {
	<button class="btn btn-secondary" (click)="resetPanel()">Reset Demo</button>
}

<hr />

<div>
	<h2>Basic Close Button</h2>
	<button ariaLabel="Close dialog" closeButton>&times;</button>
</div>`,
	};
}
