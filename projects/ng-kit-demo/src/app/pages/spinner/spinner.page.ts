import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SpinnerComponent } from '@js-smart/ng-kit';
import { DocPage } from '../../shared/doc-page.component';
import { DemoCard } from '../../shared/demo-card.component';
import { buildDemoConfig } from '../../shared/build-demo-config';

const MATERIAL_CODE = `import { Component } from '@angular/core';
import { SpinnerComponent } from '@js-smart/ng-kit';

@Component({
	selector: 'app-spinner-demo',
	imports: [SpinnerComponent],
	template: \`
		<spinner [diameter]="40" color="accent" [strokeWidth]="4" />
	\`,
})
export class SpinnerDemoComponent {}`;

const DEFAULT_CODE = `import { Component } from '@angular/core';
import { SpinnerComponent } from '@js-smart/ng-kit';

@Component({
	selector: 'app-spinner-default',
	imports: [SpinnerComponent],
	template: \`
		<spinner />
	\`,
})
export class SpinnerDefaultComponent {}`;

/** StackBlitz config for the Material spinner card — class name matches PascalCase(componentName). */
const defaultConfig = buildDemoConfig({
	title: 'Material spinner',
	componentName: 'spinner-default',
	code: DEFAULT_CODE,
	requiredImports: ['BrowserAnimationsModule'],
});

/** StackBlitz config for the custom size/color/stroke card — class name matches PascalCase(componentName). */
const materialConfig = buildDemoConfig({
	title: 'Custom size, color & stroke',
	componentName: 'spinner-demo',
	code: MATERIAL_CODE,
	requiredImports: ['BrowserAnimationsModule'],
});

/**
 * Gallery page for the Spinner component: a lead paragraph, an overview
 * section, live examples wrapped in <demo-card>, and an API reference.
 */
@Component({
	selector: 'ng-kit-spinner-page',
	imports: [DocPage, SpinnerComponent, DemoCard],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<doc-page title="Spinner">
			<p docLead>
				A thin wrapper around the Angular Material progress spinner. Provides a simple way to customize size, color, and stroke width
				without requiring Bootstrap.
			</p>

			<div docOverview>
				<section class="page-section">
					<h2>Overview</h2>
					<p>
						Import <code>SpinnerComponent</code> and drop the <code>&lt;spinner&gt;</code> element into any standalone component. It always
						renders an Angular Material <code>mat-progress-spinner</code>; tune it with <code>diameter</code>, <code>color</code>, and
						<code>strokeWidth</code>. The deprecated <code>bootstrapSpinner</code> input is retained as a no-op for compatibility.
					</p>
					<ul>
						<li>Tree-shakable: only the imported features are included in your bundle.</li>
						<li>Fully configurable for size, color, and stroke width.</li>
						<li>Follows Angular Material and WCAG accessibility best practices with semantic markup and ARIA attributes.</li>
					</ul>
				</section>
			</div>

			<div docExamples>
				<demo-card
					title="Material spinner"
					anchorId="material-spinner"
					description="The Angular Material spinner with default diameter, primary color, and default stroke width."
					[props]="[]"
					[code]="defaultCode"
					[stackblitz]="defaultConfig">
					<spinner />
				</demo-card>

				<demo-card
					title="Custom size, color &amp; stroke"
					anchorId="custom-size-color-stroke"
					description="Tune the Material spinner with a smaller diameter, an accent color, and a thinner stroke."
					[props]="['diameter', 'color', 'strokeWidth']"
					[code]="materialCode"
					[stackblitz]="materialConfig">
					<spinner [diameter]="40" color="accent" [strokeWidth]="4" />
				</demo-card>
			</div>

			<div docApi>
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
							<td>Deprecated compatibility input; has no effect. The component always renders the Angular Material spinner.</td>
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
					<code>&lt;spinner&gt;</code> renders <code>&lt;mat-progress-spinner&gt;</code>; no Bootstrap stylesheet is needed.
				</p>
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
			color: var(--gallery-text-muted);
			margin-block-end: 2rem;
		}

		.readout {
			margin-top: 12px;
			color: var(--gallery-text-muted);
			font-size: 14px;
		}
	`,
})
export class SpinnerPage {
	protected readonly materialCode = MATERIAL_CODE;
	protected readonly defaultCode = DEFAULT_CODE;
	protected readonly defaultConfig = defaultConfig;
	protected readonly materialConfig = materialConfig;
}
