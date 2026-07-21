import { ChangeDetectionStrategy, Component, computed, signal, inject } from '@angular/core';
import { DemoSettings } from '../../../shared/demo-settings';
import { AutocompleteComponent } from '@js-smart/ng-kit';
import { buildAutocompleteExampleConfig } from './example-stackblitz';

const CODE = `import { Component, computed, signal } from '@angular/core';
import { AutocompleteComponent } from '@js-smart/ng-kit';

@Component({
  selector: 'app-multiple-checkboxes',
  imports: [AutocompleteComponent],
  template: \`
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
    <p>Count: {{ value().length }}</p>
    <p>Selected: {{ selectedList() }}</p>

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
    <p>Count: {{ hiddenValue().length }}</p>
    <p>Selected: {{ hiddenSelectedList() }}</p>
  \`,
})
export class MultipleCheckboxesComponent {
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
}`;

export const multipleCheckboxesConfig = buildAutocompleteExampleConfig({
	title: 'Checkboxes',
	componentName: 'multiple-checkboxes',
	code: CODE,
});

@Component({
	selector: 'ng-kit-multiple-checkboxes-example',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [AutocompleteComponent],
	template: `
		<autocomplete
			[options]="films"
			[(value)]="value"
			[multiple]="true"
			[showCheckboxes]="true"
			[disableCloseOnSelect]="true"
			[appearance]="settings.appearance()"
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
			[appearance]="settings.appearance()"
			label="Movies (selected hidden)"
			placeholder="Pick some films"
		/>
		<p class="readout">Count: {{ hiddenValue().length }}</p>
		<p class="readout">Selected: {{ hiddenSelectedList() }}</p>
	`,
	styles: [`
		.readout { margin-top: 12px; color: var(--ng-muted, #6b7280); font-size: 14px; }
	`],
})
export class MultipleCheckboxesExample {
	protected readonly settings = inject(DemoSettings);

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
}
