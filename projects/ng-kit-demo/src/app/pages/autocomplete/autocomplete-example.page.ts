import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Type, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DemoSettings } from '../../shared/demo-settings';
import { CodeBlock } from '../../shared/code-block.component';
import { DocPage } from '../../shared/doc-page.component';
import { ExampleViewer } from '../../shared/example-viewer.component';
import { StackBlitzService } from '../../services/stackblitz.service';
import { DemoConfig } from '../../types/demo-config';
import { AutocompleteInput, AutocompleteTemplate, pickAutocompleteInputs, pickAutocompleteTemplates } from './autocomplete-api';
import { AsyncExample, asyncConfig } from './examples/async.example';
import { ComboBoxExample, comboBoxConfig } from './examples/combo-box.example';
import { ControlledExample, controlledConfig } from './examples/controlled.example';
import { CountrySelectExample, countrySelectConfig } from './examples/country-select.example';
import { CustomRenderExample, customRenderConfig } from './examples/custom-render.example';
import { DisabledOptionsExample, disabledOptionsConfig } from './examples/disabled-options.example';
import { FixedTagsExample, fixedTagsConfig } from './examples/fixed-tags.example';
import { FreeSoloExample, freeSoloConfig } from './examples/free-solo.example';
import { GroupedExample, groupedConfig } from './examples/grouped.example';
import { MultipleCheckboxesExample, multipleCheckboxesConfig } from './examples/multiple-checkboxes.example';
import { PlaygroundExample, playgroundConfig } from './examples/playground.example';
import { SizesAppearancesExample, sizesAppearancesConfig } from './examples/sizes-appearances.example';
import { VirtualizedExample, virtualizedConfig } from './examples/virtualized.example';

interface ExampleDetail {
	readonly title: string;
	readonly description: string;
	readonly component: Type<unknown>;
	readonly config: DemoConfig;
}

/**
 * Per-example documentation: a detailed overview, a short usage snippet, and the
 * subset of the Autocomplete API each example showcases (input + content-template
 * names, resolved against the shared metadata in {@link ./autocomplete-api}).
 */
interface ExampleDoc {
	/** Detailed lead description shown above the Overview / Examples tabs. */
	readonly overview: string;
	/** Short HTML usage snippet for the Overview → Usage section. */
	readonly usage: string;
	/** Input names this example demonstrates (rendered as a focused API table). */
	readonly inputs: readonly string[];
	/** Content-template directives this example demonstrates, if any. */
	readonly templates?: readonly string[];
}

/**
 * Every autocomplete example, keyed by its route slug (the segment after
 * `autocomplete/`). The generic {@link AutocompleteExamplePage} looks the
 * current page up here.
 */
const EXAMPLE_DETAILS: Record<string, ExampleDetail> = {
	'combo-box': { title: 'Combo box', description: 'Basic single-select with a filtered list of options.', component: ComboBoxExample, config: comboBoxConfig },
	'country-select': { title: 'Country select', description: 'Custom option template with a flag and dial code.', component: CountrySelectExample, config: countrySelectConfig },
	'disabled-options': { title: 'Disabled options', description: 'Every 3rd option is disabled and cannot be selected.', component: DisabledOptionsExample, config: disabledOptionsConfig },
	'sizes-appearances': { title: 'Sizes & appearances', description: 'Every combination of size and appearance.', component: SizesAppearancesExample, config: sizesAppearancesConfig },
	checkboxes: { title: 'Checkboxes', description: 'Multi-select with checkboxes; popup stays open after each pick.', component: MultipleCheckboxesExample, config: multipleCheckboxesConfig },
	'fixed-tags': { title: 'Fixed tags', description: "Multi-select with fixed chips that can't be removed, plus a “+n more” summary.", component: FixedTagsExample, config: fixedTagsConfig },
	'free-solo': { title: 'Free solo', description: "Type anything — the raw text becomes the value, even if it isn't in the list.", component: FreeSoloExample, config: freeSoloConfig },
	controlled: { title: 'Controlled', description: 'Every piece of state is owned by external signals and outside buttons.', component: ControlledExample, config: controlledConfig },
	async: { title: 'Asynchronous requests', description: 'Simulates a server-side search: options load after each keystroke.', component: AsyncExample, config: asyncConfig },
	grouped: { title: 'Grouped', description: 'Options grouped by their first letter via a pre-sorted group key.', component: GroupedExample, config: groupedConfig },
	virtualized: { title: 'Virtualized (10,000 options)', description: 'Single-select over 10,000 options, rendered virtually.', component: VirtualizedExample, config: virtualizedConfig },
	'custom-render': { title: 'Custom rendering', description: 'Custom option markup with query highlighting, custom icons, and a custom paper surface.', component: CustomRenderExample, config: customRenderConfig },
	playground: { title: 'Playground', description: 'Flip every input live to see how the autocomplete reacts.', component: PlaygroundExample, config: playgroundConfig },
};

