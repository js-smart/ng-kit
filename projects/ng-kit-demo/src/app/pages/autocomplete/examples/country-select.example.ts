import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AutocompleteComponent, NgOptionDef } from '@js-smart/ng-kit';

interface Country {
	code: string;
	label: string;
	phone: string;
}

function flagEmoji(code: string): string {
	return code
		.toUpperCase()
		.replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

@Component({
	selector: 'ng-kit-country-select-example',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [AutocompleteComponent, NgOptionDef],
	template: `
		<autocomplete
			[options]="countries"
			[(value)]="value"
			[getOptionLabel]="getOptionLabel"
			[getOptionKey]="getOptionKey"
			[isOptionEqualToValue]="isOptionEqualToValue"
			appearance="outline"
			label="Country"
			placeholder="Select a country"
		>
			<div *ngOption="let o" class="country-option">
				<span class="flag" aria-hidden="true">{{ flagEmoji(asCountry(o).code) }}</span>
				<span class="label">{{ asCountry(o).label }}</span>
				<span class="phone">+{{ asCountry(o).phone }}</span>
			</div>
		</autocomplete>
		<p class="readout">Selected: {{ value()?.label ?? '—' }}</p>

		<details class="example-source">
			<summary>View source</summary>
			<pre class="example-code"><code>{{ code }}</code></pre>
		</details>
	`,
	styles: [`
		.readout { margin-top: 12px; color: var(--ng-muted, #6b7280); font-size: 14px; }
		.country-option { display: flex; align-items: center; gap: 8px; width: 100%; }
		.country-option .label { flex: 1 1 auto; }
		.country-option .phone { color: var(--ng-muted, #6b7280); font-size: 13px; }
		.example-source { margin-top: 1rem; }
		.example-source summary { cursor: pointer; color: #3f51b5; font-size: 0.875rem; }
		.example-code { margin: 0.5rem 0 0; padding: 1rem; overflow-x: auto; border-radius: 8px; background: rgba(0,0,0,0.04); font-family: 'Roboto Mono', ui-monospace, monospace; font-size: 0.8125rem; line-height: 1.5; }
	`],
})
export class CountrySelectExample {
	protected readonly code = `import { Component, signal } from '@angular/core';
import { AutocompleteComponent, NgOptionDef } from '@js-smart/ng-kit';

interface Country {
	code: string;
	label: string;
	phone: string;
}

function flagEmoji(code: string): string {
	return code
		.toUpperCase()
		.replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

@Component({
	selector: 'app-country-select-example',
	imports: [AutocompleteComponent, NgOptionDef],
	template: \`
		<autocomplete
			[options]="countries"
			[(value)]="value"
			[getOptionLabel]="getOptionLabel"
			[getOptionKey]="getOptionKey"
			[isOptionEqualToValue]="isOptionEqualToValue"
			label="Country"
			placeholder="Select a country"
		>
			<div *ngOption="let o" class="country-option">
				<span class="flag" aria-hidden="true">{{ flagEmoji(asCountry(o).code) }}</span>
				<span class="label">{{ asCountry(o).label }}</span>
				<span class="phone">+{{ asCountry(o).phone }}</span>
			</div>
		</autocomplete>
		<p>Selected: {{ value()?.label ?? '—' }}</p>
	\`,
})
export class CountrySelectExample {
	protected readonly countries: Country[] = [/* ... */];
	protected readonly value = signal<Country | null>(null);

	protected readonly getOptionLabel = (c: Country) => c.label;
	protected readonly getOptionKey = (c: Country) => c.code;
	protected readonly isOptionEqualToValue = (a: Country, b: Country) => a.code === b.code;

	protected readonly flagEmoji = flagEmoji;

	/** The generic option template yields unknown; narrow it back to Country. */
	protected asCountry(o: unknown): Country {
		return o as Country;
	}
}`;

	protected readonly countries: Country[] = [
		{ code: 'US', label: 'United States', phone: '1' },
		{ code: 'GB', label: 'United Kingdom', phone: '44' },
		{ code: 'CA', label: 'Canada', phone: '1' },
		{ code: 'AU', label: 'Australia', phone: '61' },
		{ code: 'DE', label: 'Germany', phone: '49' },
		{ code: 'FR', label: 'France', phone: '33' },
		{ code: 'JP', label: 'Japan', phone: '81' },
		{ code: 'IN', label: 'India', phone: '91' },
		{ code: 'BR', label: 'Brazil', phone: '55' },
		{ code: 'MX', label: 'Mexico', phone: '52' },
		{ code: 'ZA', label: 'South Africa', phone: '27' },
		{ code: 'KR', label: 'South Korea', phone: '82' },
	];

	protected readonly value = signal<Country | null>(null);

	protected readonly getOptionLabel = (c: Country) => c.label;
	protected readonly getOptionKey = (c: Country) => c.code;
	protected readonly isOptionEqualToValue = (a: Country, b: Country) => a.code === b.code;

	protected readonly flagEmoji = flagEmoji;

	/** The generic option template yields `unknown`; narrow it back to Country. */
	protected asCountry(o: unknown): Country {
		return o as Country;
	}
}
