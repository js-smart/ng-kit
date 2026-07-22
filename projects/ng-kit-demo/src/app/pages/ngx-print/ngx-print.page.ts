import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocPage } from '../../shared/doc-page.component';
import { DemoCard } from '../../shared/demo-card.component';
import { NgxPrintDemoComponent } from '../../ngx-print-demo/ngx-print-demo';
import { buildDemoConfig } from '../../shared/build-demo-config';

const BASIC_CODE = `import { Component } from '@angular/core';
import { NgxPrintDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-basic-print',
	imports: [NgxPrintDirective],
	template: \`
		<div id="print-section">
			<h1>Document Title</h1>
			<p>Content to be printed...</p>
		</div>

		<button ngxPrint printSectionId="print-section" printTitle="My Document">Print</button>
	\`,
})
export class BasicPrintComponent {}`;

const MAT_TABLE_CODE = `import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgxPrintDirective } from '@js-smart/ng-kit';

interface User {
	name: string;
	email: string;
	phone: string;
	website: string;
}

const USERS: User[] = [
	{ name: 'Leanne Graham', email: 'leanne@example.com', phone: '1-770-736-8031', website: 'hildegard.org' },
	{ name: 'Ervin Howell', email: 'ervin@example.com', phone: '010-692-6593', website: 'anastasia.net' },
	{ name: 'Clementine Bauch', email: 'clementine@example.com', phone: '1-463-123-4447', website: 'ramiro.info' },
	{ name: 'Patricia Lebsack', email: 'patricia@example.com', phone: '493-170-9623', website: 'kale.biz' },
	{ name: 'Chelsey Dietrich', email: 'chelsey@example.com', phone: '254-954-1289', website: 'demarco.info' },
	{ name: 'Dennis Schulist', email: 'dennis@example.com', phone: '1-477-935-8478', website: 'ola.org' },
];

@Component({
	selector: 'app-table-print',
	imports: [MatTableModule, MatPaginatorModule, MatSortModule, NgxPrintDirective],
	template: \`
		<div class="text-center">
			<button
				ngxPrint
				printSectionId="print-section"
				[isMatTable]="true"
				[matTableDataSource]="dataSource"
				[paginator]="paginator"
				paginatorId="mat-paginator"
				[hideMatTablePaginator]="true"
				[useExistingCss]="true"
				type="button">
				Export to PDF
			</button>
		</div>

		<table mat-table id="print-section" [dataSource]="dataSource" matSort matSortActive="name" matSortDirection="asc">
			<ng-container matColumnDef="name">
				<mat-header-cell *matHeaderCellDef mat-sort-header>Name</mat-header-cell>
				<mat-cell *matCellDef="let element">{{ element.name }}</mat-cell>
			</ng-container>
			<ng-container matColumnDef="email">
				<mat-header-cell *matHeaderCellDef mat-sort-header>Email</mat-header-cell>
				<mat-cell *matCellDef="let element">{{ element.email }}</mat-cell>
			</ng-container>
			<ng-container matColumnDef="phone">
				<mat-header-cell *matHeaderCellDef mat-sort-header>Phone</mat-header-cell>
				<mat-cell *matCellDef="let element">{{ element.phone }}</mat-cell>
			</ng-container>
			<ng-container matColumnDef="website">
				<mat-header-cell *matHeaderCellDef mat-sort-header>Website</mat-header-cell>
				<mat-cell *matCellDef="let element">{{ element.website }}</mat-cell>
			</ng-container>
			<mat-header-row *matHeaderRowDef="displayedColumns" />
			<mat-row *matRowDef="let row; columns: displayedColumns" />
		</table>
		<mat-paginator id="mat-paginator" [pageSize]="5" [pageSizeOptions]="[5, 10, 20]" [length]="USERS.length" />
	\`,
})
export class TablePrintComponent implements AfterViewInit {
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

	protected readonly displayedColumns = ['name', 'email', 'phone', 'website'];
	protected readonly USERS = USERS;
	dataSource = new MatTableDataSource<User>(USERS);

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}
}`;

/** StackBlitz config for the Material table card — class name matches PascalCase(componentName). */
const tablePrintConfig = buildDemoConfig({
	title: 'Material table print',
	componentName: 'table-print',
	code: MAT_TABLE_CODE,
	requiredImports: ['BrowserAnimationsModule'],
});

/** StackBlitz config for the Basic usage card — class name matches PascalCase(componentName). */
const basicPrintConfig = buildDemoConfig({ title: 'Basic print', componentName: 'basic-print', code: BASIC_CODE });

/**
 * Documentation page for the ngxPrint directive: prints a chosen DOM section,
 * with first-class support for Angular Material tables and paginators.
 */
@Component({
	selector: 'ng-kit-ngx-print-page',
	imports: [DocPage, DemoCard, NgxPrintDemoComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<doc-page title="Ngx Print">
			<p docLead>
				<code>ngxPrint</code> is a reusable Angular directive that prints any specified section of your application. Apply it to a button, point
				it at an element by id, and it opens a print dialog or a live preview window that renders exactly the content you want.
			</p>

			<div docOverview>
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
			</div>

			<div docExamples>
				<demo-card
					title="Material table"
					anchorId="material-table"
					description="Print a paginated Material table: bind the data source and paginator, and optionally hide the paginator in the printout."
					[props]="['printSectionId', 'isMatTable', 'matTableDataSource', 'paginator', 'hideMatTablePaginator']"
					[code]="matTableCode"
					[stackblitz]="tablePrintConfig">
					<ngx-print-demo />
				</demo-card>

				<demo-card
					title="Basic usage"
					anchorId="basic-usage"
					description="Print a plain DOM section by its id."
					[props]="['printSectionId', 'printTitle']"
					[code]="basicCode"
					[stackblitz]="basicPrintConfig" />
			</div>

			<div docApi>
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
export class NgxPrintPage {
	protected readonly basicCode = BASIC_CODE;
	protected readonly matTableCode = MAT_TABLE_CODE;
	protected readonly tablePrintConfig = tablePrintConfig;
	protected readonly basicPrintConfig = basicPrintConfig;
}
