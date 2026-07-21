import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { DemoSettings } from '../../../shared/demo-settings';
import { AutocompleteComponent } from '@js-smart/ng-kit';
import { buildAutocompleteExampleConfig } from './example-stackblitz';

const CODE = `import { Component, signal } from '@angular/core';
import { AutocompleteComponent } from '@js-smart/ng-kit';

@Component({
  selector: 'app-virtualized',
  imports: [AutocompleteComponent],
  template: \`
    <autocomplete
      [options]="options"
      [(value)]="value"
      [virtualize]="true"
      [itemSize]="48"
      appearance="fill"
      label="Option"
      placeholder="Search 10,000 options"
    />
    <p>Selected: {{ value() ?? '—' }}</p>
  \`,
})
export class VirtualizedComponent {
  protected readonly options = Array.from({ length: 10000 }, (_, i) => \`Option \${i + 1}\`);
  protected readonly value = signal<string | null>(null);
}`;

export const virtualizedConfig = buildAutocompleteExampleConfig({ title: 'Virtualized', componentName: 'virtualized', code: CODE });

@Component({
	selector: 'ng-kit-virtualized-example',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [AutocompleteComponent],
	template: `
		<autocomplete
			[options]="options"
			[(value)]="value"
			[virtualize]="true"
			[itemSize]="48"
			[appearance]="settings.appearance()"
			label="Option"
			placeholder="Search 10,000 options"
		/>
		<p class="readout">Selected: {{ value() ?? '—' }}</p>
	`,
	styles: `
		.readout { margin-top: 12px; color: var(--ng-muted, #6b7280); font-size: 14px; }
	`,
})
export class VirtualizedExample {
	protected readonly settings = inject(DemoSettings);

	protected readonly options = Array.from({ length: 10000 }, (_, i) => `Option ${i + 1}`);
	protected readonly value = signal<string | null>(null);
}
