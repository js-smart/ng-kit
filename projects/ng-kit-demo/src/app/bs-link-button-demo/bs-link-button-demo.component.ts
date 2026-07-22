import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BsLinkButtonComponent, BsLinkButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-bs-link-button-demo',
	imports: [BsLinkButtonComponent, BsLinkButtonDirective],
	template: `
		<div class="m-3">
			<h2>Directive (Preferred)</h2>
			<a bsLinkButton ariaLabel="Bootstrap Link Button" href="/path">Bootstrap Link Button</a>
		</div>

		<div class="m-3">
			<h2>Component</h2>
			<bs-link-button class="m-3" label="Bootstrap Link Button"></bs-link-button>
		</div>
	`,
	styles: [``],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BsLinkButtonDemoComponent {}
