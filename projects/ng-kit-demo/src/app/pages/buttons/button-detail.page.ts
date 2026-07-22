import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Type, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DemoCard } from '../../shared/demo-card.component';
import { DocPage } from '../../shared/doc-page.component';
import { CodeBlock } from '../../shared/code-block.component';
import { buildDemoConfig } from '../../shared/build-demo-config';
import { DemoConfig } from '../../types/demo-config';
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
	/** Runnable StackBlitz config powering the card's "Open in StackBlitz" action. */
	readonly config?: DemoConfig;
}

/** One row of a button's API table (used for both inputs and outputs). */
interface ButtonApiRow {
	readonly name: string;
	/** Type for an input, or payload type for an output. */
	readonly type: string;
	/** Default value for an input; omitted for outputs. */
	readonly default?: string;
	readonly description: string;
}

/**
 * Per-button API reference. Each ng-kit button extends the shared base button and
 * overrides a handful of defaults (label, icon, loading label, classes); those
 * overrides are the button's "own" API and are listed in {@link inputs}. Values
 * are taken from the library source (component form). Everything else — the full
 * common input/output surface — is inherited from the base and documented on the
 * Buttons introduction page. Buttons that don't extend the base (close / export)
 * declare no inputs of their own.
 */
interface ButtonApi {
	/** One-line description of how this button relates to the base button. */
	readonly summary: string;
	/** Inputs this button declares or overrides. Empty/omitted when it has none. */
	readonly inputs?: readonly ButtonApiRow[];
	/** Outputs this button declares (only the base button lists its own). */
	readonly outputs?: readonly ButtonApiRow[];
}

