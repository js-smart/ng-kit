import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DemoCard } from '../../shared/demo-card.component';
import { NgxPrintDemoComponent } from '../../ngx-print-demo/ngx-print-demo';

const BASIC_CODE = `<div id="print-section">
	<h1>Document Title</h1>
	<p>Content to be printed...</p>
</div>

<button ngxPrint printSectionId="print-section">Print</button>`;

const MAT_TABLE_CODE = `import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgxPrintDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-table-print',
	imports: [MatTableModule, MatPaginatorModule, NgxPrintDirective],
	template: \`
		<div id="print-section">
			<mat-table [dataSource]="dataSource"><!-- columns --></mat-table>
			<mat-paginator #paginator [pageSizeOptions]="[5, 10, 20]" />
		</div>

		<button
			ngxPrint
			printSectionId="print-section"
			[isMatTable]="true"
			[matTableDataSource]="dataSource"
			[paginator]="paginator"
			paginatorId="paginator-id"
			[hideMatTablePaginator]="true">
			Print Table
		</button>
	\`,
})
export class TablePrintExample {
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	dataSource = new MatTableDataSource<User>();
}`;

/**
 * Documentation page for the ngxPrint directive: prints a chosen DOM section,
 * with first-class support for Angular Material tables and paginators.
 */
@Component({
	selector: 'ng-kit-ngx-print-page',
	imports: [DemoCard, NgxPrintDemoComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<h1 class="page-title">Ngx Print</h1>
		<p class="page-lead">
			<code>ngxPrint</code> is a reusable Angular directive that prints any specified section of your application. Apply it to a button, point
			it at an element by id, and it opens a print dialog or a live preview window that renders exactly the content you want.
		</p>

		<section class="page-section">
			<h2>Overview</h2>
			<p>
				Add the <code>ngxPrint</code> (or <code>print</code>) attribute to a <code>&lt;button&gt;</code> and set
				<code>printSectionId</code> to the id of the element whose contents should be printed. The directive provides rich printing
				capabilities including:
			</p>
			<ul>
				<li>Angular Material table support (with pagination)</li>
				<li>jQuery DataTable support</li>
			</ul>
			<p>
				With options for custom styling (<code>printStyle</code>), external stylesheets (<code>styleSheetFile</code>), paginated data
				tables, and a preview-only mode (<code>previewOnly</code>), it makes it easy to print or preview exactly what you need.
			</p>
		</section>

		<demo-card
			title="Material table"
			description="Print a paginated Material table: bind the data source and paginator, and optionally hide the paginator in the printout."
			[props]="['printSectionId', 'isMatTable', 'matTableDataSource', 'paginator', 'hideMatTablePaginator']"
			[code]="matTableCode">
			<ngx-print-demo />
		</demo-card>

		<demo-card
			title="Basic usage"
			description="Print a plain DOM section by its id."
			[props]="['printSectionId', 'printTitle']"
			[code]="basicCode" />

		<section class="page-section api">
			<h2>API reference</h2>
			<h3>Selectors</h3>
			<p><code>button[ngxPrint]</code>, <code>button[print]</code></p>
			<p class="api-note">The directive must be applied to a <code>&lt;button&gt;</code> element, and <code>printSectionId</code> is required.</p>

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
						<td><code>printSectionId</code></td>
						<td><code>string | undefined</code></td>
						<td><code>undefined</code></td>
						<td>ID of the HTML element whose contents need to be printed</td>
					</tr>
					<tr>
						<td><code>printTitle</code></td>
						<td><code>string | undefined</code></td>
						<td><code>undefined</code></td>
						<td>Title of the document to be printed (appears in print preview)</td>
					</tr>
					<tr>
						<td><code>useExistingCss</code></td>
						<td><code>boolean</code></td>
						<td><code>false</code></td>
						<td>If <code>true</code>, uses existing CSS from the HTML element, otherwise no CSS applied</td>
					</tr>
					<tr>
						<td><code>printDelay</code></td>
						<td><code>number</code></td>
						<td><code>0</code></td>
						<td>Delay in milliseconds before opening the print dialog</td>
					</tr>
					<tr>
						<td><code>matTableDataSource</code></td>
						<td><code>MatTableDataSource&lt;T&gt;</code></td>
						<td>—</td>
						<td>Instance of the Material Table Data Source (required for Material table support)</td>
					</tr>
					<tr>
						<td><code>paginator</code></td>
						<td><code>MatPaginator</code></td>
						<td>—</td>
						<td>Instance of the Material Paginator (required for Material table support)</td>
					</tr>
					<tr>
						<td><code>paginatorId</code></td>
						<td><code>string</code></td>
						<td><code>''</code></td>
						<td>HTML element ID of the Mat Paginator</td>
					</tr>
					<tr>
						<td><code>inputFilterId</code></td>
						<td><code>string</code></td>
						<td><code>''</code></td>
						<td>HTML element ID of the Mat-Table input filter</td>
					</tr>
					<tr>
						<td><code>isMatTable</code></td>
						<td><code>boolean</code></td>
						<td><code>false</code></td>
						<td>If <code>true</code>, indicates the referenced table is a Material Table</td>
					</tr>
					<tr>
						<td><code>hideMatTablePaginator</code></td>
						<td><code>boolean</code></td>
						<td><code>false</code></td>
						<td>If <code>true</code>, hides the Mat-Table paginator during printing</td>
					</tr>
					<tr>
						<td><code>previewOnly</code></td>
						<td><code>boolean</code></td>
						<td><code>false</code></td>
						<td>If <code>true</code>, prevents the print dialog from opening (preview only)</td>
					</tr>
					<tr>
						<td><code>printStyle</code></td>
						<td><code>PrintStyleParams</code></td>
						<td>—</td>
						<td>Object containing CSS properties to apply while printing</td>
					</tr>
					<tr>
						<td><code>styleSheetFile</code></td>
						<td><code>string</code></td>
						<td><code>''</code></td>
						<td>Comma-separated list of CSS file paths to include in the print document</td>
					</tr>
				</tbody>
			</table>

			<h3>PrintStyleParams</h3>
			<p>The <code>printStyle</code> input accepts an object whose <code>values</code> map CSS selectors to declaration blocks:</p>
			<table class="api-table">
				<thead>
					<tr>
						<th>Property</th>
						<th>Type</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><code>values</code></td>
						<td><code>Record&lt;string, Record&lt;string, string&gt;&gt;</code></td>
						<td>Nested map of at-rule / selector to CSS property declarations applied while printing</td>
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
export class NgxPrintPage {
	protected readonly basicCode = BASIC_CODE;
	protected readonly matTableCode = MAT_TABLE_CODE;
}
