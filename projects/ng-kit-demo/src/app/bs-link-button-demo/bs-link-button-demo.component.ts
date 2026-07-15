import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BsLinkButtonComponent, BsLinkButtonDirective } from '@js-smart/ng-kit';
import { StackBlitzService } from '@ng-kit-demo/services/stackblitz.service';
import { OpenInStackblitzButtonComponent } from '@ng-kit-demo/shared/open-in-stackblitz-button.component';
import { getBsLinkButtonDemoConfig } from '@ng-kit-demo/bs-link-button-demo/bs-link-button-demo.config';

@Component({
	selector: 'ng-kit-bs-link-button-demo',
	imports: [BsLinkButtonComponent, BsLinkButtonDirective, OpenInStackblitzButtonComponent],
	template: `
		<div style="margin-bottom: 20px;">
			<ng-kit-open-in-stackblitz-button (open)="openInStackBlitz()" />
		</div>

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
export class BsLinkButtonDemoComponent {
	private readonly stackBlitzService = inject(StackBlitzService);

	openInStackBlitz(): void {
		this.stackBlitzService.openDemo(getBsLinkButtonDemoConfig());
	}
}
