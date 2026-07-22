import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Type, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DemoSettings } from '../../shared/demo-settings';
import { ExampleViewer } from '../../shared/example-viewer.component';
import { StackBlitzService } from '../../services/stackblitz.service';
import { DemoConfig } from '../../types/demo-config';
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

/**
 * Generic per-example page. One route per example (`autocomplete/<slug>`)
 * resolves to this component, which reads the slug from the URL and renders that
 * example in an {@link ExampleViewer} with the shared appearance toggle and
 * StackBlitz launch. See {@link EXAMPLE_DETAILS}.
 */
@Component({
	selector: 'ng-kit-autocomplete-example-page',
	imports: [NgComponentOutlet, MatButtonToggleModule, ExampleViewer, RouterLink],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		@if (detail(); as ex) {
			<article class="example-page">
				<div class="appearance-row">
					<span class="appearance-label">Field appearance</span>
					<mat-button-toggle-group class="appearance-toggle" [value]="settings.appearance()" (change)="settings.appearance.set($event.value)" aria-label="Field appearance">
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

				<p class="api-link">
					See the <a routerLink="/autocomplete/introduction">Autocomplete introduction</a> for the full API reference.
				</p>
			</article>
		} @else {
			<p>Unknown example.</p>
		}
	`,
	styles: `
		:host {
			display: block;
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

		.api-link {
			margin-block-start: 1rem;
			color: rgba(0, 0, 0, 0.7);
		}
	`,
})
export class AutocompleteExamplePage {
	protected readonly settings = inject(DemoSettings);
	private readonly stackBlitzService = inject(StackBlitzService);
	private readonly route = inject(ActivatedRoute);
	private readonly urlSegments = toSignal(this.route.url, { initialValue: this.route.snapshot.url });

	/** The last URL segment (e.g. `combo-box`) picks the example entry. */
	protected readonly detail = computed<ExampleDetail | undefined>(() => {
		const segments = this.urlSegments();
		const slug = segments.length ? segments[segments.length - 1].path : '';
		return EXAMPLE_DETAILS[slug];
	});

	protected openInStackBlitz(config: DemoConfig): void {
		this.stackBlitzService.openDemo(config);
	}
}
