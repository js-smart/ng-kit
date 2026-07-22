import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeBlock } from '../../shared/code-block.component';

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
			color: rgba(0, 0, 0, 0.7);
		}

		.doc-api-heading {
			margin-block-start: 3.5rem;
			padding-block-start: 1.5rem;
			border-block-start: 2px solid rgba(0, 0, 0, 0.08);
		}

		h3 {
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

	protected readonly inputs = [
		{ name: 'options', type: 'readonly T[]', default: '— (required)', description: 'The list of options shown in the panel.' },
		{ name: 'value', type: 'T | T[] | null', default: 'null', description: 'Two-way selected value (model). An array when multiple.' },
		{ name: 'inputValue', type: 'string', default: "''", description: 'Two-way text shown in the box (model); independent of value.' },
		{ name: 'open', type: 'boolean', default: 'false', description: 'Two-way popup open state (model).' },
		{ name: 'getOptionLabel', type: '(option: T) => string', default: 'option.label ?? String(option)', description: 'Maps an option to its display string.' },
		{ name: 'getOptionKey', type: '(option: T) => string | number', default: 'getOptionLabel', description: 'Stable key for an option (trackBy).' },
		{ name: 'getOptionDisabled', type: '(option: T) => boolean', default: '() => false', description: 'Marks individual options as disabled.' },
		{ name: 'isOptionEqualToValue', type: '(a: T, b: T) => boolean', default: '===', description: 'Equality used to match a value against an option.' },
		{ name: 'groupBy', type: '((option: T) => string) | null', default: 'null', description: 'Groups options under headers; options must be pre-sorted by key.' },
		{ name: 'filterOptions', type: 'FilterOptionsFn<T>', default: 'createFilterOptions()', description: 'Custom filtering function. Pass passThroughFilter for server-side search.' },
		{ name: 'multiple', type: 'boolean', default: 'false', description: 'Allow selecting several values, rendered as chips.' },
		{ name: 'freeSolo', type: 'boolean', default: 'false', description: 'Allow arbitrary values not bound to the options.' },
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the control (also set via reactive-forms).' },
		{ name: 'readOnly', type: 'boolean', default: 'false', description: 'Make the control read-only.' },
		{ name: 'loading', type: 'boolean', default: 'false', description: 'Show a loading indicator and loadingText.' },
		{ name: 'required', type: 'boolean', default: 'false', description: 'Marks the control required (aria-required).' },
		{ name: 'invalid', type: 'boolean', default: 'false', description: 'Marks the control invalid (aria-invalid).' },
		{ name: 'autoComplete', type: 'boolean', default: 'false', description: 'Inline-complete the highlighted label after the cursor.' },
		{ name: 'autoHighlight', type: 'boolean', default: 'false', description: 'Automatically highlight the first option.' },
		{ name: 'autoSelect', type: 'boolean', default: 'false', description: 'Select the highlighted option on blur.' },
		{ name: 'blurOnSelect', type: "boolean | 'mouse' | 'touch'", default: 'false', description: 'Blur the input after selecting.' },
		{ name: 'clearOnBlur', type: 'boolean', default: '!freeSolo', description: 'Clear the input text on blur when there is no value.' },
		{ name: 'clearOnEscape', type: 'boolean', default: 'false', description: 'Clear the value when Escape is pressed.' },
		{ name: 'disableClearable', type: 'boolean', default: 'false', description: 'Hide the clear button / prevent clearing.' },
		{ name: 'disableCloseOnSelect', type: 'boolean', default: 'false', description: 'Keep the popup open after a selection.' },
		{ name: 'disabledItemsFocusable', type: 'boolean', default: 'false', description: 'Allow keyboard focus to land on disabled options.' },
		{ name: 'disableListWrap', type: 'boolean', default: 'false', description: 'Prevent wrapping when navigating the listbox.' },
		{ name: 'disablePortal', type: 'boolean', default: 'false', description: 'Render the popup inline instead of in a CDK overlay.' },
		{ name: 'filterSelectedOptions', type: 'boolean', default: 'false', description: 'Hide already-selected options from the listbox.' },
		{ name: 'handleHomeEndKeys', type: 'boolean', default: '!freeSolo', description: 'Move highlight with Home/End keys.' },
		{ name: 'includeInputInList', type: 'boolean', default: 'false', description: 'Allow the highlight to move back to the input.' },
		{ name: 'openOnFocus', type: 'boolean', default: 'false', description: 'Open the popup as soon as the input is focused.' },
		{ name: 'resetHighlightOnMouseLeave', type: 'boolean', default: 'false', description: 'Reset the highlight when the pointer leaves the list.' },
		{ name: 'selectOnFocus', type: 'boolean', default: '!freeSolo', description: 'Select the input text on focus.' },
		{ name: 'fixedOptions', type: 'readonly T[]', default: '[]', description: 'Values that cannot be removed while multiple.' },
		{ name: 'label', type: 'string | null', default: 'null', description: 'Field label (mat-label).' },
		{ name: 'ariaLabel', type: 'string | null', default: 'null', description: 'Accessible name when no visible label is used.' },
		{ name: 'placeholder', type: 'string | null', default: 'null', description: 'Input placeholder text.' },
		{ name: 'size', type: "'small' | 'medium'", default: "'medium'", description: 'Field density.' },
		{ name: 'appearance', type: "'fill' | 'outline'", default: "'fill'", description: 'Material form-field appearance.' },
		{ name: 'fullWidth', type: 'boolean', default: 'false', description: 'Stretch the field to fill its container.' },
		{ name: 'limitTags', type: 'number', default: '-1', description: 'Max chips shown when unfocused (-1 = all).' },
		{ name: 'getLimitTagsText', type: '(more: number) => string', default: '(more) => `+${more}`', description: 'Label for the truncated-tags summary.' },
		{ name: 'showCheckboxes', type: 'boolean', default: 'false', description: 'Render a checkbox in front of each option (multiple).' },
		{ name: 'noOptionsText', type: 'string', default: "'No options'", description: 'Message shown when nothing matches.' },
		{ name: 'loadingText', type: 'string', default: "'Loading…'", description: 'Message shown while loading.' },
		{ name: 'clearText', type: 'string', default: "'Clear'", description: 'Accessible label for the clear button.' },
		{ name: 'openText', type: 'string', default: "'Open'", description: 'Accessible label for the toggle button (closed).' },
		{ name: 'closeText', type: 'string', default: "'Close'", description: 'Accessible label for the toggle button (open).' },
		{ name: 'forcePopupIcon', type: "boolean | 'auto'", default: "'auto'", description: 'Force the dropdown toggle icon on/off.' },
		{ name: 'virtualize', type: 'boolean', default: 'false', description: 'Virtual-scroll the option list (CDK).' },
		{ name: 'itemSize', type: 'number', default: '40', description: 'Row height (px) used by virtual scroll.' },
		{ name: 'maxVisibleItems', type: 'number', default: '8', description: 'Max rows visible before the list scrolls.' },
		{ name: 'slotProps', type: 'NgAutocompleteSlotProps', default: '{}', description: 'Per-slot class/attribute pass-through.' },
		{ name: 'id', type: 'string | null', default: 'null', description: 'Base id used to derive element ids (accessibility).' },
	];

	protected readonly outputs = [
		{ name: 'valueChanged', payload: '{ value; reason; option? }', description: 'Selected value changed. reason: createOption | selectOption | removeOption | clear | blur.' },
		{ name: 'inputChanged', payload: '{ value: string; reason }', description: 'Input text changed. reason: input | reset | clear | blur | selectOption | removeOption.' },
		{ name: 'opened', payload: 'OpenReason', description: 'Popup opened. reason: toggleInput | focus | input | keyboard.' },
		{ name: 'closed', payload: 'CloseReason', description: 'Popup closed. reason: toggleInput | escape | selectOption | removeOption | blur.' },
		{ name: 'highlightChanged', payload: '{ option: T | null; reason }', description: 'Highlighted option changed. reason: keyboard | mouse | auto | touch.' },
	];

	protected readonly templates = [
		{ name: '*ngOption', mui: 'renderOption', purpose: 'Custom option row. Context: $implicit (option), option, highlighted, selected, query.' },
		{ name: '*ngValue', mui: 'renderValue', purpose: 'Custom chip / selected-value rendering. Context: $implicit, index, label, disabled, fixed, focused, remove().' },
		{ name: '*ngGroupHeader', mui: 'renderGroup', purpose: 'Custom group header. Context: $implicit (group name), count.' },
		{ name: '*ngPaper', mui: 'slots.paper', purpose: 'Custom popup surface wrapping the listbox. Context: $implicit (listbox template).' },
		{ name: '*ngEmpty', mui: 'noOptionsText', purpose: 'Custom "no options" content.' },
		{ name: '*ngLoading', mui: 'loadingText', purpose: 'Custom loading content.' },
		{ name: '*ngPopupIcon', mui: 'popupIcon', purpose: 'Custom dropdown toggle icon.' },
		{ name: '*ngClearIcon', mui: 'clearIcon', purpose: 'Custom clear-button icon.' },
	];

	protected readonly filterOptionsConfig = [
		{ name: 'matchFrom', type: "'any' | 'start'", default: "'any'", description: 'Match anywhere in the string, or only at the start.' },
		{ name: 'stringify', type: '(option: T) => string', default: 'getOptionLabel', description: 'Turn an option into the string that gets matched.' },
		{ name: 'ignoreCase', type: 'boolean', default: 'true', description: 'Lowercase both sides before comparing.' },
		{ name: 'ignoreAccents', type: 'boolean', default: 'true', description: 'Strip diacritics before comparing.' },
		{ name: 'trim', type: 'boolean', default: 'false', description: 'Trim trailing whitespace off the query.' },
		{ name: 'limit', type: 'number | null', default: 'null', description: 'Cap the number of suggestions returned.' },
	];
}