/** Detailed overview + usage + demonstrated-API per example, keyed by route slug. */
const EXAMPLE_DOCS: Record<string, ExampleDoc> = {
	'combo-box': {
		overview:
			'A basic single-select combo box: the value must be chosen from a predefined list of options. Pass an options array, bind the selection with two-way [(value)], and typing filters the list in place.',
		usage: `<autocomplete
  [options]="films"
  [(value)]="value"
  appearance="outline"
  label="Movie"
  placeholder="Pick a film" />`,
		inputs: ['options', 'value', 'label', 'placeholder', 'appearance'],
	},
	'country-select': {
		overview:
			'A single-select over object options with a fully custom option row. getOptionLabel maps each country to its display string, while an *ngOption template renders the flag emoji, country name and dial code.',
		usage: `<autocomplete
  [options]="countries"
  [(value)]="value"
  [getOptionLabel]="getOptionLabel"
  label="Country">
  <div *ngOption="let country">
    {{ country.label }} (+{{ country.phone }})
  </div>
</autocomplete>`,
		inputs: ['options', 'value', 'getOptionLabel', 'label'],
		templates: ['*ngOption'],
	},
	'disabled-options': {
		overview:
			'Prevents selection of specific options via getOptionDisabled — here every third film is disabled. Disabled options are shown greyed out and skipped during keyboard navigation.',
		usage: `<autocomplete
  [options]="films"
  [(value)]="value"
  [getOptionDisabled]="isEveryThird"
  appearance="outline"
  label="Movie" />`,
		inputs: ['options', 'value', 'getOptionDisabled', 'label'],
	},
	'sizes-appearances': {
		overview:
			'Every combination of field density and Material appearance. size switches between the default medium and a denser small field, appearance chooses the fill or outline form-field style, and fullWidth stretches the field to fill its container.',
		usage: `<autocomplete [options]="films" [(value)]="value" size="small" appearance="fill" label="Movie" />
<autocomplete [options]="films" [(value)]="value" size="medium" appearance="outline" label="Movie" />
<autocomplete [options]="films" [(value)]="value" [fullWidth]="true" appearance="outline" label="Movie" />`,
		inputs: ['size', 'appearance', 'fullWidth'],
	},
	checkboxes: {
		overview:
			'Multi-select with a checkbox listbox that stays open after each pick. multiple renders the selection as removable chips, showCheckboxes adds a checkbox to each option, disableCloseOnSelect keeps the panel open, and filterSelectedOptions can hide options that are already chosen.',
		usage: `<autocomplete
  [options]="films"
  [(value)]="value"
  [multiple]="true"
  [showCheckboxes]="true"
  [disableCloseOnSelect]="true"
  appearance="outline"
  label="Movies" />`,
		inputs: ['multiple', 'showCheckboxes', 'disableCloseOnSelect', 'filterSelectedOptions'],
	},
	'fixed-tags': {
		overview:
			'Multi-select with fixed chips that cannot be removed. fixedOptions locks certain values in place, limitTags caps how many chips are shown when the field is unfocused, and getLimitTagsText customises the “+N” overflow summary.',
		usage: `<autocomplete
  [options]="films"
  [multiple]="true"
  [(value)]="value"
  [fixedOptions]="fixedFilms"
  [limitTags]="2"
  [getLimitTagsText]="getLimitTagsText"
  appearance="outline"
  label="Favorite films" />`,
		inputs: ['multiple', 'fixedOptions', 'limitTags', 'getLimitTagsText', 'isOptionEqualToValue'],
	},
	'free-solo': {
		overview:
			'Allows arbitrary values that are not bound to the options — ideal for a search or “creatable” field. freeSolo lets the raw text become the value, and a createFilterOptions filter surfaces an “Add …” entry so users can commit new values.',
		usage: `<autocomplete
  [options]="films"
  [freeSolo]="true"
  [(value)]="value"
  [filterOptions]="filter"
  appearance="outline"
  label="Search" />`,
		inputs: ['freeSolo', 'filterOptions', 'selectOnFocus', 'clearOnBlur', 'handleHomeEndKeys'],
	},
	controlled: {
		overview:
			'Drives every piece of state from the outside. The committed value, the inputValue (text in the box) and the open state are independent two-way models, so external buttons can set or reset each one at will.',
		usage: `<autocomplete
  [options]="films"
  [(value)]="value"
  [(inputValue)]="inputValue"
  [(open)]="open"
  appearance="outline"
  label="Movie" />`,
		inputs: ['value', 'inputValue', 'open'],
	},
	async: {
		overview:
			'Simulates a server-side search: options load after each keystroke. A pass-through filterOptions (passThroughFilter) disables client-side filtering so the server decides the results, and loading toggles the loadingText while requests are in flight.',
		usage: `<autocomplete
  [options]="options()"
  [(value)]="value"
  [filterOptions]="passThroughFilter"
  [loading]="loading()"
  loadingText="Searching…"
  label="Country" />`,
		inputs: ['options', 'filterOptions', 'loading', 'loadingText'],
	},
	grouped: {
		overview:
			'Groups options under sticky headers via groupBy; the options must be pre-sorted by the same key. A projected *ngGroupHeader template customises the header markup and receives the group name and its option count.',
		usage: `<autocomplete
  [options]="films"
  [(value)]="value"
  [groupBy]="groupByLetter"
  appearance="outline"
  label="Movie">
  <div *ngGroupHeader="let letter; count as count">{{ letter }} ({{ count }})</div>
</autocomplete>`,
		inputs: ['options', 'groupBy'],
		templates: ['*ngGroupHeader'],
	},
	virtualized: {
		overview:
			'Single-select over 10,000 options, rendered efficiently with the CDK virtual scroll. virtualize enables it, itemSize sets the row height, and maxVisibleItems controls how many rows are visible before the list scrolls.',
		usage: `<autocomplete
  [options]="options"
  [(value)]="value"
  [virtualize]="true"
  [itemSize]="48"
  appearance="fill"
  label="Option" />`,
		inputs: ['options', 'virtualize', 'itemSize', 'maxVisibleItems'],
	},
	'custom-render': {
		overview:
			'Overrides the rendered slots with projected templates: *ngOption renders a custom option row with query highlighting, *ngPopupIcon and *ngClearIcon swap the toggle and clear icons, and *ngPaper wraps the listbox in a custom popup surface.',
		usage: `<autocomplete
  [options]="films"
  [(value)]="value"
  [getOptionLabel]="getOptionLabel"
  appearance="outline"
  label="Film">
  <div *ngOption="let opt; query as q">…</div>
  <span *ngPopupIcon>▾</span>
  <span *ngClearIcon>×</span>
</autocomplete>`,
		inputs: ['options', 'value', 'getOptionLabel'],
		templates: ['*ngOption', '*ngPaper', '*ngPopupIcon', '*ngClearIcon'],
	},
	playground: {
		overview:
			'Flip every input live to see how the autocomplete reacts. Toggles bind to multiple, freeSolo, loading, readOnly, the auto-behaviours, sizes and appearance, so you can explore the whole surface in one place.',
		usage: `<autocomplete
  [options]="films"
  [(value)]="value"
  [multiple]="multiple()"
  [freeSolo]="freeSolo()"
  [loading]="loading()"
  [appearance]="appearance()"
  [size]="size()"
  label="Movie" />`,
		inputs: [
			'multiple',
			'freeSolo',
			'disableClearable',
			'readOnly',
			'loading',
			'autoHighlight',
			'autoSelect',
			'disableCloseOnSelect',
			'openOnFocus',
			'showCheckboxes',
			'appearance',
			'size',
		],
	},
};

