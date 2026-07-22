import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PreventMultipleClicksDirective } from '@js-smart/ng-kit';
import { DocPage } from '../../shared/doc-page.component';
import { DemoCard } from '../../shared/demo-card.component';
import { DirectivesDemoComponent } from '../../directives-demo/directives-demo.component';
import { buildDemoConfig } from '../../shared/build-demo-config';

const BASIC_CODE = `import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PreventMultipleClicksDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-basic-prevent-clicks',
	imports: [MatButtonModule, PreventMultipleClicksDirective],
	template: \`
		<button mat-raised-button preventMultipleClicks [throttleTime]="2000" (throttleClick)="onClick()">
			Submit
		</button>
		<p>Processed clicks: {{ count() }}</p>
	\`,
})
export class BasicPreventClicksComponent {
	protected readonly count = signal(0);

	protected onClick(): void {
		this.count.update((n) => n + 1);
	}
}`;

const VIEW_BUTTON_CODE = `import { Component } from '@angular/core';
import { PreventMultipleClicksDirective, ViewButtonComponent } from '@js-smart/ng-kit';

@Component({
	selector: 'app-throttle-view-button',
	imports: [ViewButtonComponent, PreventMultipleClicksDirective],
	template: \`
		<view-button label="Throttle Button" preventMultipleClicks (throttleClick)="click()" />
	\`,
})
export class ThrottleViewButtonComponent {
	click(): void {
		console.log('Clicked');
	}
}`;

/** StackBlitz config for the Basic card — class name matches PascalCase(componentName). */
const basicConfig = buildDemoConfig({ title: 'Basic', componentName: 'basic-prevent-clicks', code: BASIC_CODE });

/** StackBlitz config for the button-component card — class name matches PascalCase(componentName). */
const viewButtonConfig = buildDemoConfig({ title: 'With a button component', componentName: 'throttle-view-button', code: VIEW_BUTTON_CODE });

/**
 * Gallery page for the preventMultipleClicks directive: an overview, a live
 * counter example wrapped in <demo-card>, the existing directives demo reused
 * verbatim, and the migrated API reference.
 */
@Component({
	selector: 'ng-kit-prevent-multiple-clicks-page',
	imports: [DocPage, MatButtonModule, PreventMultipleClicksDirective, DemoCard, DirectivesDemoComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<doc-page title="Prevent Multiple Clicks">
			<p docLead>
				<code>preventMultipleClicks</code> is an Angular directive that debounces rapid repeated clicks on any interactive element. It uses
				RxJS throttling so only one click is processed within a configurable time window &mdash; ideal for guarding form submissions, API
				calls, and navigation against duplicate actions.
			</p>

			<div docOverview>
				<p>
					Apply the <code>preventMultipleClicks</code> attribute to any clickable element, then listen to the
					<code>throttleClick</code> output instead of the native <code>click</code> event. The directive intercepts the click, calls
					<code>preventDefault()</code> and <code>stopPropagation()</code>, buffers the event through an RxJS
					<code>Subject</code>, and re-emits it only once per throttle period.
				</p>
				<p>Common use cases include:</p>
				<ul>
					<li><strong>Form submissions</strong> &mdash; preventing duplicate submissions.</li>
					<li><strong>API calls</strong> &mdash; avoiding multiple simultaneous requests.</li>
					<li><strong>Navigation</strong> &mdash; preventing multiple navigation triggers.</li>
					<li><strong>Button actions</strong> &mdash; ensuring actions run once per time period.</li>
				</ul>
				<p>
					The default throttle window is <code>2000</code>ms. Override it with <code>[throttleTime]</code>. The directive works with any
					element (buttons, links, custom button components) and cleans up its subscription on destroy.
				</p>
			</div>

			<div docApi>
				<h3>Selector</h3>
				<p><code>[preventMultipleClicks]</code></p>

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
							<td><code>throttleTime</code></td>
							<td><code>number</code></td>
							<td><code>2000</code></td>
							<td>Time in milliseconds to throttle clicks. Only one click is processed within this period.</td>
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
							<td><code>throttleClick</code></td>
							<td><code>Event</code></td>
							<td>Emits the original click event after the throttle period expires, once per period.</td>
						</tr>
					</tbody>
				</table>
				<p class="api-note">
					The emitted <code>throttleClick</code> event carries the original DOM event, so all event properties remain accessible. Works
					with template-driven and reactive forms and is compatible with Angular Material and custom button components.
				</p>
			</div>

			<div docExamples>
				<demo-card
					title="Basic"
					anchorId="basic"
					description="Throttled button with a 2 second window. Click rapidly — only the first click within each window is processed."
					[props]="['preventMultipleClicks', 'throttleTime', 'throttleClick']"
					[code]="basicCode"
					[stackblitz]="basicConfig">
					<button mat-raised-button preventMultipleClicks [throttleTime]="2000" (throttleClick)="onProcessedClick()">Submit</button>
					<p class="readout">Processed clicks: {{ processedCount() }}</p>
				</demo-card>

				<demo-card
					title="With a button component"
					anchorId="with-a-button-component"
					description="The directive applied to the library's view-button. Open the console to see the throttled output fire."
					[props]="['preventMultipleClicks', 'throttleClick']"
					[code]="viewButtonCode"
					[stackblitz]="viewButtonConfig">
					<ng-kit-directives-demo />
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
			color: rgba(0, 0, 0, 0.7);
			margin-block-end: 2rem;
		}

		.page-section {
			margin-block: 2rem;
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
export class PreventMultipleClicksPage {
	protected readonly basicCode = BASIC_CODE;
	protected readonly viewButtonCode = VIEW_BUTTON_CODE;
	protected readonly basicConfig = basicConfig;
	protected readonly viewButtonConfig = viewButtonConfig;
	protected readonly processedCount = signal(0);

	protected onProcessedClick(): void {
		this.processedCount.update((n) => n + 1);
	}
}
