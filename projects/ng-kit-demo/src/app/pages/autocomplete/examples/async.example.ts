import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { DemoSettings } from '../../../shared/demo-settings';
import { AutocompleteComponent, passThroughFilter } from '@js-smart/ng-kit';
import { buildAutocompleteExampleConfig } from './example-stackblitz';

const CODE = `import { Component, signal } from '@angular/core';
import { AutocompleteComponent, passThroughFilter } from '@js-smart/ng-kit';

@Component({
  selector: 'app-async',
  imports: [AutocompleteComponent],
  template: \`
    <autocomplete
      [options]="options()"
      [(value)]="value"
      [filterOptions]="passThroughFilter"
      [loading]="loading()"
      loadingText="Searching…"
      (inputChanged)="onInputChanged($event.value)"
      label="Country"
      placeholder="Search for a country"
    />
    <p>Selected: {{ value() ?? '—' }}</p>
  \`,
})
export class AsyncComponent {
  protected readonly passThroughFilter = passThroughFilter;
  protected readonly value = signal<string | null>(null);
  protected readonly options = signal<string[]>([]);
  protected readonly loading = signal(false);

  private readonly countries = [
    'Argentina', 'Australia', 'Belgium', 'Brazil', 'Canada', 'Chile',
    'China', 'Denmark', 'Egypt', 'Finland', 'France', 'Germany',
    'Greece', 'India', 'Indonesia', 'Ireland', 'Italy', 'Japan',
    'Kenya', 'Mexico', 'Netherlands', 'New Zealand', 'Norway', 'Peru',
    'Philippines', 'Poland', 'Portugal', 'Spain', 'Sweden', 'Switzerland',
    'Thailand', 'Turkey', 'Ukraine', 'United Kingdom', 'United States', 'Vietnam',
  ];
  private pendingSearch: ReturnType<typeof setTimeout> | undefined;

  protected onInputChanged(query: string): void {
    if (this.pendingSearch !== undefined) {
      clearTimeout(this.pendingSearch);
    }

    this.loading.set(true);

    this.pendingSearch = setTimeout(() => {
      const needle = query.trim().toLowerCase();
      const results = needle
        ? this.countries.filter((country) => country.toLowerCase().includes(needle))
        : this.countries;

      this.options.set(results);
      this.loading.set(false);
      this.pendingSearch = undefined;
    }, 300);
  }
}`;

@Component({
	selector: 'ng-kit-async-example',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [AutocompleteComponent],
	template: `
		<autocomplete
			[options]="options()"
			[(value)]="value"
			[filterOptions]="passThroughFilter"
			[loading]="loading()"
			[loadingText]="'Searching…'"
			(inputChanged)="onInputChanged($event.value)"
			[appearance]="settings.appearance()"
			label="Country"
			placeholder="Search for a country"
		/>
		<p class="readout">Selected: {{ value() ?? '—' }}</p>
	`,
	styles: `
		.readout { margin-top: 12px; color: var(--ng-muted, #6b7280); font-size: 14px; }
	`,
})
export class AsyncExample {
	protected readonly settings = inject(DemoSettings);

	protected readonly passThroughFilter = passThroughFilter;

	protected readonly value = signal<string | null>(null);
	protected readonly options = signal<string[]>([]);
	protected readonly loading = signal(false);

	private readonly countries = [
		'Argentina', 'Australia', 'Belgium', 'Brazil', 'Canada', 'Chile',
		'China', 'Denmark', 'Egypt', 'Finland', 'France', 'Germany',
		'Greece', 'India', 'Indonesia', 'Ireland', 'Italy', 'Japan',
		'Kenya', 'Mexico', 'Netherlands', 'New Zealand', 'Norway', 'Peru',
		'Philippines', 'Poland', 'Portugal', 'Spain', 'Sweden', 'Switzerland',
		'Thailand', 'Turkey', 'Ukraine', 'United Kingdom', 'United States', 'Vietnam',
	];

	private pendingSearch: ReturnType<typeof setTimeout> | undefined;

	protected onInputChanged(query: string): void {
		if (this.pendingSearch !== undefined) {
			clearTimeout(this.pendingSearch);
		}

		this.loading.set(true);

		this.pendingSearch = setTimeout(() => {
			const needle = query.trim().toLowerCase();
			const results = needle
				? this.countries.filter((country) => country.toLowerCase().includes(needle))
				: this.countries;

			this.options.set(results);
			this.loading.set(false);
			this.pendingSearch = undefined;
		}, 300);
	}
}

export const asyncConfig = buildAutocompleteExampleConfig({ title: 'Asynchronous requests', componentName: 'async', code: CODE });
