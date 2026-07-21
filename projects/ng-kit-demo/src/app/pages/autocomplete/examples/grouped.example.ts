import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { CodeBlock } from '../../../shared/code-block.component';
import { DemoSettings } from '../../../shared/demo-settings';
import { AutocompleteComponent, NgGroupHeaderDef } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-grouped-example',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CodeBlock, AutocompleteComponent, NgGroupHeaderDef],
	template: `
		<autocomplete
			[options]="films"
			[(value)]="value"
			[groupBy]="groupByLetter"
			[appearance]="settings.appearance()"
			label="Movie"
			placeholder="Pick a film"
		>
			<div *ngGroupHeader="let letter; count as count" class="group-header">
				{{ letter }}
				<span class="group-count">({{ count }})</span>
			</div>
		</autocomplete>
		<p class="readout">Selected: {{ value() ?? '—' }}</p>

		<details class="example-source">
			<summary>View source</summary>
			<code-block [code]="code" language="typescript" />
		</details>
	`,
	styles: [`
		.readout { margin-top: 12px; color: var(--ng-muted, #6b7280); font-size: 14px; }
		.group-header {
			display: flex;
			align-items: baseline;
			gap: 6px;
			font-weight: 600;
		}
		.group-count {
			font-weight: 400;
			color: var(--ng-muted, #6b7280);
			font-size: 12px;
		}
		.example-source { margin-top: 1rem; }
		.example-source summary { cursor: pointer; color: #3f51b5; font-size: 0.875rem; }
		.example-code { margin: 0.5rem 0 0; padding: 1rem; overflow-x: auto; border-radius: 8px; background: rgba(0,0,0,0.04); font-family: 'Roboto Mono', ui-monospace, monospace; font-size: 0.8125rem; line-height: 1.5; }
	`],
})
export class GroupedExample {
	protected readonly settings = inject(DemoSettings);

	protected readonly code = `import { Component, signal } from '@angular/core';
import { AutocompleteComponent, NgGroupHeaderDef } from '@js-smart/ng-kit';

@Component({
  selector: 'app-grouped-example',
  imports: [AutocompleteComponent, NgGroupHeaderDef],
  template: \`
    <autocomplete
      [options]="films"
      [(value)]="value"
      [groupBy]="groupByLetter"
      appearance="outline"
      label="Movie"
      placeholder="Pick a film"
    >
      <div *ngGroupHeader="let letter; count as count" class="group-header">
        {{ letter }}
        <span class="group-count">({{ count }})</span>
      </div>
    </autocomplete>
    <p>Selected: {{ value() ?? '—' }}</p>
  \`,
})
export class GroupedExample {
  protected readonly films = [/* ... */];
  protected readonly value = signal<string | null>(null);

  protected readonly groupByLetter = (film: string): string => film[0].toUpperCase();
}`;

	protected readonly films = [
		'Amélie',
		'Arrival',
		'Casablanca',
		'Chinatown',
		'Coco',
		'Dune',
		'Fargo',
		'Gladiator',
		'Inception',
		'Interstellar',
		'Parasite',
		'Rashomon',
		'Se7en',
		'Whiplash',
		'Zodiac',
	];
	protected readonly value = signal<string | null>(null);

	protected readonly groupByLetter = (film: string): string => film[0].toUpperCase();
}
