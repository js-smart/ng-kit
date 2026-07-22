import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocPage } from '../../shared/doc-page.component';
import { DemoCard } from '../../shared/demo-card.component';
import { AutocompleteSuffixDemoComponent } from '../../autocomplete-suffix-demo/autocomplete-suffix-demo.component';
import { buildDemoConfig } from '../../shared/build-demo-config';

const SUFFIX_CODE = `import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AutocompleteSuffixDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-clear-dropdown-suffix',
	imports: [ReactiveFormsModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule, AutocompleteSuffixDirective],
	template: \`
		<mat-form-field appearance="outline">
			<mat-label>City</mat-label>
			<input matInput type="text" [matAutocomplete]="auto" [formControl]="city" autocompleteSuffix />
			<mat-autocomplete #auto="matAutocomplete">
				@for (name of cities; track name) {
					<mat-option [value]="name">{{ name }}</mat-option>
				}
			</mat-autocomplete>
		</mat-form-field>
	\`,
})
export class ClearDropdownSuffixComponent {
	protected readonly cities = ['New York', 'Boston', 'Washington DC'];
	protected readonly city = new FormControl<string | null>(null);
}`;

/** StackBlitz config for the Clear + dropdown suffix card — class name matches PascalCase(componentName). */
const suffixConfig = buildDemoConfig({
	title: 'Clear + dropdown suffix',
	componentName: 'clear-dropdown-suffix',
	code: SUFFIX_CODE,
	requiredImports: ['BrowserAnimationsModule'],
});

/**
 * Gallery page for the {@link AutocompleteSuffixDirective}: documents the single
 * directive that renders clear + dropdown-toggle icon buttons on a Material
 * autocomplete input, wrapping the existing suffix demo as a live example.
 */
@Component({
	selector: 'ng-kit-autocomplete-suffix-page',
	imports: [DocPage, DemoCard, AutocompleteSuffixDemoComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<doc-page title="Autocomplete Suffix">
			<p docLead>
				A single directive that adds a clear button and a dropdown-toggle button to the suffix of a Material autocomplete input. Apply
				<code>autocompleteSuffix</code> straight to the <code>input</code> element — no anchor directive or separate suffix component required.
			</p>

			<div docOverview>
				<p>
					<code>AutocompleteSuffixDirective</code> targets an <code>input</code> that carries both <code>matAutocomplete</code> and
					<code>autocompleteSuffix</code>. It injects the <code>MatAutocompleteTrigger</code> from the host input and renders two icon buttons
					into the field's suffix slot:
				</p>
				<ul>
					<li>
						A <strong>clear button</strong> (<code>close</code> icon) that empties the input, resets the bound form control to
						<code>null</code>, marks it touched, closes the panel, and restores focus. It is hidden while the input is empty and appears once a
						value is present.
					</li>
					<li>
						A <strong>dropdown-toggle button</strong> that opens or closes the autocomplete panel. Its icon flips between
						<code>arrow_drop_down</code> and <code>arrow_drop_up</code> to reflect the open state.
					</li>
				</ul>
				<p>
					When the directive is applied to an input with an <code>NgControl</code> (for example <code>formControlName</code>), it tracks the
					control's value changes to keep the clear button's visibility in sync. On open, the currently selected option is scrolled into view.
					The directive works with both plain string options and object options paired with a <code>displayWith</code> function.
				</p>
				<p>
					Because it wires directly into the Material trigger and the field's icon-suffix container, it composes with a standard
					<code>mat-form-field</code> and requires no extra markup beyond the attribute itself.
				</p>
			</div>

			<div docExamples>
				<demo-card
					title="Clear + dropdown suffix"
					anchorId="clear-dropdown-suffix"
					description="A single autocompleteSuffix directive on the input adds clear and dropdown-toggle icons, shown over object and string options."
					[props]="['autocompleteSuffix', 'matAutocomplete', 'formControlName']"
					[code]="suffixCode"
					[stackblitz]="suffixConfig">
					<ng-kit-autocomplete-suffix-demo />
				</demo-card>
			</div>

			<div docApi>
				<h3>Selector</h3>
				<p><code>input[matAutocomplete][autocompleteSuffix]</code></p>
				<p class="api-note">
					The directive matches only when applied to an <code>input</code> that also has the <code>matAutocomplete</code> binding. It exposes no
					inputs or outputs — its behavior is driven entirely by the host input, its <code>MatAutocompleteTrigger</code>, and the associated
					form control.
				</p>

				<h3>Behavior</h3>
				<table class="api-table">
					<thead>
						<tr>
							<th>Element</th>
							<th>Icon</th>
							<th>Behavior</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Clear button</td>
							<td><code>close</code></td>
							<td>
								Clears the input value, sets the bound control to <code>null</code>, marks it touched, closes the panel, and refocuses the
								input. Hidden while the field is empty.
							</td>
						</tr>
						<tr>
							<td>Dropdown-toggle button</td>
							<td><code>arrow_drop_down</code> / <code>arrow_drop_up</code></td>
							<td>Opens or closes the autocomplete panel; the icon reflects the current open state.</td>
						</tr>
					</tbody>
				</table>

				<h3>Related components</h3>
				<table class="api-table">
					<thead>
						<tr>
							<th>Component</th>
							<th>Selector</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>AutocompleteClearButtonComponent</code></td>
							<td><code>autocomplete-clear-button</code></td>
							<td>Icon button emitting <code>clicked</code>; rendered by the directive to clear the value.</td>
						</tr>
						<tr>
							<td><code>AutocompleteDropdownButtonComponent</code></td>
							<td><code>autocomplete-dropdown-button</code></td>
							<td>Icon button with an <code>expanded</code> signal and <code>clicked</code> output; toggles the panel.</td>
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
			color: rgba(0, 0, 0, 0.7);
			margin-block-end: 2rem;
		}

		.page-section {
			margin-block: 2rem;
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
export class AutocompleteSuffixPage {
	protected readonly suffixCode = SUFFIX_CODE;
	protected readonly suffixConfig = suffixConfig;
}