/**
 * Every button family, keyed by its route slug (the segment after `buttons/`).
 * The generic {@link ButtonDetailPage} looks the current page up here, so adding
 * a button is a matter of registering it in the gallery registry and here.
 *
 * Each entry's `config` is a self-contained, runnable standalone component (inline
 * template). Its exported class name equals `PascalCase(componentName) + 'Component'`
 * — with `componentName` set to `<slug>-demo`, that is exactly the existing demo
 * class, so StackBlitz boots the same demo shown live on the page. The `code` field
 * remains the short HTML usage snippet surfaced by the card's "View source" toggle.
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
		config: buildDemoConfig({
			title: 'Base Button',
			componentName: 'base-button-demo',
			code: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PrimaryButtonComponent, PrimaryButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-base-button-demo',
	standalone: true,
	imports: [PrimaryButtonComponent, PrimaryButtonDirective],
	template: \`
		<div>
			<h2>Loading state</h2>
			<primary-button [loading]="loading()" label="Save" (click)="toggleLoading()"></primary-button>
		</div>

		<div>
			<h2>Disabled state</h2>
			<primary-button [disabled]="true" label="Disabled"></primary-button>
		</div>

		<div>
			<h2>With icon</h2>
			<primary-button [showIcon]="true" icon="save" label="Save with icon"></primary-button>
		</div>

		<div>
			<h2>Directive with loading</h2>
			<button ariaLabel="Submit" [loading]="loading()" primaryButton>Submit</button>
		</div>
	\`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseButtonDemoComponent {
	loading = signal(false);

	toggleLoading(): void {
		this.loading.update((value) => !value);
	}
}`,
		}),
	},
	'bootstrap-link-button': {
		title: 'Bootstrap Link Button',
		description: 'An anchor styled as a Bootstrap button (bsLinkButton / <bs-link-button>).',
		component: BsLinkButtonDemoComponent,
		code: `<a bsLinkButton href="/docs">Docs</a>

<bs-link-button href="/docs">Docs</bs-link-button>`,
		config: buildDemoConfig({
			title: 'Bootstrap Link Button',
			componentName: 'bs-link-button-demo',
			code: `import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BsLinkButtonComponent, BsLinkButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-bs-link-button-demo',
	standalone: true,
	imports: [BsLinkButtonComponent, BsLinkButtonDirective],
	template: \`
		<div class="m-3">
			<h2>Directive (Preferred)</h2>
			<a bsLinkButton ariaLabel="Bootstrap Link Button" href="/path">Bootstrap Link Button</a>
		</div>

		<div class="m-3">
			<h2>Component</h2>
			<bs-link-button class="m-3" label="Bootstrap Link Button"></bs-link-button>
		</div>
	\`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BsLinkButtonDemoComponent {}`,
		}),
	},
	'close-button': {
		title: 'Close Button',
		description: 'A dismiss button (closeButton directive) for dialogs, alerts and panels.',
		component: CloseButtonDemoComponent,
		code: `<button ariaLabel="Close" (click)="onClose()" closeButton></button>`,
		config: buildDemoConfig({
			title: 'Close Button',
			componentName: 'close-button-demo',
			code: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CloseButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-close-button-demo',
	standalone: true,
	imports: [CloseButtonDirective],
	template: \`
		@if (isPanelVisible()) {
			<div class="alert alert-info d-flex justify-content-between align-items-center">
				<span>This is a dismissible panel. Click the close button to hide it.</span>
				<button ariaLabel="Close panel" closeButton (click)="closePanel()">&times;</button>
			</div>
		} @else {
			<button class="btn btn-secondary" (click)="resetPanel()">Reset Demo</button>
		}

		<hr />

		<div>
			<h2>Basic Close Button</h2>
			<button ariaLabel="Close dialog" closeButton>&times;</button>
		</div>
	\`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloseButtonDemoComponent {
	isPanelVisible = signal(true);

	closePanel(): void {
		this.isPanelVisible.set(false);
	}

	resetPanel(): void {
		this.isPanelVisible.set(true);
	}
}`,
		}),
	},
	'delete-button': {
		title: 'Delete Button',
		description: 'A destructive delete button (deleteButton directive / <delete-button>).',
		component: DeleteButtonDemoComponent,
		code: `<!-- Directive (preferred) -->
<button ariaLabel="Delete item" (click)="onDelete()" deleteButton>Delete</button>

<!-- Component -->
<delete-button ariaLabel="Delete item" (click)="onDelete()"></delete-button>`,
		config: buildDemoConfig({
			title: 'Delete Button',
			componentName: 'delete-button-demo',
			code: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { DeleteButtonComponent, DeleteButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-delete-button-demo',
	standalone: true,
	imports: [DeleteButtonComponent, DeleteButtonDirective],
	template: \`
		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="Delete item" (click)="onDelete()" deleteButton>Delete</button>
		</div>

		<div>
			<h2>Component</h2>
			<delete-button ariaLabel="Delete item" (click)="onDelete()"></delete-button>
		</div>

		<p>{{ status() }}</p>
	\`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteButtonDemoComponent {
	status = signal('');

	onDelete(): void {
		this.status.set('Delete clicked!');
	}
}`,
		}),
	},
	'edit-bootstrap-button': {
		title: 'Edit Bootstrap Button',
		description: 'An edit button rendered with Bootstrap button styling.',
		component: EditBsButtonDemoComponent,
		code: `<button editBsButton (click)="onEdit()">Edit</button>`,
		config: buildDemoConfig({
			title: 'Edit Bootstrap Button',
			componentName: 'edit-bs-button-demo',
			code: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { EditBsButtonComponent, EditBsButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-edit-bs-button-demo',
	standalone: true,
	imports: [EditBsButtonComponent, EditBsButtonDirective],
	template: \`
		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="Edit item" (click)="onEdit()" editBsButton>Edit</button>
		</div>

		<div>
			<h2>Component</h2>
			<edit-bs-button ariaLabel="Edit item" (click)="onEdit()"></edit-bs-button>
		</div>

		<p>{{ status() }}</p>
	\`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditBsButtonDemoComponent {
	status = signal('');

	onEdit(): void {
		this.status.set('Edit clicked!');
	}
}`,
		}),
	},
	'edit-button': {
		title: 'Edit Button',
		description: 'The default edit button (editButton directive / <edit-button>).',
		component: EditButtonDemoComponent,
		code: `<!-- Directive (preferred) -->
<button ariaLabel="Edit item" (click)="onEdit()" editButton>Edit</button>

<!-- Component -->
<edit-button ariaLabel="Edit item" (click)="onEdit()"></edit-button>`,
		config: buildDemoConfig({
			title: 'Edit Button',
			componentName: 'edit-button-demo',
			code: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { EditButtonComponent, EditButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-edit-button-demo',
	standalone: true,
	imports: [EditButtonComponent, EditButtonDirective],
	template: \`
		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="Edit item" (click)="onEdit()" editButton>Edit</button>
		</div>

		<div>
			<h2>Component</h2>
			<edit-button ariaLabel="Edit item" (click)="onEdit()"></edit-button>
		</div>

		<p>{{ status() }}</p>
	\`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditButtonDemoComponent {
	status = signal('');

	onEdit(): void {
		this.status.set('Edit clicked!');
	}
}`,
		}),
	},
	'edit-svg-icon-button': {
		title: 'Edit SVG Icon Button',
		description: 'An icon-only edit button rendering an inline SVG pencil.',
		component: EditSvgIconButtonDemoComponent,
		code: `<button editSvgIconButton ariaLabel="Edit" (click)="onEdit()"></button>`,
		config: buildDemoConfig({
			title: 'Edit SVG Icon Button',
			componentName: 'edit-svg-icon-button-demo',
			code: `import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EditSvgIconButtonComponent, EditSvgIconButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-edit-svg-icon-button-demo',
	standalone: true,
	imports: [EditSvgIconButtonComponent, EditSvgIconButtonDirective],
	template: \`
		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="Edit item" (click)="onEdit()" editSvgIconButton>Edit</button>
		</div>

		<div>
			<h2>Component</h2>
			<edit-svg-icon-button ariaLabel="Edit item" (click)="onEdit()"></edit-svg-icon-button>
		</div>
	\`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditSvgIconButtonDemoComponent {
	onEdit(): void {
		console.log('Edit clicked');
	}
}`,
		}),
	},
	'excel-export-button': {
		title: 'Excel Export Button',
		description: 'Exports tabular data to a spreadsheet.',
		component: ExcelExportButtonDemoComponent,
		code: `<button excelExportButton (click)="exportExcel()">Export to Excel</button>`,
		config: buildDemoConfig({
			title: 'Excel Export Button',
			componentName: 'excel-export-button-demo',
			code: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ExcelExportButtonComponent, ExcelExportButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-excel-export-button-demo',
	standalone: true,
	imports: [ExcelExportButtonComponent, ExcelExportButtonDirective],
	template: \`
		<div>
			<h2>Directive (Preferred)</h2>
			<button (click)="onExport()" excelExportButton>Excel</button>
		</div>

		<div>
			<h2>Component</h2>
			<excel-export-button (click)="onExport()"></excel-export-button>
		</div>

		<p>{{ status() }}</p>
	\`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExcelExportButtonDemoComponent {
	status = signal('');

	onExport(): void {
		this.status.set('Excel export clicked!');
	}
}`,
		}),
	},
	'manage-button': {
		title: 'Manage Button',
		description: 'A button for management / settings entry points.',
		component: ManageButtonDemoComponent,
		code: `<button manageButton (click)="onManage()">Manage</button>`,
		config: buildDemoConfig({
			title: 'Manage Button',
			componentName: 'manage-button-demo',
			code: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ManageButtonComponent, ManageButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-manage-button-demo',
	standalone: true,
	imports: [ManageButtonComponent, ManageButtonDirective],
	template: \`
		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="Manage settings" (click)="onManage()" manageButton>Manage</button>
		</div>

		<div>
			<h2>Component</h2>
			<manage-button ariaLabel="Manage settings" (click)="onManage()"></manage-button>
		</div>

		<p>{{ status() }}</p>
	\`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageButtonDemoComponent {
	status = signal('');

	onManage(): void {
		this.status.set('Manage clicked!');
	}
}`,
		}),
	},
	'pdf-export-button': {
		title: 'PDF Export Button',
		description: 'Exports tabular data to a PDF document.',
		component: PdfExportButtonDemoComponent,
		code: `<button pdfExportButton (click)="exportPdf()">Export to PDF</button>`,
		config: buildDemoConfig({
			title: 'PDF Export Button',
			componentName: 'pdf-export-button-demo',
			code: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PdfExportButtonComponent, PdfExportButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-pdf-export-button-demo',
	standalone: true,
	imports: [PdfExportButtonComponent, PdfExportButtonDirective],
	template: \`
		<div>
			<h2>Directive (Preferred)</h2>
			<button (click)="onExport()" pdfExportButton>PDF</button>
		</div>

		<div>
			<h2>Component</h2>
			<pdf-export-button (click)="onExport()"></pdf-export-button>
		</div>

		<p>{{ status() }}</p>
	\`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdfExportButtonDemoComponent {
	status = signal('');

	onExport(): void {
		this.status.set('PDF export clicked!');
	}
}`,
		}),
	},
	'primary-button': {
		title: 'Primary Button',
		description: 'The default call-to-action (primaryButton directive / <primary-button>).',
		component: PrimaryButtonDemoComponent,
		code: `<!-- Directive (preferred) -->
<button ariaLabel="Submit" (click)="onSubmit()" primaryButton>Submit</button>

<!-- Component -->
<primary-button ariaLabel="Submit" (click)="onSubmit()">Submit</primary-button>`,
		config: buildDemoConfig({
			title: 'Primary Button',
			componentName: 'primary-button-demo',
			code: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PrimaryButtonComponent, PrimaryButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-primary-button-demo',
	standalone: true,
	imports: [PrimaryButtonComponent, PrimaryButtonDirective],
	template: \`
		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="Submit" (click)="onSubmit()" primaryButton>Submit</button>
		</div>

		<div>
			<h2>Component</h2>
			<primary-button ariaLabel="Submit" (click)="onSubmit()">Submit</primary-button>
		</div>

		<p>{{ status() }}</p>
	\`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimaryButtonDemoComponent {
	status = signal('');

	onSubmit(): void {
		this.status.set('Submit clicked!');
	}
}`,
		}),
	},
	'save-primary-button': {
		title: 'Save Primary Button',
		description: "A primary button with a save icon and 'Saving…' loading label.",
		component: SavePrimaryButtonDemoComponent,
		code: `<button savePrimaryButton [loading]="saving()" (click)="onSave()">Save</button>`,
		config: buildDemoConfig({
			title: 'Save Primary Button',
			componentName: 'save-primary-button-demo',
			code: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SavePrimaryButtonComponent, SavePrimaryButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-save-primary-button-demo',
	standalone: true,
	imports: [SavePrimaryButtonComponent, SavePrimaryButtonDirective],
	template: \`
		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="Save" (click)="onSave()" savePrimaryButton>Save</button>
		</div>

		<div>
			<h2>Component</h2>
			<save-primary-button ariaLabel="Save" (click)="onSave()">Save</save-primary-button>
		</div>

		<p>{{ status() }}</p>
	\`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavePrimaryButtonDemoComponent {
	status = signal('');

	onSave(): void {
		this.status.set('Save clicked!');
	}
}`,
		}),
	},
	'success-button': {
		title: 'Success Button',
		description: 'A green, positive-affirmation button for confirming actions.',
		component: SuccessButtonDemoComponent,
		code: `<button successButton (click)="onConfirm()">Confirm</button>`,
		config: buildDemoConfig({
			title: 'Success Button',
			componentName: 'success-button-demo',
			code: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SuccessButtonComponent, SuccessButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-success-button-demo',
	standalone: true,
	imports: [SuccessButtonComponent, SuccessButtonDirective],
	template: \`
		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="Success" (click)="onSuccess()" successButton>Success</button>
		</div>

		<div>
			<h2>Component</h2>
			<success-button ariaLabel="Success" (click)="onSuccess()">Success</success-button>
		</div>

		<p>{{ status() }}</p>
	\`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessButtonDemoComponent {
	status = signal('');

	onSuccess(): void {
		this.status.set('Success clicked!');
	}
}`,
		}),
	},
	'search-button': {
		title: 'Search Button',
		description: 'A button styled for search / filter triggers.',
		component: SearchButtonDemoComponent,
		code: `<search-button ariaLabel="Search" (click)="onSearch()"></search-button>`,
		config: buildDemoConfig({
			title: 'Search Button',
			componentName: 'search-button-demo',
			code: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SearchButtonComponent } from '@js-smart/ng-kit';

@Component({
	selector: 'app-search-button-demo',
	standalone: true,
	imports: [SearchButtonComponent],
	template: \`
		<div>
			<h2>Component</h2>
			<search-button ariaLabel="Search" (click)="onSearch()"></search-button>
		</div>

		<p>{{ status() }}</p>
	\`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchButtonDemoComponent {
	status = signal('');

	onSearch(): void {
		this.status.set('Search clicked!');
	}
}`,
		}),
	},
	'view-button': {
		title: 'View Button',
		description: 'A subtle view / details button.',
		component: ViewButtonDemoComponent,
		code: `<button viewButton (click)="onView()">View</button>`,
		config: buildDemoConfig({
			title: 'View Button',
			componentName: 'view-button-demo',
			code: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ViewButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-view-button-demo',
	standalone: true,
	imports: [ViewButtonDirective],
	template: \`
		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="View details" (click)="onView()" viewButton>View</button>
		</div>

		<p>{{ status() }}</p>
	\`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewButtonDemoComponent {
	status = signal('');

	onView(): void {
		this.status.set('View clicked!');
	}
}`,
		}),
	},
	'view-primary-button': {
		title: 'View Primary Button',
		description: 'A view button with primary emphasis for the main row action.',
		component: ViewPrimaryButtonDemoComponent,
		code: `<button viewPrimaryButton (click)="onView()">View</button>`,
		config: buildDemoConfig({
			title: 'View Primary Button',
			componentName: 'view-primary-button-demo',
			code: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ViewPrimaryButtonComponent, ViewPrimaryButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-view-primary-button-demo',
	standalone: true,
	imports: [ViewPrimaryButtonComponent, ViewPrimaryButtonDirective],
	template: \`
		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="View details" (click)="onView()" viewPrimaryButton>View</button>
		</div>

		<div>
			<h2>Component</h2>
			<view-primary-button ariaLabel="View details" (click)="onView()">View</view-primary-button>
		</div>

		<p>{{ status() }}</p>
	\`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewPrimaryButtonDemoComponent {
	status = signal('');

	onView(): void {
		this.status.set('View clicked!');
	}
}`,
		}),
	},
};

/**
 * Per-button API reference, keyed by the same route slug as {@link BUTTON_DETAILS}.
 * Values mirror the ng-kit library source (component form). Buttons that extend
 * the base button list only their overridden inputs; the base button lists the
 * full shared surface; buttons that don't extend the base declare no inputs.
 */
