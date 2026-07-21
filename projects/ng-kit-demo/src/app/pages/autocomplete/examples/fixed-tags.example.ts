import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { DemoSettings } from '../../../shared/demo-settings';
import { AutocompleteComponent } from '@js-smart/ng-kit';
import { buildAutocompleteExampleConfig } from './example-stackblitz';

const CODE = `import { Component, signal } from '@angular/core';
import { AutocompleteComponent } from '@js-smart/ng-kit';

@Component({
	selector: 'app-fixed-tags',
	imports: [AutocompleteComponent],
	template: \`
		<autocomplete
			[options]="films"
			[multiple]="true"
			[(value)]="value"
			[fixedOptions]="fixedFilms"
			[limitTags]="limitTags()"
			[getLimitTagsText]="getLimitTagsText"
			[isOptionEqualToValue]="isOptionEqualToValue"
			appearance="outline"
			label="Favorite films"
			placeholder="Add a film"
		/>
		<p>Selected: {{ value().join(', ') || '—' }}</p>
	\`,
})
export class FixedTagsComponent {
	protected readonly films = [
		'The Shawshank Redemption',
		'The Godfather',
		'The Dark Knight',
		'Pulp Fiction',
		'Inception',
		'Interstellar',
		'Parasite',
		'Fight Club',
		'Forrest Gump',
		'The Matrix',
	];
	protected readonly fixedFilms = ['The Shawshank Redemption', 'The Godfather'];
	protected readonly limitTags = signal(2);
	protected readonly value = signal<string[]>([
		'The Shawshank Redemption',
		'The Godfather',
		'Inception',
		'Interstellar',
	]);
	protected readonly getLimitTagsText = (n: number): string => \`+\${n} more\`;
	protected readonly isOptionEqualToValue = (option: string, value: string): boolean =>
		option === value;
}`;

@Component({
	selector: 'ng-kit-fixed-tags-example',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [AutocompleteComponent],
	template: `
		<autocomplete
			[options]="films"
			[multiple]="true"
			[(value)]="value"
			[fixedOptions]="fixedFilms"
			[limitTags]="limitTags()"
			[getLimitTagsText]="getLimitTagsText"
			[isOptionEqualToValue]="isOptionEqualToValue"
			[appearance]="settings.appearance()"
			label="Favorite films"
			placeholder="Add a film"
		/>
		<p class="readout">Selected: {{ value().join(', ') || '—' }}</p>
	`,
	styles: `
		.readout { margin-top: 12px; color: var(--ng-muted, #6b7280); font-size: 14px; }
	`,
})
export class FixedTagsExample {
	protected readonly settings = inject(DemoSettings);

	protected readonly films = [
		'The Shawshank Redemption',
		'The Godfather',
		'The Dark Knight',
		'Pulp Fiction',
		'Inception',
		'Interstellar',
		'Parasite',
		'Fight Club',
		'Forrest Gump',
		'The Matrix',
	];

	protected readonly fixedFilms = ['The Shawshank Redemption', 'The Godfather'];

	protected readonly limitTags = signal(2);

	protected readonly value = signal<string[]>([
		'The Shawshank Redemption',
		'The Godfather',
		'Inception',
		'Interstellar',
	]);

	protected readonly getLimitTagsText = (n: number): string => `+${n} more`;

	protected readonly isOptionEqualToValue = (option: string, value: string): boolean =>
		option === value;
}

export const fixedTagsConfig = buildAutocompleteExampleConfig({
	title: 'Fixed tags',
	componentName: 'fixed-tags',
	code: CODE,
});
