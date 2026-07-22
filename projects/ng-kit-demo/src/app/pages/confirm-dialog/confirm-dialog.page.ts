import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DemoCard } from '../../shared/demo-card.component';
import { DocPage } from '../../shared/doc-page.component';
import { ConfirmDialogDemoComponent } from '../../confirm-dialog-demo/confirm-dialog-demo.component.html-demo.component';
import { getConfirmDialogDemoConfig } from '../../utils/demo-config-generator';

/** StackBlitz config for the Confirm Dialog card — reuses the shared confirm-dialog-demo project. */
const confirmDialogConfig = getConfirmDialogDemoConfig();

/**
 * Gallery page for the Confirm Dialog component. Mirrors the reference
 * autocomplete page: lead, overview, a live demo wrapped in <demo-card>,
 * and an API reference migrated from the docs markdown.
 */
@Component({
	selector: 'ng-kit-confirm-dialog-page',
	imports: [DocPage, DemoCard, ConfirmDialogDemoComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<doc-page title="Confirm Dialog">
			<p docLead>
				A reusable confirmation dialog built on top of Angular Material's dialog system. Let users confirm or cancel an action with a
				customizable title and message, and receive the result through the dialog's <code>afterClosed()</code> stream.
			</p>

			<div docOverview>
				<p>
					Open <code>ConfirmDialogComponent</code> with Angular Material's <code>MatDialog</code> service, passing a
					<code>title</code> and <code>message</code> through the <code>data</code> option. The dialog resolves to
					<code>true</code> when the user confirms and <code>false</code> when they cancel, so you can branch on the value emitted by
					<code>afterClosed()</code>.
				</p>
				<ul>
					<li>Uses Angular Material dialog for modal presentation.</li>
					<li>Tree-shakable: only imported features are included in your bundle.</li>
					<li>Customizable title and message via dialog data.</li>
					<li>Follows Angular Material and WCAG accessibility best practices, with semantic HTML and ARIA attributes.</li>
				</ul>
			</div>

			<div docApi>
				<h3>Inputs (via <code>MAT_DIALOG_DATA</code>)</h3>
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
							<td><code>title</code></td>
							<td><code>string</code></td>
							<td>Dialog title</td>
						</tr>
						<tr>
							<td><code>message</code></td>
							<td><code>string</code></td>
							<td>Dialog message</td>
						</tr>
					</tbody>
				</table>

				<h3>Outputs</h3>
				<p>
					Returns <code>true</code> if confirmed, <code>false</code> if cancelled, delivered through the dialog close result
					(<code>afterClosed()</code>).
				</p>

				<p class="api-note">
					If the dialog does not display, verify Angular Material styles are loaded and that the correct Angular version and peer
					dependencies are installed.
				</p>
			</div>

			<div docExamples>
				<demo-card
					title="Basic"
					anchorId="basic"
					description="Open a modal confirmation and react to the confirmed / cancelled result."
					language="html"
					[props]="['title', 'message']"
					[code]="confirmDialogConfig.componentHtml"
					[stackblitz]="confirmDialogConfig">
					<ng-kit-confirm-dialog-demo />
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
export class ConfirmDialogPage {
	protected readonly confirmDialogConfig = confirmDialogConfig;
}
