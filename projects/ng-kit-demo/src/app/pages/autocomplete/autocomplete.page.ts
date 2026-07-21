import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AutocompleteComponent } from '@js-smart/ng-kit';
import { DemoCard } from '../../shared/demo-card.component';
import { AutocompleteDemoComponent } from '../../autocomplete-demo/autocomplete-demo.component';

const BASIC_CODE = `import { Component, signal } from '@angular/core';
import { AutocompleteComponent } from '@js-smart/ng-kit';

@Component({
	selector: 'app-basic',
	imports: [AutocompleteComponent],
	template: \`
		<autocomplete [options]="fruits" [(value)]="value" label="Fruit" placeholder="Pick one" />
		<p>Selected: {{ value() ?? '—' }}</p>
	\`,
})
export class BasicExample {
	protected readonly fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
	protected readonly value = signal<string | null>(null);
}`;

/**
 * Reference page for the gallery pattern: a lead paragraph, an overview
 * section, one or more live examples wrapped in <demo-card>, and an API
 * reference. Fan-out agents mirror this structure for every other page.
 */
@Component({
	selector: 'ng-kit-autocomplete-page',
	imports: [AutocompleteComponent, DemoCard, AutocompleteDemoComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<h1 class="page-title">Autocomplete</h1>
		<p class="page-lead">
			Accessible, signal-based autocomplete/combobox composed with Angular Material. The field chrome is Material; filtering, keyboard
			navigation, ARIA, and single/multiple/free-solo selection are driven by a headless signal state machine. Implements
			<code>ControlValueAccessor</code>, so it plugs into reactive forms.
		</p>

		<section class="page-section">
			<h2>Overview</h2>
			<p>
				Import <code>AutocompleteComponent</code> and pass an <code>options</code> array. Use <code>getOptionLabel</code> to map an option to
				its display string, bind the selection with <code>[(value)]</code>, and listen to <code>valueChanged</code> for selection events.
			</p>
		</section>

		<demo-card
			title="Basic"
			description="Single-select combo box over a list of strings."
			[props]="['options', 'value', 'label', 'placeholder']"
			[code]="basicCode">
			<autocomplete [options]="fruits" [(value)]="basicValue" label="Fruit" placeholder="Pick one" />
			<p class="readout">Selected: {{ basicValue() ?? '—' }}</p>
		</demo-card>

		<demo-card
			title="Objects, loading &amp; disabled"
			description="Object options with a custom label, an async loading state, and a reactive-forms disabled control.">
			<ng-kit-autocomplete-demo />
		</demo-card>

		<section class="page-section api">
			<h2>API reference</h2>
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
export class AutocompletePage {
	protected readonly basicCode = BASIC_CODE;
	protected readonly fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
	protected readonly basicValue = signal<string | null>(null);
}
