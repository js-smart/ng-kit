import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { BsLinkButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-bs-link-button-demo',
	imports: [BsLinkButtonDirective, MatButton],
	template: `
		<div class="m-3">
			<h2>Directive (Preferred)</h2>
			<a bsLinkButton ariaLabel="Bootstrap Link Button" href="/path" mat-button>Bootstrap Link Button</a>
		</div>
	`,
	styles: [``],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BsLinkButtonDemoComponent {}
