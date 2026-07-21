import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DemoCard } from '../../shared/demo-card.component';
import { PrimaryButtonDemoComponent } from '../../primary-button-demo/primary-button-demo.component';
import { SuccessButtonDemoComponent } from '../../success-button-demo/success-button-demo.component';
import { SavePrimaryButtonDemoComponent } from '../../save-primary-button-demo/save-primary-button-demo.component';
import { SearchButtonDemoComponent } from '../../search-button-demo/search-button-demo.component';
import { ManageButtonDemoComponent } from '../../manage-button-demo/manage-button-demo.component';
import { ViewButtonDemoComponent } from '../../view-button-demo/view-button-demo.component';
import { ViewPrimaryButtonDemoComponent } from '../../view-primary-button-demo/view-primary-button-demo.component';
import { EditButtonDemoComponent } from '../../edit-button-demo/edit-button-demo.component';
import { EditBsButtonDemoComponent } from '../../edit-bs-button-demo/edit-bs-button-demo.component';
import { EditSvgIconButtonDemoComponent } from '../../edit-svg-icon-button-demo/edit-svg-icon-button-demo.component';
import { DeleteButtonDemoComponent } from '../../delete-button-demo/delete-button-demo.component';
import { CloseButtonDemoComponent } from '../../close-button-demo/close-button-demo.component';
import { ExcelExportButtonDemoComponent } from '../../excel-export-button-demo/excel-export-button-demo.component';
import { PdfExportButtonDemoComponent } from '../../pdf-export-button-demo/pdf-export-button-demo.component';
import { BsLinkButtonDemoComponent } from '../../bs-link-button-demo/bs-link-button-demo.component';
import { BaseButtonDemoComponent } from '../../base-button-demo/base-button-demo.component';
import { ButtonsDemoComponent } from '../../buttons-demo/buttons-demo.component';

const PRIMARY_CODE = `<!-- Directive (preferred) -->
<button ariaLabel="Submit" (click)="onSubmit()" primaryButton>Submit</button>

<!-- Component -->
<primary-button ariaLabel="Submit" (click)="onSubmit()">Submit</primary-button>`;

const EDIT_CODE = `<!-- Directive (preferred) -->
<button ariaLabel="Edit item" (click)="onEdit()" editButton>Edit</button>

<!-- Component -->
<edit-button ariaLabel="Edit item" (click)="onEdit()"></edit-button>`;

const EXPORT_CODE = `<!-- Excel export -->
<button excelExportButton (click)="exportExcel()">Export to Excel</button>

<!-- PDF export -->
<button pdfExportButton (click)="exportPdf()">Export to PDF</button>`;

const DELETE_CODE = `<!-- Directive (preferred) -->
<button ariaLabel="Delete item" (click)="onDelete()" deleteButton>Delete</button>

<!-- Component -->
<delete-button ariaLabel="Delete item" (click)="onDelete()"></delete-button>`;

/**
 * Combined Buttons gallery page: an overview migrated from the buttons intro
 * docs plus a live demo-card per button family, each reusing an existing demo
 * component, and a shared base-button API reference.
 */
