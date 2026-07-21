import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { DocPage } from '../../shared/doc-page.component';
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

const DELETE_CODE = `<!-- Directive (preferred) -->
<button ariaLabel="Delete item" (click)="onDelete()" deleteButton>Delete</button>

<!-- Component -->
<delete-button ariaLabel="Delete item" (click)="onDelete()"></delete-button>`;

const EXCEL_CODE = `<button excelExportButton (click)="exportExcel()">Export to Excel</button>`;
const PDF_CODE = `<button pdfExportButton (click)="exportPdf()">Export to PDF</button>`;

interface ButtonEntry {
	title: string;
	description: string;
	component: Type<unknown>;
	code?: string;
}

interface ButtonGroup {
	label: string;
	buttons: ButtonEntry[];
}

/**
 * Combined Buttons gallery page. Every button family is shown in a
 * category-grouped accordion — expand a panel to view the live demo (rendered
 * lazily) and, where relevant, its source — plus a shared base-button API
 * reference migrated from the docs.
 */
@Component({
	selector: 'ng-kit-buttons-page',
	imports: [DocPage, NgComponentOutlet, MatExpansionModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<doc-page title="Buttons">
			<p docLead>
				Custom button components built on top of Angular Material buttons. ng-kit adds ready-made button types — primary, success, edit,
				delete, export and more — each with additional styling, icons and loading state on top of the shared <code>BaseButtonDirective</code>.
			</p>

			<div docOverview>
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
			</div>

			<div docExamples>
				@for (group of groups; track group.label) {
					<h3 class="group-heading">{{ group.label }}</h3>
					<mat-accordion class="example-accordion" multi>
						@for (b of group.buttons; track b.title) {
							<mat-expansion-panel>
								<mat-expansion-panel-header>
									<mat-panel-title>{{ b.title }}</mat-panel-title>
									<mat-panel-description>{{ b.description }}</mat-panel-description>
								</mat-expansion-panel-header>
								<ng-template matExpansionPanelContent>
									<ng-container *ngComponentOutlet="b.component" />
									@if (b.code) {
										<details class="example-source">
											<summary>View source</summary>
											<pre class="example-code"><code>{{ b.code }}</code></pre>
										</details>
									}
								</ng-template>
							</mat-expansion-panel>
						}
					</mat-accordion>
				}
			</div>

			<div docApi>
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
				</tbody>
			</table>
			<p class="api-note">
				The base <em>directive</em> exposes <code>icon</code>, <code>label</code>, <code>loading</code> and
				<code>loadingLabel</code>. Component buttons additionally provide <code>style</code>, <code>classes</code> and
				<code>dataCy</code> inputs.
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
						<td><code>onFocus</code> / <code>onBlur</code></td>
						<td><code>FocusEvent</code></td>
						<td>Button gained / lost focus</td>
					</tr>
					<tr>
						<td><code>onKeyDown</code> / <code>onKeyUp</code></td>
						<td><code>KeyboardEvent</code></td>
						<td>Key pressed / released while focused</td>
					</tr>
				</tbody>
				</table>
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

		.examples-heading {
			margin-block: 2rem 0.5rem;
		}

		.group-heading {
			margin-block: 1.5rem 0.5rem;
			font-size: 0.8125rem;
			font-weight: 600;
			letter-spacing: 0.06em;
			text-transform: uppercase;
			color: rgba(0, 0, 0, 0.6);
		}

		.example-accordion {
			display: block;
			margin-block-end: 0.5rem;
		}

		.example-source {
			margin-top: 1rem;
		}

		.example-source summary {
			cursor: pointer;
			color: #3f51b5;
			font-size: 0.875rem;
		}

		.code-block,
		.example-code {
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
	protected readonly groups: ButtonGroup[] = [
		{
			label: 'Primary & action',
			buttons: [
				{ title: 'Primary button', description: 'The default call-to-action (primaryButton directive / <primary-button>).', component: PrimaryButtonDemoComponent, code: PRIMARY_CODE },
				{ title: 'Success button', description: 'A green, positive-affirmation button for confirming actions.', component: SuccessButtonDemoComponent },
				{ title: 'Save primary button', description: "A primary button with a save icon and 'Saving…' loading label.", component: SavePrimaryButtonDemoComponent },
				{ title: 'Search button', description: 'A button styled for search / filter triggers.', component: SearchButtonDemoComponent },
				{ title: 'Manage button', description: 'A button for management / settings entry points.', component: ManageButtonDemoComponent },
			],
		},
		{
			label: 'View',
			buttons: [
				{ title: 'View button', description: 'A subtle view / details button.', component: ViewButtonDemoComponent },
				{ title: 'View primary button', description: 'A view button with primary emphasis for the main row action.', component: ViewPrimaryButtonDemoComponent },
			],
		},
		{
			label: 'Edit',
			buttons: [
				{ title: 'Edit button', description: 'The default edit button (editButton directive / <edit-button>).', component: EditButtonDemoComponent, code: EDIT_CODE },
				{ title: 'Edit Bootstrap button', description: 'An edit button rendered with Bootstrap button styling.', component: EditBsButtonDemoComponent },
				{ title: 'Edit SVG icon button', description: 'An icon-only edit button rendering an inline SVG pencil.', component: EditSvgIconButtonDemoComponent },
			],
		},
		{
			label: 'Destructive & dismiss',
			buttons: [
				{ title: 'Delete button', description: 'A destructive delete button (deleteButton directive / <delete-button>).', component: DeleteButtonDemoComponent, code: DELETE_CODE },
				{ title: 'Close button', description: 'A dismiss button (closeButton directive) for dialogs, alerts and panels.', component: CloseButtonDemoComponent },
			],
		},
		{
			label: 'Export',
			buttons: [
				{ title: 'Excel export button', description: 'Exports tabular data to a spreadsheet.', component: ExcelExportButtonDemoComponent, code: EXCEL_CODE },
				{ title: 'PDF export button', description: 'Exports tabular data to a PDF document.', component: PdfExportButtonDemoComponent, code: PDF_CODE },
			],
		},
		{
			label: 'Link & base',
			buttons: [
				{ title: 'Bootstrap link button', description: 'An anchor styled as a Bootstrap button (bsLinkButton / <bs-link-button>).', component: BsLinkButtonDemoComponent },
				{ title: 'Base button', description: 'The shared base button supplying icon, label and loading behaviour to every ng-kit button.', component: BaseButtonDemoComponent },
			],
		},
		{
			label: 'Showcase',
			buttons: [{ title: 'All buttons', description: 'Every button family shown together for quick comparison.', component: ButtonsDemoComponent }],
		},
	];
}
