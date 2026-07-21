import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AutocompleteComponent } from '@js-smart/ng-kit';
import { buildAutocompleteExampleConfig } from './example-stackblitz';

const CODE = `import { Component, signal } from '@angular/core';
import { AutocompleteComponent } from '@js-smart/ng-kit';

@Component({
  selector: 'app-sizes-appearances',
  imports: [AutocompleteComponent],
  template: \`
    <autocomplete
      [options]="films"
      [(value)]="value"
      size="small"
      appearance="fill"
      label="Movie"
    />
    <autocomplete
      [options]="films"
      [(value)]="value"
      size="medium"
      appearance="outline"
      label="Movie"
    />
    <autocomplete
      [options]="films"
      [(value)]="fullWidthValue"
      [fullWidth]="true"
      appearance="outline"
      label="Movie"
    />
  \`,
})
export class SizesAppearancesComponent {
  protected readonly films = [
    'The Shawshank Redemption', 'The Godfather', 'The Dark Knight',
    'Pulp Fiction', 'Inception', 'Interstellar', 'Parasite', 'Whiplash',
  ];
  protected readonly value = signal<string | null>(null);
  protected readonly fullWidthValue = signal<string | null>(null);
}`;

interface Combo {
	readonly label: string;
	readonly size: 'small' | 'medium';
	readonly appearance: 'fill' | 'outline';
	readonly value: ReturnType<typeof signal<string | null>>;
}

@Component({
	selector: 'ng-kit-sizes-appearances-example',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [AutocompleteComponent],
	template: `
		<div class="grid">
			@for (c of combos; track c.label) {
				<div class="cell">
					<span class="cell-label">{{ c.label }}</span>
					<autocomplete
						[options]="films"
						[(value)]="c.value"
						[size]="c.size"
						[appearance]="c.appearance"
						label="Movie"
					/>
				</div>
			}
		</div>

		<div class="full">
			<span class="cell-label">fullWidth</span>
			<autocomplete
				[options]="films"
				[(value)]="fullWidthValue"
				[fullWidth]="true"
				appearance="outline"
				label="Movie"
			/>
		</div>
	`,
	styles: `
		.grid {
			display: grid;
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 20px;
			margin-top: 8px;
		}

		.cell-label {
			display: block;
			margin-bottom: 6px;
			font-size: 12px;
			font-weight: 600;
			color: var(--ng-muted, #6b7280);
		}

		.full {
			margin-top: 20px;
		}
	`,
})
export class SizesAppearancesExample {
	protected readonly films = [
		'The Shawshank Redemption', 'The Godfather', 'The Dark Knight',
		'Pulp Fiction', 'Inception', 'Interstellar', 'Parasite', 'Whiplash',
	];

	protected readonly combos: readonly Combo[] = [
		{ label: 'small · fill', size: 'small', appearance: 'fill', value: signal<string | null>(null) },
		{ label: 'medium · fill', size: 'medium', appearance: 'fill', value: signal<string | null>(null) },
		{ label: 'small · outline', size: 'small', appearance: 'outline', value: signal<string | null>(null) },
		{ label: 'medium · outline', size: 'medium', appearance: 'outline', value: signal<string | null>(null) },
	];

	protected readonly fullWidthValue = signal<string | null>(null);
}

export const sizesAppearancesConfig = buildAutocompleteExampleConfig({
	title: 'Sizes & appearances',
	componentName: 'sizes-appearances',
	code: CODE,
});
