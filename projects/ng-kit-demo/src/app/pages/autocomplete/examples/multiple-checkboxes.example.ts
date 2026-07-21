import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CodeBlock } from '../../../shared/code-block.component';
import { AutocompleteComponent } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-multiple-checkboxes-example',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CodeBlock, AutocompleteComponent],
	template: `
		<autocomplete
			[options]="films"
			[(value)]="value"
			[multiple]="true"
			[showCheckboxes]="true"
			[disableCloseOnSelect]="true"
			appearance="outline"
			label="Movies"
			placeholder="Pick some films"
		/>
		<p class="readout">Count: {{ value().length }}</p>
		<p class="readout">Selected: {{ selectedList() }}</p>

		<autocomplete
			[options]="films"
			[(value)]="hiddenValue"
			[multiple]="true"
			[showCheckboxes]="true"
			[disableCloseOnSelect]="true"
			[filterSelectedOptions]="true"
			appearance="outline"
			label="Movies (selected hidden)"
			placeholder="Pick some films"
		/>
		<p class="readout">Count: {{ hiddenValue().length }}</p>
		<p class="readout">Selected: {{ hiddenSelectedList() }}</p>

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
export class MultipleCheckboxesExample {
	protected readonly films = [
		'The Shawshank Redemption', 'The Godfather', 'The Dark Knight',
		'Pulp Fiction', 'Inception', 'Interstellar', 'Parasite',
		'Fight Club', 'Forrest Gump', 'The Matrix',
	];
	protected readonly value = signal<string[]>([]);
	protected readonly hiddenValue = signal<string[]>([]);

	protected readonly selectedList = computed(() =>
		this.value().length ? this.value().join(', ') : '—',
	);
	protected readonly hiddenSelectedList = computed(() =>
		this.hiddenValue().length ? this.hiddenValue().join(', ') : '—',
	);

	protected readonly code = `import { Component, computed, signal } from '@angular/core';
import { AutocompleteComponent } from '@js-smart/ng-kit';

@Component({
  selector: 'app-multiple-checkboxes-example',
  imports: [AutocompleteComponent],
  template: \`
    <autocomplete
      [options]="films"
      [(value)]="value"
      [multiple]="true"
      [showCheckboxes]="true"
      [disableCloseOnSelect]="true"
      label="Movies"
      placeholder="Pick some films"
    />
    <p>Count: {{ value().length }}</p>
    <p>Selected: {{ selectedList() }}</p>
  \`,
})
export class MultipleCheckboxesExample {
  protected readonly films = [/* ... */];
  protected readonly value = signal<string[]>([]);
  protected readonly selectedList = computed(() =>
    this.value().length ? this.value().join(', ') : '—',
  );
}`;
}
