import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { DemoSettings } from '../../../shared/demo-settings';
import { AutocompleteComponent } from '@js-smart/ng-kit';
import { buildAutocompleteExampleConfig } from './example-stackblitz';

const CODE = `import { Component, signal } from '@angular/core';
import { AutocompleteComponent } from '@js-smart/ng-kit';

@Component({
  selector: 'app-disabled-options',
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
export class DisabledOptionsComponent {
  protected readonly films = [
    'The Shawshank Redemption', 'The Godfather', 'The Dark Knight',
    'Pulp Fiction', 'Inception', 'Interstellar', 'Parasite',
    'Fight Club', 'Forrest Gump',
  ];
  protected readonly value = signal<string | null>(null);

  protected readonly isEveryThird = (option: string): boolean => {
    const index = this.films.indexOf(option);
    return index >= 0 && (index + 1) % 3 === 0;
  };
}`;

export const disabledOptionsConfig = buildAutocompleteExampleConfig({ title: 'Disabled options', componentName: 'disabled-options', code: CODE });

@Component({
	selector: 'ng-kit-disabled-options-example',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [AutocompleteComponent],
	template: `
		<autocomplete
			[options]="films"
			[(value)]="optionDisabledValue"
			[getOptionDisabled]="isEveryThird"
			[appearance]="settings.appearance()"
			label="Movie"
			placeholder="Pick a film"
		/>
		<p class="readout">Selected: {{ optionDisabledValue() ?? '—' }}</p>

		<autocomplete
			[options]="films"
			[(value)]="disabledFieldValue"
			[disabled]="true"
			[appearance]="settings.appearance()"
			label="Movie"
		/>
		<p class="readout">Selected: {{ disabledFieldValue() ?? '—' }}</p>

		<autocomplete
			[options]="films"
			[(value)]="readOnlyFieldValue"
			[readOnly]="true"
			[appearance]="settings.appearance()"
			label="Movie"
		/>
		<p class="readout">Selected: {{ readOnlyFieldValue() ?? '—' }}</p>
	`,
	styles: [`
		.readout { margin-top: 12px; color: var(--ng-muted, #6b7280); font-size: 14px; }
	`],
})
export class DisabledOptionsExample {
	protected readonly settings = inject(DemoSettings);

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
}
