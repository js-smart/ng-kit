import { DemoConfig } from '@ng-kit-demo/types/demo-config';

/**
 * Generates a DemoConfig for the bs-link-button-demo component
 */
export function getBsLinkButtonDemoConfig(): DemoConfig {
	return {
		title: 'Bootstrap Link Button Demo',
		description: 'Demo showcasing the BsLinkButtonDirective from @js-smart/ng-kit',
		componentName: 'bs-link-button-demo',
		componentTs: `import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { BsLinkButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-bs-link-button-demo',
	standalone: true,
	imports: [BsLinkButtonDirective, MatButton],
	templateUrl: './bs-link-button-demo.component.html',
	styles: [\`\`],
})
export class BsLinkButtonDemoComponent {}`,
		componentHtml: `<div class="m-5">
	<h2>Directive (Preferred)</h2>
	<a bsLinkButton ariaLabel="Bootstrap Link Button" href="/path" mat-button>Bootstrap Link Button</a>
</div>

<hr />`,
	};
}
