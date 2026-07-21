import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SpinnerComponent } from '@js-smart/ng-kit';
import { DemoCard } from '../../shared/demo-card.component';
import { DocPage } from '../../shared/doc-page.component';

const OVERLAY_CODE = `import { Component, signal } from '@angular/core';
import { SpinnerComponent } from '@js-smart/ng-kit';

@Component({
	selector: 'app-overlay',
	imports: [SpinnerComponent],
	template: \`
		<button type="button" (click)="run()">Load data</button>

		@if (loading()) {
			<div class="spinner-overlay" role="status" aria-live="polite">
				<spinner [bootstrapSpinner]="false" [diameter]="64" />
			</div>
		}
	\`,
})
export class OverlayExample {
	protected readonly loading = signal(false);

	protected run(): void {
		this.loading.set(true);
		setTimeout(() => this.loading.set(false), 2000);
	}
}`;

/**
 * Documents the overlay spinner. The docs describe an ngx-spinner based
 * overlay controlled by a service; in this build the library exports
 * SpinnerComponent (selector `spinner`, `lib-spinner`), which is used here
 * to render a full-page overlay driven by a signal.
 */
@Component({
	selector: 'ng-kit-ngx-spinner-page',
	imports: [SpinnerComponent, DemoCard, MatButtonModule, DocPage],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<doc-page title="Ngx Spinner">
			<p docLead>
				Full-page overlay spinner for Angular applications. Display a loading indicator during async operations with a customizable
				backdrop, size, color, and z-index, controlled programmatically for a smooth loading experience.
			</p>

			<div docOverview>
				<section class="page-section">
					<p>
						Import the spinner component into your standalone component and toggle it around async work. The overlay covers the
						viewport with a semi-transparent backdrop while the spinner animates in the center, then hides once the work resolves.
					</p>
					<ul>
						<li>Multiple spinner sizes and colors are supported.</li>
						<li>The backdrop color and <code>z-index</code> are configurable for layering over any UI.</li>
						<li>Tree-shakable: only the features you import are included in your bundle.</li>
						<li>Integrates with a spinner service for programmatic <code>show</code> / <code>hide</code> control.</li>
					</ul>
					<p class="api-note">
						This build exports <code>SpinnerComponent</code> (selectors <code>spinner</code>, <code>lib-spinner</code>). The example
						below renders it inside a full-page overlay driven by a signal; the API table documents the overlay inputs described in
						the docs.
					</p>
				</section>
			</div>

			<div docApi>
				<h3>Selector</h3>
				<p><code>ngx-spinner</code></p>

				<h3>Inputs</h3>
				<table class="api-table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>name</code></td>
							<td><code>string</code></td>
							<td><code>'primary-spinner'</code></td>
							<td>Spinner name (for service control)</td>
						</tr>
						<tr>
							<td><code>bdColor</code></td>
							<td><code>string</code></td>
							<td><code>'rgba(51,51,51,0.8)'</code></td>
							<td>Backdrop color (RGBA format)</td>
						</tr>
						<tr>
							<td><code>size</code></td>
							<td><code>string</code></td>
							<td><code>'large'</code></td>
							<td>Spinner size: <code>'small'</code>, <code>'medium'</code>, <code>'large'</code></td>
						</tr>
						<tr>
							<td><code>color</code></td>
							<td><code>string</code></td>
							<td><code>'#fff'</code></td>
							<td>Spinner color</td>
						</tr>
						<tr>
							<td><code>type</code></td>
							<td><code>string</code></td>
							<td><code>'ball-spin-clockwise'</code></td>
							<td>Spinner type (see enum for options)</td>
						</tr>
						<tr>
							<td><code>fullScreen</code></td>
							<td><code>boolean</code></td>
							<td><code>true</code></td>
							<td>Show spinner fullscreen</td>
						</tr>
						<tr>
							<td><code>zIndex</code></td>
							<td><code>number</code></td>
							<td><code>9999</code></td>
							<td>z-index value</td>
						</tr>
						<tr>
							<td><code>template</code></td>
							<td><code>string</code></td>
							<td><code>''</code></td>
							<td>Custom HTML template for spinner</td>
						</tr>
						<tr>
							<td><code>showSpinner</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Show / hide spinner</td>
						</tr>
						<tr>
							<td><code>disableAnimation</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Disable spinner animation</td>
						</tr>
					</tbody>
				</table>
				<p class="api-note">
					Integrates with a spinner service for programmatic control. See the exported <code>SpinnerComponent</code> for the inputs
					available in this build (<code>bootstrapSpinner</code>, <code>diameter</code>, <code>color</code>, <code>strokeWidth</code>).
				</p>
			</div>

			<div docExamples>
				<demo-card
					title="Overlay spinner"
					description="Toggle a full-page overlay spinner around a simulated async operation."
					[props]="['bootstrapSpinner', 'diameter', 'color']"
					[code]="overlayCode">
					<button mat-flat-button color="primary" type="button" (click)="run()" [disabled]="loading()">
						{{ loading() ? 'Loading…' : 'Load data' }}
					</button>
					<p class="readout">Status: {{ loading() ? 'busy' : 'idle' }}</p>

					@if (loading()) {
						<div class="spinner-overlay" role="status" aria-live="polite" aria-label="Loading">
							<spinner [bootstrapSpinner]="false" [diameter]="64" />
						</div>
					}
				</demo-card>
			</div>
		</doc-page>
	`,
	styles: `
		:host {
			display: block;
		}

		.page-title {
			margin-block-end: 0.5rem;
		}

		.page-lead {
			max-width: 70ch;
			color: rgba(0, 0, 0, 0.7);
			margin-block-end: 2rem;
		}

		.page-section {
			margin-block: 2rem;
			max-width: 70ch;
		}

		.readout {
			margin-top: 12px;
			color: rgba(0, 0, 0, 0.6);
			font-size: 14px;
		}

		.spinner-overlay {
			position: fixed;
			inset: 0;
			z-index: 9999;
			display: flex;
			align-items: center;
			justify-content: center;
			background: rgba(51, 51, 51, 0.8);
		}

		.api-table {
			width: 100%;
			border-collapse: collapse;
			font-size: 0.875rem;
		}

		.api-table th,
		.api-table td {
			text-align: left;
			padding: 0.5rem 0.75rem;
			border-block-end: 1px solid rgba(0, 0, 0, 0.12);
			vertical-align: top;
		}

		.api-note {
			margin-block-start: 0.75rem;
			color: rgba(0, 0, 0, 0.7);
		}

		code {
			font-family: 'Roboto Mono', ui-monospace, monospace;
			font-size: 0.85em;
		}
	`,
})
export class NgxSpinnerPage {
	protected readonly overlayCode = OVERLAY_CODE;
	protected readonly loading = signal(false);

	protected run(): void {
		this.loading.set(true);
		setTimeout(() => this.loading.set(false), 2000);
	}
}
