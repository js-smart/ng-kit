import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AutocompleteComponent } from '@js-smart/ng-kit';

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

		<details class="example-source">
			<summary>View source</summary>
			<pre class="example-code"><code>{{ code }}</code></pre>
		</details>
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
		.example-source { margin-top: 1rem; }
		.example-source summary { cursor: pointer; color: #3f51b5; font-size: 0.875rem; }
		.example-code { margin: 0.5rem 0 0; padding: 1rem; overflow-x: auto; border-radius: 8px; background: rgba(0,0,0,0.04); font-family: 'Roboto Mono', ui-monospace, monospace; font-size: 0.8125rem; line-height: 1.5; }
	`,
})
export class ControlledExample {
	protected readonly code = `import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AutocompleteComponent } from '@js-smart/ng-kit';

@Component({
  selector: 'app-controlled-example',
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
export class ControlledExample {
  protected readonly films = [/* ... */];
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
