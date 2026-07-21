import { ChangeDetectionStrategy, Component, signal, type WritableSignal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule, type MatCheckboxChange } from '@angular/material/checkbox';
import { AutocompleteComponent } from '@js-smart/ng-kit';
import { buildAutocompleteExampleConfig } from './example-stackblitz';

const CODE = `import { Component, signal } from '@angular/core';
import { AutocompleteComponent } from '@js-smart/ng-kit';

@Component({
  selector: 'app-playground',
  imports: [AutocompleteComponent],
  template: \`
    <autocomplete
      [options]="films"
      [(value)]="value"
      [(inputValue)]="inputValue"
      [multiple]="multiple()"
      [freeSolo]="freeSolo()"
      [disableClearable]="disableClearable()"
      [(disabled)]="disabled"
      [readOnly]="readOnly()"
      [loading]="loading()"
      [autoHighlight]="autoHighlight()"
      [autoSelect]="autoSelect()"
      [disableCloseOnSelect]="disableCloseOnSelect()"
      [openOnFocus]="openOnFocus()"
      [showCheckboxes]="showCheckboxes()"
      [appearance]="appearance()"
      [size]="size()"
      label="Movie"
      placeholder="Pick a film"
    />
  \`,
})
export class PlaygroundComponent {
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
  protected readonly value = signal<string | readonly string[] | null>(null);
  protected readonly inputValue = signal('');

  protected readonly multiple = signal(false);
  protected readonly freeSolo = signal(false);
  protected readonly disableClearable = signal(false);
  protected readonly disabled = signal(false);
  protected readonly readOnly = signal(false);
  protected readonly loading = signal(false);
  protected readonly autoHighlight = signal(false);
  protected readonly autoSelect = signal(false);
  protected readonly disableCloseOnSelect = signal(false);
  protected readonly openOnFocus = signal(false);
  protected readonly showCheckboxes = signal(false);
  protected readonly appearance = signal<'fill' | 'outline'>('outline');
  protected readonly size = signal<'small' | 'medium'>('medium');
}`;

export const playgroundConfig = buildAutocompleteExampleConfig({
	title: 'Playground',
	componentName: 'playground',
	code: CODE,
});

@Component({
	selector: 'ng-kit-playground-example',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [AutocompleteComponent, MatCheckboxModule, MatButtonToggleModule],
	template: `
		<autocomplete
			[options]="films"
			[(value)]="value"
			[(inputValue)]="inputValue"
			[multiple]="multiple()"
			[freeSolo]="freeSolo()"
			[disableClearable]="disableClearable()"
			[(disabled)]="disabled"
			[readOnly]="readOnly()"
			[loading]="loading()"
			[autoHighlight]="autoHighlight()"
			[autoSelect]="autoSelect()"
			[disableCloseOnSelect]="disableCloseOnSelect()"
			[openOnFocus]="openOnFocus()"
			[showCheckboxes]="showCheckboxes()"
			[appearance]="appearance()"
			[size]="size()"
			label="Movie"
			placeholder="Pick a film"
		/>

		<div class="controls">
			<mat-checkbox [checked]="multiple()" (change)="onCheckbox($event, multiple)">multiple</mat-checkbox>
			<mat-checkbox [checked]="freeSolo()" (change)="onCheckbox($event, freeSolo)">freeSolo</mat-checkbox>
			<mat-checkbox [checked]="disableClearable()" (change)="onCheckbox($event, disableClearable)">
				disableClearable
			</mat-checkbox>
			<mat-checkbox [checked]="disabled()" (change)="onCheckbox($event, disabled)">disabled</mat-checkbox>
			<mat-checkbox [checked]="readOnly()" (change)="onCheckbox($event, readOnly)">readOnly</mat-checkbox>
			<mat-checkbox [checked]="loading()" (change)="onCheckbox($event, loading)">loading</mat-checkbox>
			<mat-checkbox [checked]="autoHighlight()" (change)="onCheckbox($event, autoHighlight)">
				autoHighlight
			</mat-checkbox>
			<mat-checkbox [checked]="autoSelect()" (change)="onCheckbox($event, autoSelect)">autoSelect</mat-checkbox>
			<mat-checkbox [checked]="disableCloseOnSelect()" (change)="onCheckbox($event, disableCloseOnSelect)">
				disableCloseOnSelect
			</mat-checkbox>
			<mat-checkbox [checked]="openOnFocus()" (change)="onCheckbox($event, openOnFocus)">openOnFocus</mat-checkbox>
			<mat-checkbox [checked]="showCheckboxes()" (change)="onCheckbox($event, showCheckboxes)">
				showCheckboxes
			</mat-checkbox>
		</div>

		<div class="toggle-controls">
			<div class="toggle-group">
				<span class="toggle-label">appearance</span>
				<mat-button-toggle-group
					[value]="appearance()"
					(change)="onAppearance($event.value)"
					aria-label="Appearance"
				>
					<mat-button-toggle value="fill">fill</mat-button-toggle>
					<mat-button-toggle value="outline">outline</mat-button-toggle>
				</mat-button-toggle-group>
			</div>

			<div class="toggle-group">
				<span class="toggle-label">size</span>
				<mat-button-toggle-group [value]="size()" (change)="onSize($event.value)" aria-label="Size">
					<mat-button-toggle value="small">small</mat-button-toggle>
					<mat-button-toggle value="medium">medium</mat-button-toggle>
				</mat-button-toggle-group>
			</div>
		</div>

		<p class="readout">Value: {{ value() ?? '—' }}</p>
		<p class="readout">Input value: {{ inputValue() || '—' }}</p>
	`,
	styles: [
		`
			.controls {
				display: grid;
				grid-template-columns: repeat(2, minmax(160px, 1fr));
				gap: 8px 16px;
				margin-top: 16px;
			}
			.toggle-controls {
				display: flex;
				flex-wrap: wrap;
				gap: 16px;
				margin-top: 16px;
			}
			.toggle-group {
				display: flex;
				align-items: center;
				gap: 8px;
			}
			.toggle-label {
				font-size: 14px;
			}
			.readout {
				margin-top: 8px;
				color: var(--ng-muted, #6b7280);
				font-size: 14px;
			}
		`,
	],
})
export class PlaygroundExample {
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

	protected readonly value = signal<string | readonly string[] | null>(null);
	protected readonly inputValue = signal('');

	protected readonly multiple = signal(false);
	protected readonly freeSolo = signal(false);
	protected readonly disableClearable = signal(false);
	protected readonly disabled = signal(false);
	protected readonly readOnly = signal(false);
	protected readonly loading = signal(false);
	protected readonly autoHighlight = signal(false);
	protected readonly autoSelect = signal(false);
	protected readonly disableCloseOnSelect = signal(false);
	protected readonly openOnFocus = signal(false);
	protected readonly showCheckboxes = signal(false);
	protected readonly appearance = signal<'fill' | 'outline'>('outline');
	protected readonly size = signal<'small' | 'medium'>('medium');

	protected onCheckbox(event: MatCheckboxChange, target: WritableSignal<boolean>): void {
		target.set(event.checked);
	}

	protected onAppearance(value: 'fill' | 'outline'): void {
		this.appearance.set(value);
	}

	protected onSize(value: 'small' | 'medium'): void {
		this.size.set(value);
	}
}