const BUTTON_API: Record<string, ButtonApi> = {
	'base-button': {
		summary: 'The shared base every ng-kit button extends. It defines the common inputs and outputs that all other buttons inherit; consume it through one of the specific buttons rather than directly.',
		inputs: [
			{ name: 'loading', type: 'boolean', default: 'false', description: 'Shows a spinner and the loading label, and disables the button.' },
			{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the button.' },
			{ name: 'type', type: "'button' | 'submit'", default: "'button'", description: 'Native button type attribute.' },
			{ name: 'loadingLabel', type: 'string', default: "'Saving...'", description: 'Text shown while loading is true.' },
			{ name: 'label', type: 'string', default: "'Save'", description: 'Button label text.' },
			{ name: 'icon', type: 'string', default: "'save'", description: 'Material icon name rendered before the label.' },
			{ name: 'showIcon', type: 'boolean', default: 'true', description: 'Whether the leading icon is rendered.' },
			{ name: 'style', type: 'object | null', default: '—', description: 'Inline style object applied to the button.' },
			{ name: 'classes', type: 'string', default: "'btn'", description: 'CSS classes applied to the button.' },
			{ name: 'dataCy', type: 'string', default: "'save-button'", description: 'data-cy attribute for e2e selectors.' },
		],
		outputs: [
			{ name: 'onClick', type: 'MouseEvent', description: 'Emitted when the button is clicked.' },
			{ name: 'onFocus', type: 'FocusEvent', description: 'Emitted when the button gains focus.' },
			{ name: 'onBlur', type: 'FocusEvent', description: 'Emitted when the button loses focus.' },
			{ name: 'onKeyDown', type: 'KeyboardEvent', description: 'Emitted on key down while focused.' },
			{ name: 'onKeyUp', type: 'KeyboardEvent', description: 'Emitted on key up while focused.' },
		],
	},
	'primary-button': {
		summary: 'Extends the base button, overriding these defaults for the main call-to-action. All other base inputs and outputs are inherited.',
		inputs: [
			{ name: 'label', type: 'string', default: "'Save'", description: 'Button label text.' },
			{ name: 'icon', type: 'string', default: "'save'", description: 'Material icon name rendered before the label.' },
			{ name: 'showIcon', type: 'boolean', default: 'false', description: 'The primary button hides the leading icon by default.' },
			{ name: 'loadingLabel', type: 'string', default: "'Saving...'", description: 'Text shown while loading is true.' },
			{ name: 'classes', type: 'string', default: "'btn-primary primary-button'", description: 'CSS classes applied to the button.' },
		],
	},
	'success-button': {
		summary: 'Extends the base button with green, positive-affirmation styling. All other base inputs and outputs are inherited.',
		inputs: [
			{ name: 'label', type: 'string', default: "'Update'", description: 'Button label text.' },
			{ name: 'icon', type: 'string', default: "'save'", description: 'Material icon name rendered before the label.' },
			{ name: 'loadingLabel', type: 'string', default: "'Updating...'", description: 'Text shown while loading is true.' },
			{ name: 'classes', type: 'string', default: "'success-button'", description: 'CSS classes applied to the button.' },
		],
	},
	'save-primary-button': {
		summary: 'A primary button tuned for save actions, extending the base button. All other base inputs and outputs are inherited.',
		inputs: [
			{ name: 'label', type: 'string', default: "'Save'", description: 'Button label text.' },
			{ name: 'icon', type: 'string', default: "'save'", description: 'Material icon name rendered before the label.' },
			{ name: 'loadingLabel', type: 'string', default: "'Saving...'", description: "Text shown while saving (loading) is true." },
			{ name: 'classes', type: 'string', default: "'btn-primary primary-button'", description: 'CSS classes applied to the button.' },
		],
	},
	'search-button': {
		summary: 'Extends the base button, styled for search / filter triggers. All other base inputs and outputs are inherited.',
		inputs: [
			{ name: 'label', type: 'string', default: "'Search'", description: 'Button label text.' },
			{ name: 'icon', type: 'string', default: "'search'", description: 'Material icon name rendered before the label.' },
			{ name: 'loadingLabel', type: 'string', default: "'Searching...'", description: 'Text shown while loading is true.' },
			{ name: 'classes', type: 'string', default: "'btn-primary primary-button'", description: 'CSS classes applied to the button.' },
		],
	},
	'view-button': {
		summary: 'Extends the base button as a subtle view / details action. All other base inputs and outputs are inherited.',
		inputs: [
			{ name: 'label', type: 'string', default: "'View'", description: 'Button label text.' },
			{ name: 'icon', type: 'string', default: "'visibility'", description: 'Material icon name rendered before the label.' },
		],
	},
	'view-primary-button': {
		summary: 'A view button with primary emphasis for the main row action, extending the base button. All other base inputs and outputs are inherited.',
		inputs: [
			{ name: 'label', type: 'string', default: "'View'", description: 'Button label text.' },
			{ name: 'icon', type: 'string', default: "'visibility'", description: 'Material icon name rendered before the label.' },
			{ name: 'classes', type: 'string', default: "'btn-primary primary-button'", description: 'CSS classes applied to the button.' },
		],
	},
	'edit-button': {
		summary: 'The default edit button, extending the base button. All other base inputs and outputs are inherited.',
		inputs: [
			{ name: 'label', type: 'string', default: "'Edit'", description: 'Button label text.' },
			{ name: 'icon', type: 'string', default: "'edit'", description: 'Material icon name rendered before the label.' },
			{ name: 'classes', type: 'string', default: "'primary-button'", description: 'CSS classes applied to the button.' },
		],
	},
	'edit-bootstrap-button': {
		summary: 'An edit button with Bootstrap button styling, extending the base button. All other base inputs and outputs are inherited.',
		inputs: [
			{ name: 'label', type: 'string', default: "'Edit'", description: 'Button label text.' },
			{ name: 'classes', type: 'string', default: "'text-primary'", description: 'CSS classes applied to the button.' },
		],
	},
	'edit-svg-icon-button': {
		summary: 'An icon-only edit button that renders a custom inline SVG pencil instead of a Material icon, extending the base button. All other base inputs and outputs are inherited.',
		inputs: [
			{ name: 'label', type: 'string', default: "'Edit'", description: 'Accessible button label text.' },
			{ name: 'classes', type: 'string', default: "'primary-button'", description: 'CSS classes applied to the button.' },
		],
	},
	'delete-button': {
		summary: 'A destructive delete button, extending the base button. All other base inputs and outputs are inherited.',
		inputs: [
			{ name: 'label', type: 'string', default: "'Delete'", description: 'Button label text.' },
			{ name: 'icon', type: 'string', default: "'delete'", description: 'Material icon name rendered before the label.' },
			{ name: 'loadingLabel', type: 'string', default: "'Deleting...'", description: 'Text shown while loading is true.' },
			{ name: 'classes', type: 'string', default: "'delete-button'", description: 'CSS classes applied to the button.' },
		],
	},
	'manage-button': {
		summary: 'A secondary button for management / settings entry points, extending the base button. All other base inputs and outputs are inherited.',
		inputs: [
			{ name: 'label', type: 'string', default: "'Manage'", description: 'Button label text.' },
			{ name: 'icon', type: 'string', default: "'settings'", description: 'Material icon name rendered before the label.' },
			{ name: 'classes', type: 'string', default: "'mr-3 btn btn-secondary secondary-button'", description: 'CSS classes applied to the button.' },
		],
	},
	'bootstrap-link-button': {
		summary: 'Renders an anchor styled as a Bootstrap link button, extending the base button. All other base inputs and outputs are inherited.',
		inputs: [
			{ name: 'label', type: 'string', default: "'Edit'", description: 'Link label text.' },
			{ name: 'icon', type: 'string', default: "'search'", description: 'Material icon name rendered before the label.' },
			{ name: 'classes', type: 'string', default: "'btn text-primary'", description: 'CSS classes applied to the anchor.' },
		],
	},
	'close-button': {
		summary: 'A dismiss button applied via the closeButton directive. It adds close-button (secondary-button) styling to its host element and exposes no configurable inputs or outputs of its own.',
	},
	'excel-export-button': {
		summary: 'A standalone export button with fixed styling and a dark-green background. It does not extend the base button and exposes no configurable inputs or outputs.',
	},
	'pdf-export-button': {
		summary: 'A standalone export button with fixed styling for PDF export. It does not extend the base button and exposes no configurable inputs or outputs.',
	},
};

/**
 * Detailed per-button overview prose, keyed by route slug. Synthesised from the
 * ng-kit-docs pages and the library source, this is the lead description shown at
 * the top of each button page (above the Overview / Examples tabs).
 */
const BUTTON_OVERVIEW: Record<string, string> = {
	'base-button':
		'The Base Button is the foundation every ng-kit button is built on. It encapsulates the shared button logic, accessibility and styling — label, icon, disabled and loading state, ARIA attributes and keyboard interactions — that all other buttons inherit. It is not meant to be used on its own; use one of the specific buttons below, or extend it to build your own.',
	'primary-button':
		'The Primary Button is the default call-to-action, styled to stand out as the main action on a page or form with a prominent colour and an optional icon. It extends the Base Button, inheriting the shared loading, disabled and accessibility behaviour.',
	'success-button':
		'The Success Button signals a positive or successful outcome, styled with a success (typically green) colour. It extends the Base Button and is ideal for confirming actions such as saving or approving.',
	'save-primary-button':
		'The Save Primary Button is a primary button tuned for save actions. It combines primary styling with a save icon and a “Saving…” loading label, and extends the Base Button for the shared loading and accessibility behaviour.',
	'search-button':
		'The Search Button triggers search or filter actions and is styled with a magnifier icon. It extends the Base Button and is available as a component only (there is no directive form).',
	'view-button':
		'The View Button triggers view or details actions, styled with an eye (visibility) icon. It extends the Base Button; for a more prominent, primary-styled variant, use the View Primary Button.',
	'view-primary-button':
		'The View Primary Button is a primary-styled action for viewing or opening details, pairing an eye icon with primary colour for the main row action. It extends the Base Button.',
	'edit-button':
		'The Edit Button triggers editing of content, styled with an edit (pencil) icon. It extends the Base Button and is accessible out of the box.',
	'edit-bootstrap-button':
		'The Edit Bootstrap Button is an edit action rendered with Bootstrap button styling. It extends the Base Button and is commonly used to edit items in lists or tables.',
	'edit-svg-icon-button':
		'The Edit SVG Icon Button is an icon-only edit action that renders a custom inline SVG pencil instead of a Material icon, for consistent iconography across your app. It extends the Base Button.',
	'delete-button':
		'The Delete Button triggers destructive actions, styled with a danger colour and a delete (trash) icon. It extends the Base Button and surfaces a “Deleting…” loading label.',
	'close-button':
		'The Close Button dismisses dialogs, modals, alerts and other dismissible elements. Applied via the closeButton directive, it adds a standard close (×) affordance and accessible semantics to its host element.',
	'manage-button':
		'The Manage Button is for management or administration entry points such as settings or admin panels, styled as a secondary button with a settings (gear) icon. It extends the Base Button.',
	'bootstrap-link-button':
		'The Bootstrap Link Button renders an anchor styled as a Bootstrap link button — useful for actions that should look like a link but need button semantics and accessible navigation. It extends the Base Button.',
	'excel-export-button':
		'The Excel Export Button is a standalone button for exporting tabular data to a spreadsheet, with fixed styling and a dark-green background. It does not extend the Base Button.',
	'pdf-export-button':
		'The PDF Export Button is a standalone button for exporting data to PDF, with fixed styling and a red background. It does not extend the Base Button.',
};

/**
 * Generic per-button page. One route per button (`buttons/<slug>`) resolves to
 * this component, which reads the slug from the URL and renders that button's
 * detailed description, usage, custom API and a live example — using the shared
 * {@link DocPage} Overview / Examples tab shell. See {@link BUTTON_DETAILS}.
 */
@Component({
	selector: 'ng-kit-button-detail-page',
	imports: [NgComponentOutlet, DemoCard, DocPage, CodeBlock, RouterLink],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		@if (detail(); as d) {
			<doc-page [title]="d.title">
				<p docLead>{{ overview() }}</p>

				<div docOverview>
					<section class="page-section">
						<h2>Usage</h2>
						<p>
							Use the button through its directive selector on any element, or through its component selector. The directive form is
							preferred for new code; the component form remains supported.
						</p>
						@if (d.code) {
							<code-block [code]="d.code" language="html" />
						}
					</section>
				</div>

				<div docApi>
					@if (api(); as a) {
						<p class="api-summary">{{ a.summary }}</p>

						@if (a.inputs?.length) {
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
									@for (row of a.inputs; track row.name) {
										<tr>
											<td><code>{{ row.name }}</code></td>
											<td><code>{{ row.type }}</code></td>
											<td><code>{{ row.default }}</code></td>
											<td>{{ row.description }}</td>
										</tr>
									}
								</tbody>
							</table>
						}

						@if (a.outputs?.length) {
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
									@for (row of a.outputs; track row.name) {
										<tr>
											<td><code>{{ row.name }}</code></td>
											<td><code>{{ row.type }}</code></td>
											<td>{{ row.description }}</td>
										</tr>
									}
								</tbody>
							</table>
						} @else if (!a.inputs?.length) {
							<p class="api-note">This button exposes no configurable inputs of its own.</p>
						}
					}

					<p class="api-link">
						See the <a routerLink="/buttons/introduction">Buttons introduction</a> for the shared inputs, outputs and base-button API.
					</p>
				</div>

				<div docExamples>
					<demo-card
						[title]="d.title"
						[anchorId]="slug()"
						description="Live demo — directive and component forms."
						[code]="d.config?.componentTs ?? ''"
						[stackblitz]="d.config ?? null">
						<ng-container *ngComponentOutlet="d.component" />
					</demo-card>
				</div>
			</doc-page>
		} @else {
			<p>Unknown button.</p>
		}
	`,
	styles: `
		:host {
			display: block;
		}

		h3 {
			font-size: 1rem;
			margin-block: 1.75rem 0.5rem;
		}
	`,
})
export class ButtonDetailPage {
	private readonly route = inject(ActivatedRoute);
	private readonly urlSegments = toSignal(this.route.url, { initialValue: this.route.snapshot.url });

	/** The current route slug (e.g. `base-button`), also used as the card's anchor. */
	protected readonly slug = computed<string>(() => {
		const segments = this.urlSegments();
		return segments.length ? segments[segments.length - 1].path : '';
	});

	/** The slug picks the button entry. */
	protected readonly detail = computed<ButtonDetail | undefined>(() => BUTTON_DETAILS[this.slug()]);

	/** The slug's per-button API reference (overridden inputs / outputs). */
	protected readonly api = computed<ButtonApi | undefined>(() => BUTTON_API[this.slug()]);

	/** Detailed lead description for the current button. */
	protected readonly overview = computed<string>(() => BUTTON_OVERVIEW[this.slug()] ?? this.detail()?.description ?? '');
}
