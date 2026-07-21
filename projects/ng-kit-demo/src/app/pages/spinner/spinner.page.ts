import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SpinnerComponent } from '@js-smart/ng-kit';
import { DemoCard } from '../../shared/demo-card.component';

const MATERIAL_CODE = `import { Component } from '@angular/core';
import { SpinnerComponent } from '@js-smart/ng-kit';

@Component({
	selector: 'app-spinner-demo',
	imports: [SpinnerComponent],
	template: \`
		<spinner [bootstrapSpinner]="false" [diameter]="40" color="accent" [strokeWidth]="4" />
	\`,
})
export class SpinnerDemoComponent {}`;

const DEFAULT_CODE = `import { Component } from '@angular/core';
import { SpinnerComponent } from '@js-smart/ng-kit';

@Component({
	selector: 'app-spinner-default',
	imports: [SpinnerComponent],
	template: \`
		<spinner [bootstrapSpinner]="false" />
	\`,
})
export class SpinnerDefaultComponent {}`;

/**
 * Gallery page for the Spinner component: a lead paragraph, an overview
 * section, live examples wrapped in <demo-card>, and an API reference.
 */
@Component({
	selector: 'ng-kit-spinner-page',
	imports: [SpinnerComponent, DemoCard],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<h1 class="page-title">Spinner</h1>
		<p class="page-lead">
			A thin wrapper around the Angular Material progress spinner. Provides a simple way to customize size, color, and stroke width, with
			an optional Bootstrap spinner fallback.
		</p>

		<section class="page-section">
			<h2>Overview</h2>
			<p>
				Import <code>SpinnerComponent</code> and drop the <code>&lt;spinner&gt;</code> element into any standalone component. By default
				<code>bootstrapSpinner</code> is <code>true</code>, which renders a Bootstrap spinner (requires Bootstrap CSS). Set
				<code>bootstrapSpinner</code> to <code>false</code> to render the Angular Material <code>mat-spinner</code> instead, then tune it
				with <code>diameter</code>, <code>color</code>, and <code>strokeWidth</code>.
			</p>
			<ul>
				<li>Tree-shakable: only the imported features are included in your bundle.</li>
				<li>Fully configurable for size, color, and stroke width.</li>
				<li>Follows Angular Material and WCAG accessibility best practices with semantic markup and ARIA attributes.</li>
			</ul>
		</section>

		<demo-card
			title="Material spinner"
			description="The Angular Material spinner with default diameter, primary color, and default stroke width."
			[props]="['bootstrapSpinner']"
			[code]="defaultCode">
			<spinner [bootstrapSpinner]="false" />
		</demo-card>

		<demo-card
			title="Custom size, color &amp; stroke"
			description="Tune the Material spinner with a smaller diameter, an accent color, and a thinner stroke."
			[props]="['bootstrapSpinner', 'diameter', 'color', 'strokeWidth']"
			[code]="materialCode">
			<spinner [bootstrapSpinner]="false" [diameter]="40" color="accent" [strokeWidth]="4" />
		</demo-card>

		<section class="page-section api">
			<h2>API reference</h2>
			<h3>Selectors</h3>
			<p><code>spinner</code>, <code>lib-spinner</code></p>

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
						<td><code>bootstrapSpinner</code></td>
						<td><code>boolean</code></td>
						<td><code>true</code></td>
						<td>Use the Bootstrap spinner when <code>true</code>, otherwise the Angular Material spinner</td>
					</tr>
					<tr>
						<td><code>diameter</code></td>
						<td><code>number</code></td>
						<td><code>50</code></td>
						<td>Diameter of the Material spinner (px)</td>
					</tr>
					<tr>
						<td><code>color</code></td>
						<td><code>ThemePalette</code></td>
						<td><code>'primary'</code></td>
						<td>Color of the Material spinner (<code>'primary'</code>, <code>'accent'</code>, <code>'warn'</code>)</td>
					</tr>
					<tr>
						<td><code>strokeWidth</code></td>
						<td><code>number</code></td>
						<td><code>5</code></td>
						<td>Stroke width of the Material spinner</td>
					</tr>
				</tbody>
			</table>
			<p class="api-note">
				Set <code>bootstrapSpinner</code> to <code>false</code> to use the Angular Material spinner. The Bootstrap variant requires
				Bootstrap CSS to be present in your application.
			</p>
		</section>
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
export class SpinnerPage {
	protected readonly materialCode = MATERIAL_CODE;
	protected readonly defaultCode = DEFAULT_CODE;
}
