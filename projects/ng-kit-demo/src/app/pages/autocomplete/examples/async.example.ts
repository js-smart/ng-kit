import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { CodeBlock } from '../../../shared/code-block.component';
import { DemoSettings } from '../../../shared/demo-settings';
import { AutocompleteComponent, passThroughFilter } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-async-example',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CodeBlock, AutocompleteComponent],
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

		<details class="example-source">
			<summary>View source</summary>
			<code-block [code]="code" language="typescript" />
		</details>
	`,
	styles: `
		.readout { margin-top: 12px; color: var(--ng-muted, #6b7280); font-size: 14px; }
		.example-source { margin-top: 1rem; }
		.example-source summary { cursor: pointer; color: #3f51b5; font-size: 0.875rem; }
		.example-code { margin: 0.5rem 0 0; padding: 1rem; overflow-x: auto; border-radius: 8px; background: rgba(0,0,0,0.04); font-family: 'Roboto Mono', ui-monospace, monospace; font-size: 0.8125rem; line-height: 1.5; }
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

	protected readonly code = `import { Component, signal } from '@angular/core';
import { AutocompleteComponent, passThroughFilter } from '@js-smart/ng-kit';

@Component({
  selector: 'app-async-example',
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
export class AsyncExample {
  protected readonly passThroughFilter = passThroughFilter;
  protected readonly value = signal<string | null>(null);
  protected readonly options = signal<string[]>([]);
  protected readonly loading = signal(false);

  private readonly countries = [/* ... */];
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
}
