import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CodeBlock } from '../../../shared/code-block.component';
import { AutocompleteComponent } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-combo-box-example',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CodeBlock, AutocompleteComponent],
	template: `
		<autocomplete
			[options]="films"
			[(value)]="value"
			appearance="outline"
			label="Movie"
			placeholder="Pick a film"
		/>
		<p class="readout">Selected: {{ value() ?? '—' }}</p>

		<details class="example-source">
			<summary>View source</summary>
			<code-block [code]="code" language="typescript" />
		</details>
	`,
	styles: `
		.readout {
			margin-top: 12px;
			color: var(--ng-muted, #6b7280);
			font-size: 14px;
		}

		.example-source {
			margin-top: 1rem;
		}

		.example-source summary {
			cursor: pointer;
			color: #3f51b5;
			font-size: 0.875rem;
		}

		.example-code {
			margin: 0.5rem 0 0;
			padding: 1rem;
			overflow-x: auto;
			border-radius: 8px;
			background: rgba(0, 0, 0, 0.04);
			font-family: 'Roboto Mono', ui-monospace, monospace;
			font-size: 0.8125rem;
			line-height: 1.5;
		}
	`,
})
export class ComboBoxExample {
	protected readonly code = `import { Component, signal } from '@angular/core';
import { AutocompleteComponent } from '@js-smart/ng-kit';

@Component({
  selector: 'app-combo-box-example',
  imports: [AutocompleteComponent],
  template: \`
    <autocomplete
      [options]="films"
      [(value)]="value"
      appearance="outline"
      label="Movie"
      placeholder="Pick a film"
    />
    <p>Selected: {{ value() ?? '—' }}</p>
  \`,
})
export class ComboBoxExample {
  protected readonly films = [/* ... */];
  protected readonly value = signal<string | null>(null);
}`;

	protected readonly films = [
		'The Shawshank Redemption', 'The Godfather', 'The Dark Knight',
		'Pulp Fiction', 'Inception', 'Interstellar', 'Parasite', 'Whiplash',
	];
	protected readonly value = signal<string | null>(null);
}
