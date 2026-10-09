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
 * are taken from the library source (directive form). Everything else — the full
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
     via primaryButton, which extends BaseButtonDirective. -->
<button [loading]="loading()" icon="save" primaryButton mat-raised-button>Save</button>
<button ariaLabel="Submit" [loading]="loading()" primaryButton mat-raised-button>Submit</button>`,
		config: buildDemoConfig({
			title: 'Base Button',
			componentName: 'base-button-demo',
			code: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { PrimaryButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-base-button-demo',
	standalone: true,
	imports: [PrimaryButtonDirective, MatButton],
	template: \`
		<div>
			<h2>Loading state</h2>
			<button [loading]="loading()" label="Save" (click)="toggleLoading()" primaryButton mat-raised-button>Save</button>
		</div>

		<div>
			<h2>Disabled state</h2>
			<button [disabled]="true" primaryButton mat-raised-button>Disabled</button>
		</div>

		<div>
			<h2>With icon</h2>
			<button icon="save" primaryButton mat-raised-button>Save with icon</button>
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
		description: 'An anchor styled as a Bootstrap button (bsLinkButton directive).',
		component: BsLinkButtonDemoComponent,
		code: `<a bsLinkButton href="/docs" mat-button>Docs</a>`,
		config: buildDemoConfig({
			title: 'Bootstrap Link Button',
			componentName: 'bs-link-button-demo',
			code: `import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { BsLinkButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-bs-link-button-demo',
	standalone: true,
	imports: [BsLinkButtonDirective, MatButton],
	template: \`
		<div class="m-5">
			<h2>Directive (Preferred)</h2>
			<a bsLinkButton ariaLabel="Bootstrap Link Button" href="/path" mat-button>Bootstrap Link Button</a>
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
		code: `<button (click)="onClose()" aria-label="Close" closeButton mat-button></button>`,
		config: buildDemoConfig({
			title: 'Close Button',
			componentName: 'close-button-demo',
			code: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { CloseButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-close-button-demo',
	standalone: true,
	imports: [CloseButtonDirective, MatButton],
	template: \`
		@if (isPanelVisible()) {
			<div class="alert theme-info d-flex justify-content-between align-items-center">
				<span>This is a dismissible panel. Click the close button to hide it.</span>
				<button (click)="closePanel()" aria-label="Close panel" closeButton mat-button>&times;</button>
			</div>
		} @else {
			<button (click)="resetPanel()" class="btn-solid theme-secondary" mat-button>Reset Demo</button>
		}

		<hr />

		<div>
			<h2>Basic Close Button</h2>
			<button aria-label="Close dialog" closeButton mat-button>&times;</button>
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
		description: 'A destructive delete button (deleteButton directive).',
		component: DeleteButtonDemoComponent,
		code: `<button ariaLabel="Delete item" (click)="onDelete()" deleteButton mat-raised-button>Delete</button>`,
		config: buildDemoConfig({
			title: 'Delete Button',
			componentName: 'delete-button-demo',
			code: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { DeleteButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-delete-button-demo',
	standalone: true,
	imports: [DeleteButtonDirective, MatButton],
	template: \`
		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="Delete item" (click)="onDelete()" deleteButton mat-raised-button>Delete</button>
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
		code: `<button editBsButton (click)="onEdit()" mat-button>Edit</button>`,
		config: buildDemoConfig({
			title: 'Edit Bootstrap Button',
			componentName: 'edit-bs-button-demo',
			code: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { EditBsButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-edit-bs-button-demo',
	standalone: true,
	imports: [EditBsButtonDirective, MatButton],
	template: \`
		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="Edit item" (click)="onEdit()" editBsButton mat-button>Edit</button>
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
		description: 'The default edit button (editButton directive).',
		component: EditButtonDemoComponent,
		code: `<button ariaLabel="Edit item" (click)="onEdit()" editButton mat-raised-button>Edit</button>`,
		config: buildDemoConfig({
			title: 'Edit Button',
			componentName: 'edit-button-demo',
			code: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { EditButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-edit-button-demo',
	standalone: true,
	imports: [EditButtonDirective, MatButton],
	template: \`
		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="Edit item" (click)="onEdit()" editButton mat-raised-button>Edit</button>
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
		code: `<button editSvgIconButton ariaLabel="Edit" (click)="onEdit()" mat-raised-button></button>`,
		config: buildDemoConfig({
			title: 'Edit SVG Icon Button',
			componentName: 'edit-svg-icon-button-demo',
			code: `import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { EditSvgIconButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-edit-svg-icon-button-demo',
	standalone: true,
	imports: [EditSvgIconButtonDirective, MatButton],
	template: \`
		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="Edit item" (click)="onEdit()" editSvgIconButton mat-raised-button>Edit</button>
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
		code: `<button excelExportButton (click)="exportExcel()" mat-raised-button>Export to Excel</button>`,
		config: buildDemoConfig({
			title: 'Excel Export Button',
			componentName: 'excel-export-button-demo',
			code: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ExcelExportButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-excel-export-button-demo',
	standalone: true,
	imports: [ExcelExportButtonDirective, MatButton],
	template: \`
		<div>
			<h2>Directive (Preferred)</h2>
			<button (click)="onExport()" excelExportButton mat-raised-button>Excel</button>
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
		code: `<button manageButton (click)="onManage()" mat-raised-button>Manage</button>`,
		config: buildDemoConfig({
			title: 'Manage Button',
			componentName: 'manage-button-demo',
			code: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ManageButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-manage-button-demo',
	standalone: true,
	imports: [ManageButtonDirective, MatButton],
	template: \`
		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="Manage settings" (click)="onManage()" manageButton mat-raised-button>Manage</button>
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
		code: `<button pdfExportButton (click)="exportPdf()" mat-raised-button>Export to PDF</button>`,
		config: buildDemoConfig({
			title: 'PDF Export Button',
			componentName: 'pdf-export-button-demo',
			code: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { PdfExportButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-pdf-export-button-demo',
	standalone: true,
	imports: [PdfExportButtonDirective, MatButton],
	template: \`
		<div>
			<h2>Directive (Preferred)</h2>
			<button (click)="onExport()" pdfExportButton mat-raised-button>PDF</button>
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
		description: 'The default call-to-action (primaryButton directive).',
		component: PrimaryButtonDemoComponent,
		code: `<button ariaLabel="Submit" (click)="onSubmit()" primaryButton mat-raised-button>Submit</button>`,
		config: buildDemoConfig({
			title: 'Primary Button',
			componentName: 'primary-button-demo',
			code: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { PrimaryButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-primary-button-demo',
	standalone: true,
	imports: [PrimaryButtonDirective, MatButton],
	template: \`
		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="Submit" (click)="onSubmit()" primaryButton mat-raised-button>Submit</button>
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
		code: `<button savePrimaryButton [loading]="saving()" (click)="onSave()" mat-raised-button>Save</button>`,
		config: buildDemoConfig({
			title: 'Save Primary Button',
			componentName: 'save-primary-button-demo',
			code: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { SavePrimaryButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-save-primary-button-demo',
	standalone: true,
	imports: [SavePrimaryButtonDirective, MatButton],
	template: \`
		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="Save" (click)="onSave()" savePrimaryButton mat-raised-button>Save</button>
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
		code: `<button successButton (click)="onConfirm()" mat-raised-button>Confirm</button>`,
		config: buildDemoConfig({
			title: 'Success Button',
			componentName: 'success-button-demo',
			code: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { SuccessButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-success-button-demo',
	standalone: true,
	imports: [SuccessButtonDirective, MatButton],
	template: \`
		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="Success" (click)="onSuccess()" successButton mat-raised-button>Success</button>
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
		code: `<button ariaLabel="Search" (click)="onSearch()" searchButton mat-raised-button>Search</button>`,
		config: buildDemoConfig({
			title: 'Search Button',
			componentName: 'search-button-demo',
			code: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { SearchButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-search-button-demo',
	standalone: true,
	imports: [SearchButtonDirective, MatButton],
	template: \`
		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="Search" (click)="onSearch()" searchButton mat-raised-button>Search</button>
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
		code: `<button viewButton (click)="onView()" mat-button>View</button>`,
		config: buildDemoConfig({
			title: 'View Button',
			componentName: 'view-button-demo',
			code: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ViewButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-view-button-demo',
	standalone: true,
	imports: [ViewButtonDirective, MatButton],
	template: \`
		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="View details" (click)="onView()" viewButton mat-button>View</button>
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
		code: `<button viewPrimaryButton (click)="onView()" mat-raised-button>View</button>`,
		config: buildDemoConfig({
			title: 'View Primary Button',
			componentName: 'view-primary-button-demo',
			code: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ViewPrimaryButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-view-primary-button-demo',
	standalone: true,
	imports: [ViewPrimaryButtonDirective, MatButton],
	template: \`
		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="View details" (click)="onView()" viewPrimaryButton mat-raised-button>View</button>
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
 * Values mirror the ng-kit library source (directive form). Buttons that extend
 * the base button list only their overridden inputs; the base button lists the
 * full shared surface; buttons that don't extend the base declare no inputs.
 */
const BUTTON_API: Record<string, ButtonApi> = {
	'base-button': {
		summary:
			'The shared base every ng-kit button extends. It defines the common inputs and outputs that all other buttons inherit; consume it through one of the specific buttons rather than directly.',
		inputs: [
			{
				name: 'loading',
				type: 'boolean',
				default: 'false',
				description: 'Shows a spinner and the loading label, and disables the button.',
			},
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
		summary:
			'Extends the base button, overriding these defaults for the main call-to-action. All other base inputs and outputs are inherited.',
		inputs: [
			{ name: 'label', type: 'string', default: "'Save'", description: 'Button label text.' },
			{ name: 'icon', type: 'string', default: "'save'", description: 'Material icon name rendered before the label.' },
			{ name: 'showIcon', type: 'boolean', default: 'false', description: 'The primary button hides the leading icon by default.' },
			{ name: 'loadingLabel', type: 'string', default: "'Saving...'", description: 'Text shown while loading is true.' },
			{
				name: 'classes',
				type: 'string',
				default: "'btn-primary btn-solid theme-primary primary-button'",
				description: 'CSS classes applied to the button.',
			},
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
			{ name: 'loadingLabel', type: 'string', default: "'Saving...'", description: 'Text shown while saving (loading) is true.' },
			{
				name: 'classes',
				type: 'string',
				default: "'btn-primary btn-solid theme-primary primary-button'",
				description: 'CSS classes applied to the button.',
			},
		],
	},
	'search-button': {
		summary: 'Extends the base button, styled for search / filter triggers. All other base inputs and outputs are inherited.',
		inputs: [
			{ name: 'label', type: 'string', default: "'Search'", description: 'Button label text.' },
			{ name: 'icon', type: 'string', default: "'search'", description: 'Material icon name rendered before the label.' },
			{ name: 'loadingLabel', type: 'string', default: "'Searching...'", description: 'Text shown while loading is true.' },
			{
				name: 'classes',
				type: 'string',
				default: "'btn-primary btn-solid theme-primary primary-button'",
				description: 'CSS classes applied to the button.',
			},
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
		summary:
			'A view button with primary emphasis for the main row action, extending the base button. All other base inputs and outputs are inherited.',
		inputs: [
			{ name: 'label', type: 'string', default: "'View'", description: 'Button label text.' },
			{ name: 'icon', type: 'string', default: "'visibility'", description: 'Material icon name rendered before the label.' },
			{
				name: 'classes',
				type: 'string',
				default: "'btn-primary btn-solid theme-primary primary-button'",
				description: 'CSS classes applied to the button.',
			},
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
			{
				name: 'classes',
				type: 'string',
				default: "'btn text-primary btn-text theme-primary gap-1'",
				description: 'CSS classes applied to the button.',
			},
		],
	},
	'edit-svg-icon-button': {
		summary:
			'An icon-only edit button that renders a custom inline SVG pencil instead of a Material icon, extending the base button. All other base inputs and outputs are inherited.',
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
		summary:
			'A secondary button for management / settings entry points, extending the base button. All other base inputs and outputs are inherited.',
		inputs: [
			{ name: 'label', type: 'string', default: "'Manage'", description: 'Button label text.' },
			{ name: 'icon', type: 'string', default: "'settings'", description: 'Material icon name rendered before the label.' },
			{
				name: 'classes',
				type: 'string',
				default: "'mr-3 btn btn-secondary secondary-button'",
				description: 'CSS classes applied to the button.',
			},
		],
	},
	'bootstrap-link-button': {
		summary:
			'Renders an anchor styled as a Bootstrap link button, extending the base button. All other base inputs and outputs are inherited.',
		inputs: [
			{ name: 'label', type: 'string', default: "'Edit'", description: 'Link label text.' },
			{ name: 'icon', type: 'string', default: "'search'", description: 'Material icon name rendered before the label.' },
			{
				name: 'classes',
				type: 'string',
				default: "'btn text-primary btn-text theme-primary'",
				description: 'CSS classes applied to the anchor.',
			},
		],
	},
	'close-button': {
		summary:
			'A dismiss button applied via the closeButton directive. It adds close-button (secondary-button) styling to its host element and exposes no configurable inputs or outputs of its own.',
	},
	'excel-export-button': {
		summary:
			'A standalone export button with fixed styling and a dark-green background. It does not extend the base button and exposes no configurable inputs or outputs.',
	},
	'pdf-export-button': {
		summary:
			'A standalone export button with fixed styling for PDF export. It does not extend the base button and exposes no configurable inputs or outputs.',
	},
};

/**
 * Detailed per-button overview prose, keyed by route slug. Synthesised from the
 * library source, this is the lead description shown at the top of each button
 * page (above the Overview / Examples tabs).
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
		'The Search Button triggers search or filter actions and is styled with a magnifier icon. It extends the Base Button and is available as the searchButton directive.',
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
							Use the button through its directive selector on any element (for example,
							<code>primaryButton</code> on a <code>&lt;button&gt;</code>).
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
											<td>
												<code>{{ row.name }}</code>
											</td>
											<td>
												<code>{{ row.type }}</code>
											</td>
											<td>
												<code>{{ row.default }}</code>
											</td>
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
											<td>
												<code>{{ row.name }}</code>
											</td>
											<td>
												<code>{{ row.type }}</code>
											</td>
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
						description="Live demo — directive form."
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