@Component({
	selector: 'ng-kit-buttons-page',
	imports: [
		DemoCard,
		PrimaryButtonDemoComponent,
		SuccessButtonDemoComponent,
		SavePrimaryButtonDemoComponent,
		SearchButtonDemoComponent,
		ManageButtonDemoComponent,
		ViewButtonDemoComponent,
		ViewPrimaryButtonDemoComponent,
		EditButtonDemoComponent,
		EditBsButtonDemoComponent,
		EditSvgIconButtonDemoComponent,
		DeleteButtonDemoComponent,
		CloseButtonDemoComponent,
		ExcelExportButtonDemoComponent,
		PdfExportButtonDemoComponent,
		BsLinkButtonDemoComponent,
		BaseButtonDemoComponent,
		ButtonsDemoComponent,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<h1 class="page-title">Buttons</h1>
		<p class="page-lead">
			Custom button components built on top of Angular Material buttons. ng-kit adds ready-made button types — primary, success, edit,
			delete, export and more — each with additional styling, icons and loading state on top of the shared <code>BaseButtonDirective</code>.
		</p>

		<section class="page-section">
			<h2>Overview</h2>
			<p>
				A <code>BaseButtonDirective</code> provides common functionality and styling for all button types; every ng-kit button extends
				this base. Buttons can be consumed in two ways:
			</p>
			<ul>
				<li><strong>Directives (preferred)</strong> — apply button styling and behaviour to any existing HTML element for cleaner markup and more flexibility.</li>
				<li><strong>Components (legacy)</strong> — dedicated Angular components that wrap Angular Material buttons. Still supported, but the directive approach is preferred for new implementations.</li>
			</ul>
			<p>The two styles are interchangeable:</p>
			<pre class="code-block"><code>&lt;!-- Directive (preferred) --&gt;
&lt;button ariaLabel="Submit" (click)="onSubmit()" primaryButton&gt;Submit&lt;/button&gt;

&lt;!-- Component --&gt;
&lt;primary-button ariaLabel="Submit" (click)="onSubmit()"&gt;Submit&lt;/primary-button&gt;</code></pre>
		</section>

		<section class="page-section">
			<h2>Primary &amp; action buttons</h2>
			<p>Call-to-action buttons for the common save / submit / confirm flows.</p>
		</section>

		<demo-card
			title="Primary button"
			description="The default call-to-action. Available as the primaryButton directive and the <primary-button> component."
			[props]="['ariaLabel', 'disabled', 'loading']"
			[code]="primaryCode">
			<ng-kit-primary-button-demo />
		</demo-card>

		<demo-card
			title="Success button"
			description="A green, positive-affirmation button for confirming actions.">
			<ng-kit-success-button-demo />
		</demo-card>

		<demo-card
			title="Save primary button"
			description="A primary button pre-configured with a save icon and 'Saving…' loading label.">
			<ng-kit-save-primary-button-demo />
		</demo-card>

		<demo-card
			title="Search button"
			description="A button styled for search / filter triggers.">
			<ng-kit-search-button-demo />
		</demo-card>

		<demo-card
			title="Manage button"
			description="A button for management / settings entry points.">
			<ng-kit-manage-button-demo />
		</demo-card>

		<section class="page-section">
			<h2>View buttons</h2>
			<p>Read-only, non-destructive buttons for opening or previewing a record.</p>
		</section>

		<demo-card
			title="View button"
			description="A subtle view / details button.">
			<ng-kit-view-button-demo />
		</demo-card>

		<demo-card
			title="View primary button"
			description="A view button with primary emphasis for the main view action on a row.">
			<ng-kit-view-primary-button-demo />
		</demo-card>

		<section class="page-section">
			<h2>Edit buttons</h2>
			<p>Variants for triggering edit flows, including Bootstrap-styled and SVG-icon options.</p>
		</section>

		<demo-card
			title="Edit button"
			description="The default edit button. Available as the editButton directive and the <edit-button> component."
			[props]="['ariaLabel', 'disabled', 'loading']"
			[code]="editCode">
			<ng-kit-edit-button-demo />
		</demo-card>

		<demo-card
			title="Edit Bootstrap button"
			description="An edit button rendered with Bootstrap button styling.">
			<ng-kit-edit-bs-button-demo />
		</demo-card>

		<demo-card
			title="Edit SVG icon button"
			description="An icon-only edit button that renders an inline SVG pencil icon.">
			<ng-kit-edit-svg-icon-button-demo />
		</demo-card>

		<section class="page-section">
			<h2>Destructive &amp; dismiss buttons</h2>
			<p>Buttons for deleting records and closing dialogs or panels.</p>
		</section>

		<demo-card
			title="Delete button"
			description="A destructive delete button. Available as the deleteButton directive and the <delete-button> component."
			[props]="['ariaLabel', 'disabled', 'loading']"
			[code]="deleteCode">
			<ng-kit-delete-button-demo />
		</demo-card>

		<demo-card
			title="Close button"
			description="A dismiss button, applied via the closeButton directive, for dialogs, alerts and panels.">
			<ng-kit-close-button-demo />
		</demo-card>

		<section class="page-section">
			<h2>Export buttons</h2>
			<p>Purpose-built buttons for exporting tabular data to spreadsheet and document formats.</p>
		</section>

		<demo-card
			title="Excel &amp; PDF export"
			description="Excel and PDF export buttons, each available as a directive and a component."
			[props]="['ariaLabel', 'disabled', 'loading']"
			[code]="exportCode">
			<ng-kit-excel-export-button-demo />
			<ng-kit-pdf-export-button-demo />
		</demo-card>

		<section class="page-section">
			<h2>Link &amp; base buttons</h2>
			<p>A Bootstrap-styled link button and the shared base button that every other button extends.</p>
		</section>

		<demo-card
			title="Bootstrap link button"
			description="An anchor styled as a Bootstrap button via the bsLinkButton directive or the <bs-link-button> component.">
			<ng-kit-bs-link-button-demo />
		</demo-card>

		<demo-card
			title="Base button"
			description="The shared base button that supplies icon, label and loading behaviour to every ng-kit button.">
			<ng-kit-base-button-demo />
		</demo-card>

		<section class="page-section">
			<h2>All buttons</h2>
			<p>Every button family shown together for quick visual comparison.</p>
		</section>

		<demo-card
			title="Button showcase"
			description="A combined gallery of all ng-kit button types.">
			<ng-kit-buttons-demo />
		</demo-card>

		<section class="page-section api">
			<h2>API reference</h2>
			<p>
				All buttons share the inputs and outputs of the base button. Directive selectors are attribute-based
				(e.g. <code>primaryButton</code>); component selectors are elements (e.g. <code>&lt;primary-button&gt;</code>).
			</p>

			<h3>Common inputs</h3>
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
						<td><code>label</code></td>
						<td><code>string</code></td>
						<td><code>'Save'</code></td>
						<td>Text shown on the button (per-button defaults vary)</td>
					</tr>
					<tr>
						<td><code>icon</code></td>
						<td><code>string</code></td>
						<td>per button</td>
						<td>Material icon name rendered before the label</td>
					</tr>
					<tr>
						<td><code>showIcon</code></td>
						<td><code>boolean</code></td>
						<td><code>true</code></td>
						<td>Whether the leading icon is rendered</td>
					</tr>
					<tr>
						<td><code>disabled</code></td>
						<td><code>boolean</code></td>
						<td><code>false</code></td>
						<td>Disables the button</td>
					</tr>
					<tr>
						<td><code>loading</code></td>
						<td><code>boolean</code></td>
						<td><code>false</code></td>
						<td>Shows a spinner and the loading label; disables the button</td>
					</tr>
					<tr>
						<td><code>loadingLabel</code></td>
						<td><code>string</code></td>
						<td><code>'Saving...'</code></td>
						<td>Text shown while <code>loading</code> is true</td>
					</tr>
					<tr>
						<td><code>type</code></td>
						<td><code>'button' | 'submit'</code></td>
						<td><code>'button'</code></td>
						<td>Native button type</td>
					</tr>
					<tr>
						<td><code>classes</code></td>
						<td><code>string</code></td>
						<td>per button</td>
						<td>Extra CSS classes applied to the rendered button</td>
					</tr>
					<tr>
						<td><code>style</code></td>
						<td><code>string | object | null</code></td>
						<td>—</td>
						<td>Inline styles applied to the button</td>
					</tr>
					<tr>
						<td><code>dataCy</code></td>
						<td><code>string</code></td>
						<td>per button</td>
						<td>Value for the <code>data-cy</code> test attribute</td>
					</tr>
				</tbody>
			</table>
			<p class="api-note">
				The base <em>directive</em> exposes <code>icon</code>, <code>label</code>, <code>loading</code> and
				<code>loadingLabel</code>. Component buttons additionally provide the <code>style</code>, <code>classes</code> and
				<code>dataCy</code> inputs listed above.
			</p>

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
						<td><code>onClick</code></td>
						<td><code>MouseEvent</code></td>
						<td>Button was clicked</td>
					</tr>
					<tr>
						<td><code>onFocus</code></td>
						<td><code>FocusEvent</code></td>
						<td>Button gained focus</td>
					</tr>
					<tr>
						<td><code>onBlur</code></td>
						<td><code>FocusEvent</code></td>
						<td>Button lost focus</td>
					</tr>
					<tr>
						<td><code>onKeyDown</code> / <code>onKeyUp</code></td>
						<td><code>KeyboardEvent</code></td>
						<td>Key pressed / released while focused</td>
					</tr>
				</tbody>
			</table>

			<h3>Selectors</h3>
			<table class="api-table">
				<thead>
					<tr>
						<th>Family</th>
						<th>Directive</th>
						<th>Component</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Primary</td>
						<td><code>primaryButton</code></td>
						<td><code>&lt;primary-button&gt;</code></td>
					</tr>
					<tr>
						<td>Success</td>
						<td><code>successButton</code></td>
						<td><code>&lt;success-button&gt;</code></td>
					</tr>
					<tr>
						<td>Save primary</td>
						<td><code>savePrimaryButton</code></td>
						<td><code>&lt;save-primary-button&gt;</code></td>
					</tr>
					<tr>
						<td>Search</td>
						<td>—</td>
						<td><code>&lt;search-button&gt;</code></td>
					</tr>
					<tr>
						<td>Manage</td>
						<td><code>manageButton</code></td>
						<td><code>&lt;manage-button&gt;</code></td>
					</tr>
					<tr>
						<td>View</td>
						<td><code>viewButton</code></td>
						<td><code>&lt;view-button&gt;</code></td>
					</tr>
					<tr>
						<td>View primary</td>
						<td><code>viewPrimaryButton</code></td>
						<td><code>&lt;view-primary-button&gt;</code></td>
					</tr>
					<tr>
						<td>Edit</td>
						<td><code>editButton</code></td>
						<td><code>&lt;edit-button&gt;</code></td>
					</tr>
					<tr>
						<td>Edit Bootstrap</td>
						<td><code>editBsButton</code></td>
						<td><code>&lt;edit-bs-button&gt;</code></td>
					</tr>
					<tr>
						<td>Edit SVG icon</td>
						<td><code>editSvgIconButton</code></td>
						<td><code>&lt;edit-svg-icon-button&gt;</code></td>
					</tr>
					<tr>
						<td>Delete</td>
						<td><code>deleteButton</code></td>
						<td><code>&lt;delete-button&gt;</code></td>
					</tr>
					<tr>
						<td>Close</td>
						<td><code>closeButton</code></td>
						<td>—</td>
					</tr>
					<tr>
						<td>Excel export</td>
						<td><code>excelExportButton</code></td>
						<td><code>&lt;excel-export-button&gt;</code></td>
					</tr>
					<tr>
						<td>PDF export</td>
						<td><code>pdfExportButton</code></td>
						<td><code>&lt;pdf-export-button&gt;</code></td>
					</tr>
					<tr>
						<td>Bootstrap link</td>
						<td><code>bsLinkButton</code></td>
						<td><code>&lt;bs-link-button&gt;</code></td>
					</tr>
				</tbody>
			</table>
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

		.code-block {
			margin: 0.5rem 0 0;
			padding: 1rem;
			overflow-x: auto;
			border-radius: 8px;
			background: rgba(0, 0, 0, 0.04);
			font-family: 'Roboto Mono', ui-monospace, monospace;
			font-size: 0.8125rem;
			line-height: 1.5;
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
export class ButtonsPage {
	protected readonly primaryCode = PRIMARY_CODE;
	protected readonly editCode = EDIT_CODE;
	protected readonly exportCode = EXPORT_CODE;
	protected readonly deleteCode = DELETE_CODE;
}
