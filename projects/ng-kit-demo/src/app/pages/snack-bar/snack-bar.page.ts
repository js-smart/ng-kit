import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocPage } from '../../shared/doc-page.component';
import { DemoCard } from '../../shared/demo-card.component';
import { SnackBarDemoComponent } from '../../snack-bar-demo/snack-bar-demo.component';
import { getSnackBarDemoConfig } from '../../utils/demo-config-generator';

/** StackBlitz config for the Snack bar card — reuses the shared snack-bar-demo project. */
const snackBarConfig = getSnackBarDemoConfig();

/**
 * Snack Bar gallery page: overview, a live example reusing the shared
 * SnackBarDemoComponent, and an API reference for MatSnackBarService.
 */
@Component({
	selector: 'ng-kit-snack-bar-page',
	imports: [DocPage, DemoCard, SnackBarDemoComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<doc-page title="Snack Bar">
			<p docLead>
				A custom snack bar service built on top of Angular Material's snack bar component. Inject
				<code>MatSnackBarService</code> and call <code>success()</code> or <code>error()</code> to surface themed, dismissible
				notifications.
			</p>

			<div docOverview>
				<section class="page-section">
					<h2>Overview</h2>
					<p>
						Inject <code>MatSnackBarService</code> in your component, then call one of its methods to show a snack bar:
					</p>
					<ul>
						<li><code>success('YOUR MESSAGE')</code> — show a success (green) snack bar.</li>
						<li><code>error('YOUR MESSAGE')</code> — show an error (red) snack bar.</li>
						<li><code>open('YOUR MESSAGE')</code> — show a generic snack bar with a Close action.</li>
					</ul>
					<p>
						The service is <code>providedIn: 'root'</code>, so it is available everywhere without extra wiring. Each method
						accepts an optional options object to override the <code>duration</code>, <code>horizontalPosition</code>,
						<code>verticalPosition</code>, and <code>panelClass</code>. By default snack bars appear at the top-right and dismiss
						after 5 seconds.
					</p>
				</section>
			</div>

			<div docExamples>
				<demo-card
					title="Success &amp; error"
					anchorId="success-and-error"
					description="Trigger a themed success or error snack bar from a button click."
					[props]="['success()', 'error()']"
					[code]="snackBarConfig.componentTs"
					[stackblitz]="snackBarConfig">
					<ng-kit-snack-bar-demo />
				</demo-card>
			</div>

			<div docApi>
				<section class="page-section api">
					<h3>Service</h3>
					<p><code>MatSnackBarService</code> (<code>providedIn: 'root'</code>)</p>

					<h3>Methods</h3>
					<table class="api-table">
						<thead>
							<tr>
								<th>Name</th>
								<th>Signature</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><code>success</code></td>
								<td><code>(message: string, options?: MatSnackBarOptions) =&gt; void</code></td>
								<td>Opens a success snack bar (<code>success-snackbar</code> panel class)</td>
							</tr>
							<tr>
								<td><code>error</code></td>
								<td><code>(message: string, options?: MatSnackBarOptions) =&gt; void</code></td>
								<td>Opens an error snack bar (<code>error-snackbar</code> panel class)</td>
							</tr>
							<tr>
								<td><code>open</code></td>
								<td><code>(message: string) =&gt; void</code></td>
								<td>Opens a generic snack bar with a Close action</td>
							</tr>
						</tbody>
					</table>

					<h3>Configuration properties</h3>
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
								<td><code>duration</code></td>
								<td><code>number</code></td>
								<td><code>5000</code></td>
								<td>Time in milliseconds the snack bar stays open</td>
							</tr>
							<tr>
								<td><code>horizontalPosition</code></td>
								<td><code>MatSnackBarHorizontalPosition</code></td>
								<td><code>'right'</code></td>
								<td>Horizontal position of the snack bar</td>
							</tr>
							<tr>
								<td><code>verticalPosition</code></td>
								<td><code>MatSnackBarVerticalPosition</code></td>
								<td><code>'top'</code></td>
								<td>Vertical position of the snack bar</td>
							</tr>
						</tbody>
					</table>

					<h3>MatSnackBarOptions</h3>
					<table class="api-table">
						<thead>
							<tr>
								<th>Name</th>
								<th>Type</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><code>duration</code></td>
								<td><code>number</code></td>
								<td>Override the open duration for this call</td>
							</tr>
							<tr>
								<td><code>horizontalPosition</code></td>
								<td><code>MatSnackBarHorizontalPosition</code></td>
								<td>Override the horizontal position</td>
							</tr>
							<tr>
								<td><code>verticalPosition</code></td>
								<td><code>MatSnackBarVerticalPosition</code></td>
								<td>Override the vertical position</td>
							</tr>
							<tr>
								<td><code>panelClass</code></td>
								<td><code>string | string[]</code></td>
								<td>Custom panel class(es) for styling</td>
							</tr>
						</tbody>
					</table>
					<p class="api-note">
						Built-in panel classes include <code>success-snackbar</code>, <code>error-snackbar</code>,
						<code>light-success-snackbar</code>, <code>light-error-snackbar</code>, <code>primary-snackbar</code>,
						<code>info-snackbar</code>, and <code>warning-snackbar</code>.
					</p>
				</section>
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
export class SnackBarPage {
	protected readonly snackBarConfig = snackBarConfig;
}
