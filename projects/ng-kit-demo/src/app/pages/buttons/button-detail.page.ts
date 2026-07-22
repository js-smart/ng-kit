import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Type, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CodeBlock } from '../../shared/code-block.component';
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

interface ButtonDetail {
	readonly title: string;
	readonly description: string;
	readonly component: Type<unknown>;
	readonly code?: string;
}

/**
 * Every button family, keyed by its route slug (the segment after `buttons/`).
 * The generic {@link ButtonDetailPage} looks the current page up here, so adding
 * a button is a matter of registering it in the gallery registry and here.
 */
const BUTTON_DETAILS: Record<string, ButtonDetail> = {
	'base-button': {
		title: 'Base Button',
		description: 'The shared base button supplying icon, label and loading behaviour to every ng-kit button.',
		component: BaseButtonDemoComponent,
		code: `<!-- The base supplies icon / label / loading to every button. Shown here
     via <primary-button>, which extends BaseButtonDirective. -->
<primary-button [loading]="loading()" [showIcon]="true" icon="save" label="Save"></primary-button>
<button ariaLabel="Submit" [loading]="loading()" primaryButton>Submit</button>`,
	},
	'bootstrap-link-button': {
		title: 'Bootstrap Link Button',
		description: 'An anchor styled as a Bootstrap button (bsLinkButton / <bs-link-button>).',
		component: BsLinkButtonDemoComponent,
		code: `<a bsLinkButton href="/docs">Docs</a>

<bs-link-button href="/docs">Docs</bs-link-button>`,
	},
	'close-button': {
		title: 'Close Button',
		description: 'A dismiss button (closeButton directive) for dialogs, alerts and panels.',
		component: CloseButtonDemoComponent,
		code: `<button ariaLabel="Close" (click)="onClose()" closeButton></button>`,
	},
	'delete-button': {
		title: 'Delete Button',
		description: 'A destructive delete button (deleteButton directive / <delete-button>).',
		component: DeleteButtonDemoComponent,
		code: `<!-- Directive (preferred) -->
<button ariaLabel="Delete item" (click)="onDelete()" deleteButton>Delete</button>

<!-- Component -->
<delete-button ariaLabel="Delete item" (click)="onDelete()"></delete-button>`,
	},
	'edit-bootstrap-button': {
		title: 'Edit Bootstrap Button',
		description: 'An edit button rendered with Bootstrap button styling.',
		component: EditBsButtonDemoComponent,
		code: `<button editBsButton (click)="onEdit()">Edit</button>`,
	},
	'edit-button': {
		title: 'Edit Button',
		description: 'The default edit button (editButton directive / <edit-button>).',
		component: EditButtonDemoComponent,
		code: `<!-- Directive (preferred) -->
<button ariaLabel="Edit item" (click)="onEdit()" editButton>Edit</button>

<!-- Component -->
<edit-button ariaLabel="Edit item" (click)="onEdit()"></edit-button>`,
	},
	'edit-svg-icon-button': {
		title: 'Edit SVG Icon Button',
		description: 'An icon-only edit button rendering an inline SVG pencil.',
		component: EditSvgIconButtonDemoComponent,
		code: `<button editSvgIconButton ariaLabel="Edit" (click)="onEdit()"></button>`,
	},
	'excel-export-button': {
		title: 'Excel Export Button',
		description: 'Exports tabular data to a spreadsheet.',
		component: ExcelExportButtonDemoComponent,
		code: `<button excelExportButton (click)="exportExcel()">Export to Excel</button>`,
	},
	'manage-button': {
		title: 'Manage Button',
		description: 'A button for management / settings entry points.',
		component: ManageButtonDemoComponent,
		code: `<button manageButton (click)="onManage()">Manage</button>`,
	},
	'pdf-export-button': {
		title: 'PDF Export Button',
		description: 'Exports tabular data to a PDF document.',
		component: PdfExportButtonDemoComponent,
		code: `<button pdfExportButton (click)="exportPdf()">Export to PDF</button>`,
	},
	'primary-button': {
		title: 'Primary Button',
		description: 'The default call-to-action (primaryButton directive / <primary-button>).',
		component: PrimaryButtonDemoComponent,
		code: `<!-- Directive (preferred) -->
<button ariaLabel="Submit" (click)="onSubmit()" primaryButton>Submit</button>

<!-- Component -->
<primary-button ariaLabel="Submit" (click)="onSubmit()">Submit</primary-button>`,
	},
	'save-primary-button': {
		title: 'Save Primary Button',
		description: "A primary button with a save icon and 'Saving…' loading label.",
		component: SavePrimaryButtonDemoComponent,
		code: `<button savePrimaryButton [loading]="saving()" (click)="onSave()">Save</button>`,
	},
	'success-button': {
		title: 'Success Button',
		description: 'A green, positive-affirmation button for confirming actions.',
		component: SuccessButtonDemoComponent,
		code: `<button successButton (click)="onConfirm()">Confirm</button>`,
	},
	'search-button': {
		title: 'Search Button',
		description: 'A button styled for search / filter triggers.',
		component: SearchButtonDemoComponent,
		code: `<search-button ariaLabel="Search" (click)="onSearch()"></search-button>`,
	},
	'view-button': {
		title: 'View Button',
		description: 'A subtle view / details button.',
		component: ViewButtonDemoComponent,
		code: `<button viewButton (click)="onView()">View</button>`,
	},
	'view-primary-button': {
		title: 'View Primary Button',
		description: 'A view button with primary emphasis for the main row action.',
		component: ViewPrimaryButtonDemoComponent,
		code: `<button viewPrimaryButton (click)="onView()">View</button>`,
	},
};

