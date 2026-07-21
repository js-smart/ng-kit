import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { DemoSettings } from '../../../shared/demo-settings';
import { MatButtonModule } from '@angular/material/button';
import { AutocompleteComponent } from '@js-smart/ng-kit';
import { buildAutocompleteExampleConfig } from './example-stackblitz';

const CODE = `import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AutocompleteComponent } from '@js-smart/ng-kit';

@Component({
  selector: 'app-controlled',
  imports: [AutocompleteComponent, MatButtonModule],
  template: \`
    <autocomplete
      [options]="films"
      [(value)]="value"
      [(inputValue)]="inputValue"
      [(open)]="open"
      appearance="outline"
      label="Movie"
      placeholder="Pick a film"
    />

    <div class="controls">
      <button mat-flat-button color="primary" (click)="open.set(true)">Open</button>
      <button mat-stroked-button color="primary" (click)="open.set(false)">Close</button>
      <button mat-stroked-button color="primary" (click)="open.update((o) => !o)">Toggle</button>
      <button mat-stroked-button color="primary" (click)="clearValue()">Clear value</button>
      <button mat-stroked-button color="primary" (click)="setToInception()">Set to Inception</button>
    </div>

    <dl class="readout">
      <dt>open</dt>
      <dd>{{ open() }}</dd>
      <dt>value</dt>
      <dd>{{ value() ?? '—' }}</dd>
      <dt>inputValue</dt>
      <dd>{{ inputValue() || '—' }}</dd>
    </dl>
  \`,
})
export class ControlledComponent {
  protected readonly films = [
    'The Shawshank Redemption', 'The Godfather', 'The Dark Knight',
    'Pulp Fiction', 'Inception', 'Interstellar', 'Parasite', 'Whiplash',
  ];
  protected readonly value = signal<string | null>(null);
  protected readonly inputValue = signal('');
  protected readonly open = signal(false);

  protected clearValue(): void {
    this.value.set(null);
    this.inputValue.set('');
  }

  protected setToInception(): void {
    this.value.set('Inception');
    this.inputValue.set('Inception');
  }
}`;

export const controlledConfig = buildAutocompleteExampleConfig({ title: 'Controlled', componentName: 'controlled', code: CODE });

@Component({
	selector: 'ng-kit-controlled-example',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [AutocompleteComponent, MatButtonModule],
	template: `
		<autocomplete
			[options]="films"
			[(value)]="value"
			[(inputValue)]="inputValue"
			[(open)]="open"
			[appearance]="settings.appearance()"
			label="Movie"
			placeholder="Pick a film"
		/>

		<div class="controls">
			<button mat-flat-button color="primary" (click)="open.set(true)">Open</button>
			<button mat-stroked-button color="primary" (click)="open.set(false)">Close</button>
			<button mat-stroked-button color="primary" (click)="open.update((o) => !o)">Toggle</button>
			<button mat-stroked-button color="primary" (click)="clearValue()">Clear value</button>
			<button mat-stroked-button color="primary" (click)="setToInception()">Set to Inception</button>
		</div>

		<dl class="readout">
			<dt>open</dt>
			<dd>{{ open() }}</dd>
			<dt>value</dt>
			<dd>{{ value() ?? '—' }}</dd>
			<dt>inputValue</dt>
			<dd>{{ inputValue() || '—' }}</dd>
		</dl>
	`,
	styles: `
		.controls { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
		.readout {
			margin-top: 12px;
			display: grid;
			grid-template-columns: auto 1fr;
			gap: 4px 12px;
			color: var(--ng-muted, #6b7280);
			font-size: 14px;
		}
		.readout dt { font-weight: 600; }
		.readout dd { margin: 0; }
	`,
})
export class ControlledExample {
	protected readonly settings = inject(DemoSettings);

	protected readonly films = [
		'The Shawshank Redemption', 'The Godfather', 'The Dark Knight',
		'Pulp Fiction', 'Inception', 'Interstellar', 'Parasite', 'Whiplash',
	];

	protected readonly value = signal<string | null>(null);
	protected readonly inputValue = signal('');
	protected readonly open = signal(false);

	protected clearValue(): void {
		this.value.set(null);
		this.inputValue.set('');
	}

	protected setToInception(): void {
		this.value.set('Inception');
		this.inputValue.set('Inception');
	}
}
