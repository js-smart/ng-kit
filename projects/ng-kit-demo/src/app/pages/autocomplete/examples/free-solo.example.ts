import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CodeBlock } from '../../../shared/code-block.component';
import {
	AutocompleteComponent,
	createFilterOptions,
	type FilterOptionsFn,
	type NgAutocompleteChange,
} from '@js-smart/ng-kit';

const FILMS = [
	'The Shawshank Redemption',
	'The Godfather',
	'The Dark Knight',
	'Pulp Fiction',
	'Inception',
	'Interstellar',
	'Parasite',
];

const CREATE_PREFIX = 'Add "';
const CREATE_SUFFIX = '"';

const baseFilmFilter = createFilterOptions<string>();

@Component({
	selector: 'ng-kit-free-solo-example',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CodeBlock, AutocompleteComponent],
	template: `
		<div class="demo-row">
			<div class="demo-block">
				<autocomplete
					[options]="films"
					[(value)]="freeSoloValue"
					[freeSolo]="true"
					appearance="outline"
					label="Film"
					placeholder="Type any film"
				/>
				<p class="readout">Value: {{ freeSoloValue() ?? '—' }}</p>
			</div>

			<div class="demo-block">
				<autocomplete
					[options]="films"
					[value]="createValue()"
					(valueChanged)="onCreateChange($event)"
					[filterOptions]="filterOptions"
					appearance="outline"
					label="Film"
					placeholder="Search or add a film"
				/>
				<p class="readout">Value: {{ createValue() ?? '—' }}</p>
			</div>
		</div>

		<details class="example-source">
			<summary>View source</summary>
			<code-block [code]="code" language="typescript" />
		</details>
	`,
	styles: [`
		.demo-row { display: flex; flex-wrap: wrap; gap: 24px; }
		.demo-row > .demo-block { max-width: 320px; flex: 1 1 280px; }
		.readout { margin-top: 12px; color: var(--ng-muted, #6b7280); font-size: 14px; }
		.example-source { margin-top: 1rem; }
		.example-source summary { cursor: pointer; color: #3f51b5; font-size: 0.875rem; }
		.example-code { margin: 0.5rem 0 0; padding: 1rem; overflow-x: auto; border-radius: 8px; background: rgba(0,0,0,0.04); font-family: 'Roboto Mono', ui-monospace, monospace; font-size: 0.8125rem; line-height: 1.5; }
	`],
})
export class FreeSoloExample {
	protected readonly films = FILMS;

	protected readonly freeSoloValue = signal<string | null>(null);
	protected readonly createValue = signal<string | null>(null);

	protected readonly filterOptions: FilterOptionsFn<string> = (options, state) => {
		const filtered = baseFilmFilter(options, state);
		const query = state.inputValue.trim();
		const hasExactMatch = options.some(
			(option) => option.toLowerCase() === query.toLowerCase(),
		);

		if (query && !hasExactMatch) {
			return [...filtered, `${CREATE_PREFIX}${query}${CREATE_SUFFIX}`];
		}
		return filtered;
	};

	protected onCreateChange(change: NgAutocompleteChange<string>): void {
		const picked = change.value;
		if (typeof picked !== 'string') {
			this.createValue.set(null);
			return;
		}

		if (picked.startsWith(CREATE_PREFIX) && picked.endsWith(CREATE_SUFFIX)) {
			this.createValue.set(picked.slice(CREATE_PREFIX.length, -CREATE_SUFFIX.length));
			return;
		}

		this.createValue.set(picked);
	}

	protected readonly code = `import { Component, signal } from '@angular/core';
import {
	AutocompleteComponent,
	createFilterOptions,
	type FilterOptionsFn,
	type NgAutocompleteChange,
} from '@js-smart/ng-kit';

const CREATE_PREFIX = 'Add "';
const CREATE_SUFFIX = '"';
const baseFilmFilter = createFilterOptions<string>();

@Component({
	selector: 'app-free-solo-example',
	imports: [AutocompleteComponent],
	template: \`
		<!-- Free solo: the raw text you type becomes the value -->
		<autocomplete
			[options]="films"
			[(value)]="freeSoloValue"
			[freeSolo]="true"
			appearance="outline"
			label="Film"
			placeholder="Type any film"
		/>

		<!-- Create option: an "Add …" suggestion appears for unmatched text -->
		<autocomplete
			[options]="films"
			[value]="createValue()"
			(valueChanged)="onCreateChange($event)"
			[filterOptions]="filterOptions"
			appearance="outline"
			label="Film"
			placeholder="Search or add a film"
		/>
	\`,
})
export class FreeSoloExample {
	protected readonly films = [/* ... */];
	protected readonly freeSoloValue = signal<string | null>(null);
	protected readonly createValue = signal<string | null>(null);

	protected readonly filterOptions: FilterOptionsFn<string> = (options, state) => {
		const filtered = baseFilmFilter(options, state);
		const query = state.inputValue.trim();
		const hasExactMatch = options.some(
			(option) => option.toLowerCase() === query.toLowerCase(),
		);
		if (query && !hasExactMatch) {
			return [...filtered, \`\${CREATE_PREFIX}\${query}\${CREATE_SUFFIX}\`];
		}
		return filtered;
	};

	protected onCreateChange(change: NgAutocompleteChange<string>): void {
		const picked = change.value;
		if (typeof picked !== 'string') {
			this.createValue.set(null);
			return;
		}
		if (picked.startsWith(CREATE_PREFIX) && picked.endsWith(CREATE_SUFFIX)) {
			this.createValue.set(picked.slice(CREATE_PREFIX.length, -CREATE_SUFFIX.length));
			return;
		}
		this.createValue.set(picked);
	}
}`;
}