/**
 * Generic per-button page. One route per button (`buttons/<slug>`) resolves to
 * this component, which reads the slug from the URL and renders that button's
 * title, description, live demo and source. See {@link BUTTON_DETAILS}.
 */
@Component({
	selector: 'ng-kit-button-detail-page',
	imports: [NgComponentOutlet, CodeBlock, RouterLink],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		@if (detail(); as d) {
			<article class="detail">
				<header class="detail__header">
					<h1 class="detail__title">{{ d.title }}</h1>
					<p class="detail__desc">{{ d.description }}</p>
				</header>

				<section class="detail__demo">
					<ng-container *ngComponentOutlet="d.component" />
				</section>

				@if (d.code) {
					<section class="detail__source">
						<h2>Usage</h2>
						<code-block [code]="d.code" language="html" />
					</section>
				}

				<p class="detail__api-link">
					See the <a routerLink="/buttons/introduction">Buttons introduction</a> for the shared inputs, outputs and base-button API.
				</p>
			</article>
		} @else {
			<p>Unknown button.</p>
		}
	`,
	styles: `
		:host {
			display: block;
		}

		.detail__header {
			margin-block-end: 1.5rem;
		}

		.detail__title {
			margin-block-end: 0.5rem;
		}

		.detail__desc {
			color: rgba(0, 0, 0, 0.7);
			margin: 0;
		}

		.detail__demo {
			padding: 1.5rem;
			border: 1px solid rgba(0, 0, 0, 0.12);
			border-radius: 8px;
			background: #fff;
		}

		.detail__source {
			margin-block-start: 1.5rem;
		}

		.detail__source h2 {
			font-size: 1rem;
			margin-block-end: 0.5rem;
		}

		.detail__api-link {
			margin-block-start: 2rem;
			color: rgba(0, 0, 0, 0.7);
		}
	`,
})
export class ButtonDetailPage {
	private readonly route = inject(ActivatedRoute);
	private readonly urlSegments = toSignal(this.route.url, { initialValue: this.route.snapshot.url });

	/** The last URL segment (e.g. `base-button`) picks the button entry. */
	protected readonly detail = computed<ButtonDetail | undefined>(() => {
		const segments = this.urlSegments();
		const slug = segments.length ? segments[segments.length - 1].path : '';
		return BUTTON_DETAILS[slug];
	});
}
