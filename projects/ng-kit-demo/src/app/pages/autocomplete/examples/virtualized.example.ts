import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AutocompleteComponent } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-virtualized-example',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [AutocompleteComponent],
	template: `
		<autocomplete
			[options]="options"
			[(value)]="value"
			[virtualize]="true"
			[itemSize]="48"
			appearance="outline"
			label="Option"
			placeholder="Search 10,000 options"
		/>
		<p class="readout">Selected: {{ value() ?? '—' }}</p>

		<details class="example-source">
			<summary>View source</summary>
			<pre class="example-code"><code>{{ code }}</code></pre>
		</details>
	`,
	styles: `
		.readout { margin-top: 12px; color: var(--ng-muted, #6b7280); font-size: 14px; }
		.example-source { margin-top: 1rem; }
		.example-source summary { cursor: pointer; color: #3f51b5; font-size: 0.875rem; }
		.example-code { margin: 0.5rem 0 0; padding: 1rem; overflow-x: auto; border-radius: 8px; background: rgba(0,0,0,0.04); font-family: 'Roboto Mono', ui-monospace, monospace; font-size: 0.8125rem; line-height: 1.5; }
	`,
})
export class VirtualizedExample {
	protected readonly options = Array.from({ length: 10000 }, (_, i) => `Option ${i + 1}`);
	protected readonly value = signal<string | null>(null);

	protected readonly code = `import { Component, signal } from '@angular/core';
import { AutocompleteComponent } from '@js-smart/ng-kit';

@Component({
  selector: 'app-virtualized-example',
  imports: [AutocompleteComponent],
  template: \`
    <autocomplete
      [options]="options"
      [(value)]="value"
      [virtualize]="true"
      [itemSize]="48"
      appearance="fill"
      label="Option"
      placeholder="Search 10,000 options"
    />
    <p>Selected: {{ value() ?? '—' }}</p>
  \`,
})
export class VirtualizedExample {
  protected readonly options = Array.from({ length: 10000 }, (_, i) => \`Option \${i + 1}\`);
  protected readonly value = signal<string | null>(null);
}`;
}
