import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { DemoSettings } from '../../../shared/demo-settings';
import { AutocompleteComponent } from '@js-smart/ng-kit';
import { buildAutocompleteExampleConfig } from './example-stackblitz';

const CODE = `import { Component, signal } from '@angular/core';
import { AutocompleteComponent } from '@js-smart/ng-kit';

@Component({
  selector: 'app-combo-box',
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
export class ComboBoxComponent {
  protected readonly films = [
    'The Shawshank Redemption', 'The Godfather', 'The Dark Knight',
    'Pulp Fiction', 'Inception', 'Interstellar', 'Parasite', 'Whiplash',
  ];
  protected readonly value = signal<string | null>(null);
}`;

export const comboBoxConfig = buildAutocompleteExampleConfig({ title: 'Combo box', componentName: 'combo-box', code: CODE });

@Component({
	selector: 'ng-kit-combo-box-example',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [AutocompleteComponent],
	template: `
		<autocomplete
			[options]="films"
			[(value)]="value"
			[appearance]="settings.appearance()"
			label="Movie"
			placeholder="Pick a film"
		/>
		<p class="readout">Selected: {{ value() ?? '—' }}</p>
	`,
	styles: `
		.readout {
			margin-top: 12px;
			color: var(--ng-muted, #6b7280);
			font-size: 14px;
		}
	`,
})
export class ComboBoxExample {
	protected readonly settings = inject(DemoSettings);

	protected readonly films = [
		'The Shawshank Redemption', 'The Godfather', 'The Dark Knight',
		'Pulp Fiction', 'Inception', 'Interstellar', 'Parasite', 'Whiplash',
	];
	protected readonly value = signal<string | null>(null);
}
