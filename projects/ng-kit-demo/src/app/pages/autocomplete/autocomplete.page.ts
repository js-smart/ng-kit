import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { DocPage } from '../../shared/doc-page.component';
import { AsyncExample } from './examples/async.example';
import { ComboBoxExample } from './examples/combo-box.example';
import { ControlledExample } from './examples/controlled.example';
import { CountrySelectExample } from './examples/country-select.example';
import { CustomRenderExample } from './examples/custom-render.example';
import { DisabledOptionsExample } from './examples/disabled-options.example';
import { FixedTagsExample } from './examples/fixed-tags.example';
import { FreeSoloExample } from './examples/free-solo.example';
import { GroupedExample } from './examples/grouped.example';
import { MultipleCheckboxesExample } from './examples/multiple-checkboxes.example';
import { PlaygroundExample } from './examples/playground.example';
import { SizesAppearancesExample } from './examples/sizes-appearances.example';
import { VirtualizedExample } from './examples/virtualized.example';

interface ExampleEntry {
	title: string;
	description: string;
	component: Type<unknown>;
}

interface ExampleGroup {
	label: string;
	examples: ExampleEntry[];
}

/**
 * Autocomplete reference page. Overview / API / Examples tabs (via DocPage);
 * the Examples tab groups every ported example into a Material accordion — expand
 * a panel to view the live demo (rendered lazily) and its source.
 */
@Component({
	selector: 'ng-kit-autocomplete-page',
	imports: [DocPage, NgComponentOutlet, MatExpansionModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<doc-page title="Autocomplete">
			<p docLead>
				Accessible, signal-based autocomplete/combobox composed with Angular Material. The field chrome is Material; filtering, keyboard
				navigation, ARIA, and single/multiple/free-solo selection are driven by a headless signal state machine. Implements
				<code>ControlValueAccessor</code>, so it plugs into reactive forms.
			</p>

			<div docOverview>
				<p>
					Import <code>AutocompleteComponent</code> and pass an <code>options</code> array. Use <code>getOptionLabel</code> to map an option
					to its display string, bind the selection with <code>[(value)]</code>, and listen to <code>valueChanged</code> for selection
					events. Every capability has a live example in the <strong>Examples</strong> tab — expand a panel to try it and read its source.
				</p>
			</div>

			<div docApi>
				<h3>Selectors</h3>
				<p><code>autocomplete</code>, <code>lib-autocomplete</code></p>

				<h3>Key inputs</h3>
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
							<td><code>options</code></td>
							<td><code>readonly T[]</code> (required)</td>
							<td>—</td>
							<td>Options to display in the dropdown</td>
						</tr>
						<tr>
							<td><code>value</code></td>
							<td><code>T | T[] | null</code> (model)</td>
							<td><code>null</code></td>
							<td>Two-way selected value (<code>T[]</code> when multiple)</td>
						</tr>
						<tr>
							<td><code>getOptionLabel</code></td>
							<td><code>(option: T) =&gt; string</code></td>
							<td>label / <code>String</code></td>
							<td>Maps an option to its display string</td>
						</tr>
						<tr>
							<td><code>multiple</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Render selected values as removable chips</td>
						</tr>
						<tr>
							<td><code>loading</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Show a loading indicator instead of options</td>
						</tr>
						<tr>
							<td><code>appearance</code></td>
							<td><code>'fill' | 'outline'</code></td>
							<td><code>'fill'</code></td>
							<td>Material form-field appearance</td>
						</tr>
					</tbody>
				</table>
				<p class="api-note">
					Plus many MUI-parity flags (<code>freeSolo</code>, <code>groupBy</code>, <code>virtualize</code>, <code>autoHighlight</code>,
					<code>disableClearable</code>, …) and content-projection template directives
					(<code>*ngOption</code>, <code>*ngValue</code>, <code>*ngGroupHeader</code>, <code>*ngEmpty</code>, …). See the exported types.
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
							<td><code>valueChanged</code></td>
							<td><code>{{ '{' }} value; reason; option? {{ '}' }}</code></td>
							<td>Selected value changed</td>
						</tr>
						<tr>
							<td><code>inputChanged</code></td>
							<td><code>{{ '{' }} value: string; reason {{ '}' }}</code></td>
							<td>Input text changed</td>
						</tr>
						<tr>
							<td><code>opened</code> / <code>closed</code></td>
							<td><code>OpenReason</code> / <code>CloseReason</code></td>
							<td>Popup opened / closed</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div docExamples>
				@for (group of groups; track group.label) {
					<h3 class="group-heading">{{ group.label }}</h3>
					<mat-accordion class="example-accordion" multi>
						@for (ex of group.examples; track ex.title) {
							<mat-expansion-panel>
								<mat-expansion-panel-header>
									<mat-panel-title>{{ ex.title }}</mat-panel-title>
									<mat-panel-description>{{ ex.description }}</mat-panel-description>
								</mat-expansion-panel-header>
								<ng-template matExpansionPanelContent>
									<ng-container *ngComponentOutlet="ex.component" />
								</ng-template>
							</mat-expansion-panel>
						}
					</mat-accordion>
				}
			</div>
		</doc-page>
	`,
	styles: `
		:host {
			display: block;
		}

		.group-heading {
			margin-block: 1.5rem 0.5rem;
			font-size: 0.8125rem;
			font-weight: 600;
			letter-spacing: 0.06em;
			text-transform: uppercase;
			color: rgba(0, 0, 0, 0.6);
		}

		.group-heading:first-child {
			margin-block-start: 0;
		}

		.example-accordion {
			display: block;
			margin-block-end: 0.5rem;
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
export class AutocompletePage {
	protected readonly groups: ExampleGroup[] = [
		{
			label: 'Single-select',
			examples: [
				{ title: 'Combo box', description: 'Basic single-select with a filtered list of options.', component: ComboBoxExample },
				{ title: 'Country select', description: 'Custom option template with a flag and dial code.', component: CountrySelectExample },
				{ title: 'Disabled options', description: 'Every 3rd option is disabled and cannot be selected.', component: DisabledOptionsExample },
				{ title: 'Sizes & appearances', description: 'Every combination of size and appearance.', component: SizesAppearancesExample },
			],
		},
		{
			label: 'Multiple',
			examples: [
				{ title: 'Checkboxes', description: 'Multi-select with checkboxes; popup stays open after each pick.', component: MultipleCheckboxesExample },
				{ title: 'Fixed tags', description: "Multi-select with fixed chips that can't be removed, plus a “+n more” summary.", component: FixedTagsExample },
			],
		},
		{
			label: 'Behaviour',
			examples: [
				{ title: 'Free solo', description: "Type anything — the raw text becomes the value, even if it isn't in the list.", component: FreeSoloExample },
				{ title: 'Controlled', description: 'Every piece of state is owned by external signals and outside buttons.', component: ControlledExample },
				{ title: 'Asynchronous requests', description: 'Simulates a server-side search: options load after each keystroke.', component: AsyncExample },
				{ title: 'Grouped', description: 'Options grouped by their first letter via a pre-sorted group key.', component: GroupedExample },
			],
		},
		{
			label: 'Advanced',
			examples: [
				{ title: 'Virtualized (10,000 options)', description: 'Single-select over 10,000 options, rendered virtually.', component: VirtualizedExample },
				{ title: 'Custom rendering', description: 'Custom option markup with query highlighting, custom icons, and a custom paper surface.', component: CustomRenderExample },
				{ title: 'Playground', description: 'Flip every input live to see how the autocomplete reacts.', component: PlaygroundExample },
			],
		},
	];
}
