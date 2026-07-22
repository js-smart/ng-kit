import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeBlock } from '../../shared/code-block.component';
import { AUTOCOMPLETE_FILTER_CONFIG, AUTOCOMPLETE_INPUTS, AUTOCOMPLETE_OUTPUTS, AUTOCOMPLETE_TEMPLATES } from './autocomplete-api';

/**
 * Autocomplete introduction: the landing page for the Autocomplete group.
 * Carries the overview prose and the full API reference (inputs, outputs,
 * content templates and filter helpers). Each example lives on its own page
 * under `autocomplete/`.
 *
 * The Overview and API content is a close adaptation of MUI's Autocomplete docs
 * (https://mui.com/material-ui/react-autocomplete/) — this component is a 1:1
 * Angular port of MUI's useAutocomplete/Autocomplete.
 */
@Component({
	selector: 'ng-kit-autocomplete-intro-page',
	imports: [CodeBlock],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<article class="doc-article">
			<header class="doc-header">
				<h1 class="doc-title">Autocomplete</h1>
				<p class="doc-lead">
					The autocomplete is a normal text input enhanced by a panel of suggested options. It is a 1:1 Angular port of MUI's
					<code>Autocomplete</code>, composed with Angular Material and driven by a headless signal state machine — filtering, keyboard
					navigation, ARIA, and single/multiple/free-solo selection all behave as in MUI. It implements <code>ControlValueAccessor</code>,
					so it plugs into reactive forms. Pick an example from the navigation to see it live.
				</p>
			</header>

			<p>The widget is useful for two scenarios:</p>
			<ul>
				<li>The value for the textbox must be chosen from a predefined set of allowed values, e.g. a location field must contain a valid location name (a <em>combo box</em>).</li>
				<li>The textbox may contain any arbitrary value, but it is advantageous to suggest possible values, e.g. a search field (<em>free solo</em>).</li>
			</ul>

			<h3>Basic usage</h3>
			<p>
				Import <code>AutocompleteComponent</code>, pass an <code>options</code> array, map each option to its display string with
				<code>getOptionLabel</code>, and bind the selection with <code>[(value)]</code>. Options can be strings or objects; when an option
				object has a <code>label</code> property it is used automatically.
			</p>
			<code-block [code]="basicCode" language="typescript" />

			<h3>Combo box</h3>
			<p>
				The value must be chosen from a predefined set of allowed values. Selecting an option updates <code>value</code>; the
				<strong>Combo box</strong> and <strong>Country select</strong> examples show single-select over string and object option lists.
			</p>

			<h3>Controlled states</h3>
			<p>
				The component has two states that can be controlled independently: the <code>value</code> (the option the user has committed, via
				Enter or click) and the <code>inputValue</code> (the text shown in the box). They are deliberately independent, as in MUI — bind
				<code>[(value)]</code>, <code>[(inputValue)]</code> and <code>[(open)]</code> to drive them from the outside (see the
				<strong>Controlled</strong> example).
			</p>

			<h3>Free solo</h3>
			<p>
				Set <code>[freeSolo]="true"</code> to allow arbitrary values in the textbox that are not bound to the options — ideal for a search
				box. Combine it with <code>selectOnFocus</code>, <code>clearOnBlur</code> and <code>handleHomeEndKeys</code> for a "creatable"
				experience that lets users add new values (see the <strong>Free solo</strong> example).
			</p>

			<h3>Grouped</h3>
			<p>
				Provide <code>groupBy</code> to group options under sticky headers; options must be sorted by the same grouping key. Customise the
				header markup by projecting a <code>*ngGroupHeader</code> template (see the <strong>Grouped</strong> example).
			</p>

			<h3>Disabled options</h3>
			<p>Use <code>getOptionDisabled</code> to prevent selection of specific options — useful for unavailable time slots or restricted choices.</p>

			<h3>Asynchronous requests</h3>
			<p>
				The component supports both "load on open" and "search as you type". For server-side filtering, pass a pass-through
				<code>filterOptions</code> (e.g. <code>passThroughFilter</code>) so the component does not filter again, and toggle
				<code>loading</code> to show <code>loadingText</code> while requests are in flight (see the <strong>Asynchronous requests</strong>
				example).
			</p>

			<h3>Multiple values</h3>
			<p>
				With <code>[multiple]="true"</code> the user can select several values, rendered as removable Material chips. Use
				<code>filterSelectedOptions</code> to hide already-selected options, and <code>showCheckboxes</code> for a checkbox listbox that
				stays open after each pick (see the <strong>Checkboxes</strong> example).
			</p>

			<h3>Fixed options</h3>
			<p>Pass <code>fixedOptions</code> to lock certain chips so they cannot be removed from the selection (see the <strong>Fixed tags</strong> example).</p>

			<h3>Limit tags</h3>
			<p>
				Use <code>limitTags</code> to cap the number of chips shown when the field is not focused; overflow is summarised as
				<code>+N</code> (customisable via <code>getLimitTagsText</code>).
			</p>

			<h3>Sizes &amp; appearance</h3>
			<p>
				<code>size</code> switches between <code>'medium'</code> and a denser <code>'small'</code> field, and <code>appearance</code>
				chooses the Material form-field style (<code>'fill'</code> or <code>'outline'</code>). See the <strong>Sizes &amp; appearances</strong> example.
			</p>

			<h3>Custom rendering</h3>
			<p>
				Every slot is overridable via projected templates: <code>*ngOption</code> (MUI's <code>renderOption</code>, with a
				<code>query</code> for highlighting), <code>*ngValue</code> (<code>renderValue</code>), <code>*ngGroupHeader</code>
				(<code>renderGroup</code>), plus <code>*ngPaper</code>, <code>*ngEmpty</code>, <code>*ngLoading</code>, <code>*ngPopupIcon</code>
				and <code>*ngClearIcon</code>. The <strong>Custom rendering</strong> example shows query highlighting, custom icons and a custom
				paper surface.
			</p>

			<h3>Custom filter</h3>
			<p>
				Use <code>createFilterOptions</code> to tune the default matching: <code>matchFrom</code> (<code>'any' | 'start'</code>),
				<code>stringify</code>, <code>trim</code>, <code>ignoreCase</code>, <code>ignoreAccents</code> and <code>limit</code>. Pass the
				result to <code>filterOptions</code>. For fully custom (e.g. fuzzy) matching, provide your own <code>filterOptions</code> function.
			</p>

			<h3>Virtualization</h3>
			<p>
				Set <code>[virtualize]="true"</code> to render very large option lists efficiently with the CDK virtual scroll; tune
				<code>itemSize</code> and <code>maxVisibleItems</code>. The <strong>Virtualized</strong> example renders 10,000 options.
			</p>

			<h3>Events</h3>
			<p>
				Listen to <code>valueChanged</code> (with a <code>reason</code>: <code>createOption</code>, <code>selectOption</code>,
				<code>removeOption</code>, <code>clear</code>, <code>blur</code>), <code>inputChanged</code>, <code>opened</code>,
				<code>closed</code> and <code>highlightChanged</code>. Keyboard handling follows the WAI-ARIA combobox pattern.
			</p>

			<h3>Accessibility</h3>
			<p>
				The component implements the WAI-ARIA combobox pattern (<code>role="combobox"</code>/<code>listbox</code>/<code>option</code>,
				<code>aria-activedescendant</code>, full keyboard support). Always provide a <code>label</code> or <code>ariaLabel</code> for a
				compliant, labelled control.
			</p>

			<h2 class="doc-api-heading">API</h2>

			<h3>Selectors</h3>
			<p><code>autocomplete</code>, <code>lib-autocomplete</code></p>

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
					@for (input of inputs; track input.name) {
						<tr>
							<td><code>{{ input.name }}</code></td>
							<td><code>{{ input.type }}</code></td>
							<td>{{ input.default }}</td>
							<td>{{ input.description }}</td>
						</tr>
					}
				</tbody>
			</table>

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
					@for (output of outputs; track output.name) {
						<tr>
							<td><code>{{ output.name }}</code></td>
							<td><code>{{ output.payload }}</code></td>
							<td>{{ output.description }}</td>
						</tr>
					}
				</tbody>
			</table>

			<h3>Content template directives</h3>
			<p>Project a template to override a slot; each receives a typed context. These map to MUI's render props and slots.</p>
			<table class="api-table">
				<thead>
					<tr>
						<th>Directive</th>
						<th>MUI equivalent</th>
						<th>Context / purpose</th>
					</tr>
				</thead>
				<tbody>
					@for (tpl of templates; track tpl.name) {
						<tr>
							<td><code>{{ tpl.name }}</code></td>
							<td><code>{{ tpl.mui }}</code></td>
							<td>{{ tpl.purpose }}</td>
						</tr>
					}
				</tbody>
			</table>

			<h3>Filter helpers</h3>
			<p>
				<code>createFilterOptions(config?)</code> builds a <code>filterOptions</code> function; <code>defaultFilterOptions</code> is the
				default, and <code>passThroughFilter</code> disables client-side filtering (for server-side search). Config options:
			</p>
			<table class="api-table">
				<thead>
					<tr>
						<th>Option</th>
						<th>Type</th>
						<th>Default</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					@for (opt of filterOptionsConfig; track opt.name) {
						<tr>
							<td><code>{{ opt.name }}</code></td>
							<td><code>{{ opt.type }}</code></td>
							<td>{{ opt.default }}</td>
							<td>{{ opt.description }}</td>
						</tr>
					}
				</tbody>
			</table>

			<p class="api-note">
				Per-element class/attribute overrides are available via <code>slotProps</code> (mirroring MUI's <code>slotProps</code>) for the
				<code>root</code>, <code>input</code>, <code>listbox</code>, <code>paper</code>, <code>clearIndicator</code> and
				<code>popupIndicator</code> slots. The headless <code>NgAutocompleteState</code> and all types are exported for advanced use.
			</p>
		</article>
	`,
	styles: `
		:host {
			display: block;
		}

		.doc-header {
			margin-block-end: 1.5rem;
		}

		.doc-title {
			margin-block-end: 0.5rem;
		}

		.doc-lead {
			color: var(--gallery-text-muted);
		}

		.doc-api-heading {
			margin-block-start: 3.5rem;
			padding-block-start: 1.5rem;
			border-block-start: 2px solid var(--gallery-border);
		}

		h3 {
			margin-block: 1.75rem 0.5rem;
		}
	`,
})
export class AutocompleteIntroPage {
	protected readonly basicCode = `import { Component, signal } from '@angular/core';
import { AutocompleteComponent } from '@js-smart/ng-kit';

@Component({
	selector: 'app-demo',
	imports: [AutocompleteComponent],
	template: \`
		<autocomplete [options]="films" [(value)]="value" label="Movie" placeholder="Pick a film" />
	\`,
})
export class DemoComponent {
	protected readonly films = ['The Godfather', 'Pulp Fiction', 'Inception'];
	protected readonly value = signal<string | null>(null);
}`;

	protected readonly inputs = AUTOCOMPLETE_INPUTS;
	protected readonly outputs = AUTOCOMPLETE_OUTPUTS;
	protected readonly templates = AUTOCOMPLETE_TEMPLATES;
	protected readonly filterOptionsConfig = AUTOCOMPLETE_FILTER_CONFIG;
}
