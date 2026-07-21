import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AlertComponent } from '@js-smart/ng-kit';
import { DocPage } from '../../shared/doc-page.component';
import { DemoCard } from '../../shared/demo-card.component';
import { AlertDemoComponent } from '../../alert-demo/alert-demo.component';

const BASIC_CODE = `import { Component } from '@angular/core';
import { AlertComponent } from '@js-smart/ng-kit';

@Component({
	selector: 'app-basic',
	imports: [AlertComponent],
	template: \`
		<alert
			type="success"
			[isOpen]="true"
			[dismissible]="true"
			[dismissOnTimeout]="false"
			(closed)="onClosed()">
			This is a success alert—check it out!
		</alert>
	\`,
})
export class BasicExample {
	onClosed() {
		// Handle alert closed event
	}
}`;

/**
 * Gallery page for the Alert component: a lead paragraph, an overview
 * section, live examples wrapped in <demo-card>, and an API reference.
 */
@Component({
	selector: 'ng-kit-alert-page',
	imports: [AlertComponent, DocPage, DemoCard, AlertDemoComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<doc-page title="Alert">
			<p docLead>
				Fully customizable, reusable alert component styled with Bootstrap CSS. Designed for standalone usage, tree-shakable imports, and
				reactive state via Angular signals. Configure the alert type, visibility, dismiss behavior, and custom classes.
			</p>

			<div docOverview>
				<section class="page-section">
					<h2>Overview</h2>
					<p>
						Import <code>AlertComponent</code> and drop an <code>&lt;alert&gt;</code> element into your template with the message projected as
						content. Set <code>type</code> to choose the contextual style, toggle visibility with <code>isOpen</code>, and control dismissal with
						<code>dismissible</code>, <code>dismissOnTimeout</code>, and <code>dismissTimeout</code>. Listen to <code>closed</code> to react when
						the alert is dismissed.
					</p>
					<ul>
						<li>The alert is tree-shakable: only imported features are included in your bundle.</li>
						<li>All inputs are reactive and support Angular signals.</li>
						<li>For more customization, use the <code>class</code> input to add custom styles.</li>
					</ul>
				</section>
			</div>

			<div docExamples>
				<demo-card
					title="Basic"
					description="A dismissible success alert that stays open until closed."
					[props]="['type', 'isOpen', 'dismissible', 'dismissOnTimeout', 'closed']"
					[code]="basicCode">
					<alert type="success" [isOpen]="true" [dismissible]="true" [dismissOnTimeout]="false">
						This is a success alert—check it out!
					</alert>
				</demo-card>

				<demo-card
					title="Alert types"
					description="Success and error alerts with an Open in StackBlitz launcher.">
					<ng-kit-alert-demo />
				</demo-card>
			</div>

			<div docApi>
				<h3>Selectors</h3>
				<p><code>alert</code>, <code>lib-alert</code></p>

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
							<td><code>type</code></td>
							<td><code>AlertType</code></td>
							<td><code>'info'</code></td>
							<td>
								Alert style: <code>'info'</code>, <code>'primary'</code>, <code>'secondary'</code>, <code>'success'</code>,
								<code>'warning'</code>, <code>'danger'</code>, <code>'dark'</code>, <code>'light'</code>
							</td>
						</tr>
						<tr>
							<td><code>isOpen</code></td>
							<td><code>boolean</code></td>
							<td><code>true</code></td>
							<td>Is the alert visible</td>
						</tr>
						<tr>
							<td><code>dismissible</code></td>
							<td><code>boolean</code></td>
							<td><code>true</code></td>
							<td>Show an inline "Close" button</td>
						</tr>
						<tr>
							<td><code>dismissOnTimeout</code></td>
							<td><code>boolean</code></td>
							<td><code>true</code></td>
							<td>Dismiss the alert after the timeout</td>
						</tr>
						<tr>
							<td><code>dismissTimeout</code></td>
							<td><code>number</code></td>
							<td><code>5000</code></td>
							<td>Timeout in ms before auto-dismiss</td>
						</tr>
						<tr>
							<td><code>class</code></td>
							<td><code>string</code></td>
							<td><code>''</code></td>
							<td>Additional CSS classes</td>
						</tr>
					</tbody>
				</table>

				<h3>Outputs</h3>
				<table class="api-table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Payload</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>closed</code></td>
							<td><code>void</code></td>
							<td>Emits when the alert is closed</td>
						</tr>
					</tbody>
				</table>
				<p class="api-note">Requires Bootstrap styles to be loaded for the alert to render correctly.</p>
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
export class AlertPage {
	protected readonly basicCode = BASIC_CODE;
}
