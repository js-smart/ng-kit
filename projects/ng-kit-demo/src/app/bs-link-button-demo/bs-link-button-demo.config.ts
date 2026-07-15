import { DemoConfig } from '@ng-kit-demo/types/demo-config';

/**
 * Generates a DemoConfig for the bs-link-button-demo component
 */
export function getBsLinkButtonDemoConfig(): DemoConfig {
	return {
		title: 'Bootstrap Link Button Demo',
		description: 'Demo showcasing the Bootstrap Link Button component and directive from @js-smart/ng-kit',
		componentName: 'bs-link-button-demo',
		componentTs: `import { Component } from '@angular/core';
import { BsLinkButtonComponent, BsLinkButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-bs-link-button-demo',
	standalone: true,
	imports: [BsLinkButtonComponent, BsLinkButtonDirective],
	templateUrl: './bs-link-button-demo.component.html',
	styles: [\`\`],
})
export class BsLinkButtonDemoComponent {}`,
		componentHtml: `<div class="m-3">
	<h2>Directive (Preferred)</h2>
	<a bsLinkButton ariaLabel="Bootstrap Link Button" href="/path">Bootstrap Link Button</a>
</div>

<div class="m-3">
	<h2>Component</h2>
	<bs-link-button class="m-3" label="Bootstrap Link Button"></bs-link-button>
</div>

<hr />`,
	};
}
