import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DemoCard } from '../../shared/demo-card.component';
import { ConfirmDialogDemoComponent } from '../../confirm-dialog-demo/confirm-dialog-demo.component.html-demo.component';

const BASIC_CODE = `import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@js-smart/ng-kit';

@Component({
	selector: 'app-delete',
	template: \`<button (click)="confirmDelete()">Delete</button>\`,
})
export class DeleteExample {
	private readonly dialog = inject(MatDialog);

	confirmDelete() {
		const ref = this.dialog.open(ConfirmDialogComponent, {
			data: {
				title: 'Delete Item',
				message: 'Are you sure you want to delete this item?',
			},
		});

		ref.afterClosed().subscribe((confirmed: boolean) => {
			if (confirmed) {
				// User confirmed
			} else {
				// User cancelled
			}
		});
	}
}`;

/**
 * Gallery page for the Confirm Dialog component. Mirrors the reference
 * autocomplete page: lead, overview, a live demo wrapped in <demo-card>,
 * and an API reference migrated from the docs markdown.
 */
@Component({
	selector: 'ng-kit-confirm-dialog-page',
	imports: [DemoCard, ConfirmDialogDemoComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<h1 class="page-title">Confirm Dialog</h1>
		<p class="page-lead">
			A reusable confirmation dialog built on top of Angular Material's dialog system. Let users confirm or cancel an action with a
			customizable title and message, and receive the result through the dialog's <code>afterClosed()</code> stream.
		</p>

		<section class="page-section">
			<h2>Overview</h2>
			<p>
				Open <code>ConfirmDialogComponent</code> with Angular Material's <code>MatDialog</code> service, passing a <code>title</code>
				and <code>message</code> through the <code>data</code> option. The dialog resolves to <code>true</code> when the user confirms
				and <code>false</code> when they cancel, so you can branch on the value emitted by <code>afterClosed()</code>.
			</p>
			<ul>
				<li>Uses Angular Material dialog for modal presentation.</li>
				<li>Tree-shakable: only imported features are included in your bundle.</li>
				<li>Customizable title and message via dialog data.</li>
				<li>Follows Angular Material and WCAG accessibility best practices, with semantic HTML and ARIA attributes.</li>
			</ul>
		</section>

		<demo-card
			title="Basic"
			description="Open a modal confirmation and react to the confirmed / cancelled result."
			[props]="['title', 'message']"
			[code]="basicCode">
			<ng-kit-confirm-dialog-demo />
		</demo-card>

		<section class="page-section api">
			<h2>API reference</h2>

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
export class ConfirmDialogPage {
	protected readonly basicCode = BASIC_CODE;
}
