import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AutocompleteComponent } from '@js-smart/ng-kit';
import { DemoSettings } from '../../../shared/demo-settings';
import { buildAutocompleteExampleConfig } from './example-stackblitz';

const GENRES = ['Crime', 'Drama', 'Science fiction', 'Thriller'];

const FILMS = ['The Shawshank Redemption', 'The Godfather', 'The Dark Knight', 'Pulp Fiction', 'Inception', 'Interstellar', 'Parasite'];

const CODE = `import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AutocompleteComponent } from '@js-smart/ng-kit';

@Component({
	selector: 'app-validation',
	imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatButtonModule, AutocompleteComponent],
	template: \`
		<form [formGroup]="form" (ngSubmit)="form.markAllAsTouched()">
			<!-- A plain Material select, for comparison -->
			<mat-form-field appearance="outline">
				<mat-label>Genre</mat-label>
				<mat-select formControlName="genre" [required]="true">
					@for (genre of genres; track genre) {
						<mat-option [value]="genre">{{ genre }}</mat-option>
					}
				</mat-select>
				@if (form.controls.genre.hasError('required')) {
					<mat-error>Genre is required</mat-error>
				}
			</mat-form-field>

			<!-- invalid drives the error state; helperText fills the hint / error slot -->
			<autocomplete
				formControlName="film"
				[options]="films"
				[required]="true"
				[invalid]="form.controls.film.invalid && form.controls.film.touched"
				[helperText]="form.controls.film.invalid && form.controls.film.touched ? 'Movie is required' : 'Start typing to search'"
				appearance="outline"
				label="Movie" />

			<autocomplete
				formControlName="favorites"
				[options]="films"
				[multiple]="true"
				[required]="true"
				[invalid]="form.controls.favorites.invalid && form.controls.favorites.touched"
				[helperText]="form.controls.favorites.invalid && form.controls.favorites.touched ? 'Pick at least one film' : null"
				appearance="outline"
				label="Favorite films" />

			<button mat-flat-button type="submit">Submit</button>
			<button mat-button type="button" (click)="form.reset()">Reset</button>
		</form>
	\`,
})
export class ValidationComponent {
	protected readonly genres = ['Crime', 'Drama', 'Science fiction', 'Thriller'];
	protected readonly films = [
		'The Shawshank Redemption',
		'The Godfather',
		'The Dark Knight',
		'Pulp Fiction',
		'Inception',
		'Interstellar',
		'Parasite',
	];

	protected readonly form = new FormGroup({
		genre: new FormControl<string | null>(null, Validators.required),
		film: new FormControl<string | null>(null, Validators.required),
		favorites: new FormControl<string[]>([], { nonNullable: true, validators: Validators.required }),
	});
}`;

export const validationConfig = buildAutocompleteExampleConfig({
	title: 'Validation',
	componentName: 'validation',
	code: CODE,
});

/**
 * Reactive-forms validation: `invalid` puts the field in Material's error state and
 * `helperText` renders in the subscript slot, so the autocomplete's hint and error
 * line up with a plain `mat-select` next to it.
 */
@Component({
	selector: 'ng-kit-validation-example',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatButtonModule, AutocompleteComponent],
	template: `
		<form [formGroup]="form" (ngSubmit)="form.markAllAsTouched()">
			<div class="demo-row">
				<mat-form-field [appearance]="settings.appearance()" class="demo-block">
					<mat-label>Genre</mat-label>
					<mat-select formControlName="genre" [required]="true" data-cy="validation-genre-select">
						@for (genre of genres; track genre) {
							<mat-option [value]="genre">{{ genre }}</mat-option>
						}
					</mat-select>
					@if (form.controls.genre.hasError('required')) {
						<mat-error>Genre is required</mat-error>
					}
				</mat-form-field>

				<autocomplete
					formControlName="film"
					[options]="films"
					[required]="true"
					[invalid]="filmInvalid()"
					[helperText]="filmInvalid() ? 'Movie is required' : 'Start typing to search'"
					[appearance]="settings.appearance()"
					[slotProps]="{ input: { 'data-cy': 'validation-film-autocomplete' } }"
					[fullWidth]="true"
					class="demo-block"
					label="Movie" />

				<autocomplete
					formControlName="favorites"
					[options]="films"
					[multiple]="true"
					[required]="true"
					[invalid]="favoritesInvalid()"
					[helperText]="favoritesInvalid() ? 'Pick at least one film' : null"
					[appearance]="settings.appearance()"
					[slotProps]="{ input: { 'data-cy': 'validation-favorites-autocomplete' } }"
					[fullWidth]="true"
					class="demo-block"
					label="Favorite films" />
			</div>

			<div class="actions">
				<button mat-flat-button type="submit" data-cy="validation-submit">Submit</button>
				<button mat-button type="button" (click)="form.reset()" data-cy="validation-reset">Reset</button>
			</div>
		</form>
	`,
	styles: [
		`
			.demo-row {
				display: flex;
				flex-wrap: wrap;
				align-items: flex-start;
				gap: 24px;
			}
			.demo-row > .demo-block {
				max-width: 320px;
				flex: 1 1 280px;
			}
			.actions {
				display: flex;
				gap: 12px;
				margin-top: 8px;
			}
		`,
	],
})
export class ValidationExample {
	protected readonly settings = inject(DemoSettings);

	protected readonly genres = GENRES;
	protected readonly films = FILMS;

	protected readonly form = new FormGroup({
		genre: new FormControl<string | null>(null, Validators.required),
		film: new FormControl<string | null>(null, Validators.required),
		favorites: new FormControl<string[]>([], { nonNullable: true, validators: Validators.required }),
	});

	/** Show the Movie error only once the user has left the field (or submitted). */
	protected filmInvalid(): boolean {
		const control = this.form.controls.film;
		return control.invalid && control.touched;
	}

	/** Show the Favorite films error only once the user has left the field (or submitted). */
	protected favoritesInvalid(): boolean {
		const control = this.form.controls.favorites;
		return control.invalid && control.touched;
	}
}
