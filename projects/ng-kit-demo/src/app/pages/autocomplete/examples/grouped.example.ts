import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { DemoSettings } from '../../../shared/demo-settings';
import { AutocompleteComponent, NgGroupHeaderDef } from '@js-smart/ng-kit';
import { buildAutocompleteExampleConfig } from './example-stackblitz';

const CODE = `import { Component, signal } from '@angular/core';
import { AutocompleteComponent, NgGroupHeaderDef } from '@js-smart/ng-kit';

@Component({
  selector: 'app-grouped',
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
export class GroupedComponent {
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
}`;

export const groupedConfig = buildAutocompleteExampleConfig({ title: 'Grouped', componentName: 'grouped', code: CODE });

@Component({
	selector: 'ng-kit-grouped-example',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [AutocompleteComponent, NgGroupHeaderDef],
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
	`],
})
export class GroupedExample {
	protected readonly settings = inject(DemoSettings);

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
