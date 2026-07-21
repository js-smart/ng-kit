import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CodeBlock } from '../../../shared/code-block.component';
import { AutocompleteComponent } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-disabled-options-example',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CodeBlock, AutocompleteComponent],
	template: `
		<autocomplete
			[options]="films"
			[(value)]="optionDisabledValue"
			[getOptionDisabled]="isEveryThird"
			appearance="outline"
			label="Movie"
			placeholder="Pick a film"
		/>
		<p class="readout">Selected: {{ optionDisabledValue() ?? '—' }}</p>

		<autocomplete
			[options]="films"
			[(value)]="disabledFieldValue"
			[disabled]="true"
			appearance="outline"
			label="Movie"
		/>
		<p class="readout">Selected: {{ disabledFieldValue() ?? '—' }}</p>

		<autocomplete
			[options]="films"
			[(value)]="readOnlyFieldValue"
			[readOnly]="true"
			appearance="outline"
			label="Movie"
		/>
		<p class="readout">Selected: {{ readOnlyFieldValue() ?? '—' }}</p>

		<details class="example-source">
			<summary>View source</summary>
			<code-block [code]="code" language="typescript" />
		</details>
	`,
	styles: [`
		.readout { margin-top: 12px; color: var(--ng-muted, #6b7280); font-size: 14px; }
		.example-source { margin-top: 1rem; }
		.example-source summary { cursor: pointer; color: #3f51b5; font-size: 0.875rem; }
		.example-code { margin: 0.5rem 0 0; padding: 1rem; overflow-x: auto; border-radius: 8px; background: rgba(0,0,0,0.04); font-family: 'Roboto Mono', ui-monospace, monospace; font-size: 0.8125rem; line-height: 1.5; }
	`],
})
export class DisabledOptionsExample {
	protected readonly films = [
		'The Shawshank Redemption', 'The Godfather', 'The Dark Knight',
		'Pulp Fiction', 'Inception', 'Interstellar', 'Parasite',
		'Fight Club', 'Forrest Gump',
	];

	protected readonly optionDisabledValue = signal<string | null>(null);
	protected readonly disabledFieldValue = signal<string | null>('Inception');
	protected readonly readOnlyFieldValue = signal<string | null>('Parasite');

	protected readonly isEveryThird = (option: string): boolean => {
		const index = this.films.indexOf(option);
		return index >= 0 && (index + 1) % 3 === 0;
	};

	protected readonly code = `import { Component, signal } from '@angular/core';
import { AutocompleteComponent } from '@js-smart/ng-kit';

@Component({
  selector: 'app-disabled-options-example',
  imports: [AutocompleteComponent],
  template: \`
    <autocomplete
      [options]="films"
      [(value)]="value"
      [getOptionDisabled]="isEveryThird"
      appearance="outline"
      label="Movie"
      placeholder="Pick a film"
    />
    <p>Selected: {{ value() ?? '—' }}</p>
  \`,
})
export class DisabledOptionsExample {
  protected readonly films = [/* ... */];
  protected readonly value = signal<string | null>(null);

  protected readonly isEveryThird = (option: string): boolean => {
    const index = this.films.indexOf(option);
    return index >= 0 && (index + 1) % 3 === 0;
  };
}`;
}