/**
 * Generic per-example page. One route per example (`autocomplete/<slug>`)
 * resolves to this component, which reads the slug from the URL and renders that
 * example using the shared {@link DocPage} Overview / Examples tab shell: a
 * detailed description, a usage snippet, the subset of the API the example
 * demonstrates, and — in the Examples tab — the live {@link ExampleViewer} with
 * the appearance toggle and StackBlitz launch. See {@link EXAMPLE_DETAILS}.
 */
@Component({
	selector: 'ng-kit-autocomplete-example-page',
	imports: [NgComponentOutlet, MatButtonToggleModule, DocPage, CodeBlock, ExampleViewer, RouterLink],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		@if (detail(); as ex) {
			<doc-page [title]="ex.title">
				<p docLead>{{ doc()?.overview ?? ex.description }}</p>

				<div docOverview>
					@if (doc(); as d) {
						<section class="page-section">
							<h2>Usage</h2>
							<p>
								Import <code>AutocompleteComponent</code> and configure it with the inputs below. The full runnable source is on the
								<strong>Examples</strong> tab.
							</p>
							<code-block [code]="d.usage" language="html" />
						</section>
					}
				</div>

				<div docApi>
					<p class="api-summary">
						This example demonstrates the inputs below. See the <a routerLink="/autocomplete/introduction">Autocomplete introduction</a>
						for the complete API — every input, output, content template and filter helper.
					</p>

					@if (demoInputs().length) {
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
								@for (row of demoInputs(); track row.name) {
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

					@if (demoTemplates().length) {
						<h3>Content templates</h3>
						<table class="api-table">
							<thead>
								<tr>
									<th>Directive</th>
									<th>MUI equivalent</th>
									<th>Purpose</th>
								</tr>
							</thead>
							<tbody>
								@for (row of demoTemplates(); track row.name) {
									<tr>
										<td><code>{{ row.name }}</code></td>
										<td><code>{{ row.mui }}</code></td>
										<td>{{ row.purpose }}</td>
									</tr>
								}
							</tbody>
						</table>
					}
				</div>

				<div docExamples>
					<div class="appearance-row">
						<span class="appearance-label">Field appearance</span>
						<mat-button-toggle-group
							class="appearance-toggle"
							[value]="settings.appearance()"
							(change)="settings.appearance.set($event.value)"
							aria-label="Field appearance">
							<mat-button-toggle value="fill">Fill</mat-button-toggle>
							<mat-button-toggle value="outline">Outline</mat-button-toggle>
						</mat-button-toggle-group>
					</div>

					<example-viewer
						[title]="ex.title"
						[description]="ex.description"
						[anchorId]="ex.config.componentName"
						[code]="ex.config.componentTs"
						(openInStackBlitz)="openInStackBlitz(ex.config)">
						<ng-container *ngComponentOutlet="ex.component" />
					</example-viewer>
				</div>
			</doc-page>
		} @else {
			<p>Unknown example.</p>
		}
	`,
	styles: `
		:host {
			display: block;
		}

		.page-section {
			margin-block: 0 2rem;
		}

		.page-section h2 {
			font-size: 1.125rem;
			margin-block-end: 0.75rem;
		}

		.api-summary {
			color: rgba(0, 0, 0, 0.7);
			margin-block: 0 1.25rem;
		}

		h3 {
			font-size: 1rem;
			margin-block: 1.75rem 0.5rem;
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

		.api-table td:first-child code {
			white-space: nowrap;
		}

		.appearance-row {
			display: flex;
			align-items: center;
			gap: 0.75rem;
			margin-block-end: 1.25rem;
		}

		.appearance-label {
			font-size: 0.8125rem;
			font-weight: 600;
			letter-spacing: 0.04em;
			text-transform: uppercase;
			color: rgba(0, 0, 0, 0.6);
		}

		code {
			font-family: 'Roboto Mono', ui-monospace, monospace;
			font-size: 0.85em;
		}
	`,
})
export class AutocompleteExamplePage {
	protected readonly settings = inject(DemoSettings);
	private readonly stackBlitzService = inject(StackBlitzService);
	private readonly route = inject(ActivatedRoute);
	private readonly urlSegments = toSignal(this.route.url, { initialValue: this.route.snapshot.url });

	/** The last URL segment (e.g. `combo-box`) picks the example entry. */
	private readonly slug = computed<string>(() => {
		const segments = this.urlSegments();
		return segments.length ? segments[segments.length - 1].path : '';
	});

	protected readonly detail = computed<ExampleDetail | undefined>(() => EXAMPLE_DETAILS[this.slug()]);

	/** Detailed overview + usage + demonstrated-API for the current example. */
	protected readonly doc = computed<ExampleDoc | undefined>(() => EXAMPLE_DOCS[this.slug()]);

	/** The demonstrated inputs, resolved against the shared Autocomplete metadata. */
	protected readonly demoInputs = computed<AutocompleteInput[]>(() => pickAutocompleteInputs(this.doc()?.inputs ?? []));

	/** The demonstrated content-template directives, if any. */
	protected readonly demoTemplates = computed<AutocompleteTemplate[]>(() => pickAutocompleteTemplates(this.doc()?.templates ?? []));

	protected openInStackBlitz(config: DemoConfig): void {
		this.stackBlitzService.openDemo(config);
	}
}
