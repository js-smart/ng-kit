import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { CodeBlock } from '../../../shared/code-block.component';
import { DemoSettings } from '../../../shared/demo-settings';
import {
	AutocompleteComponent,
	NgClearIconDef,
	NgOptionDef,
	NgPaperDef,
	NgPopupIconDef,
} from '@js-smart/ng-kit';

interface Film {
	title: string;
	year: number;
}

interface TitleSegment {
	text: string;
	match: boolean;
}

@Component({
	selector: 'ng-kit-custom-render-example',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CodeBlock, 
		AutocompleteComponent,
		NgOptionDef,
		NgPopupIconDef,
		NgClearIconDef,
		NgPaperDef,
		NgTemplateOutlet,
	],
	template: `
		<autocomplete [options]="films" [(value)]="value" [getOptionLabel]="getOptionLabel" [appearance]="settings.appearance()" label="Film" placeholder="Search films">
			<div *ngOption="let opt; query as q" class="film-option">
				<span class="film-title">
					@for (seg of splitTitle(asFilm(opt).title, q); track $index) {
						@if (seg.match) {
							<mark>{{ seg.text }}</mark>
						} @else {
							<span>{{ seg.text }}</span>
						}
					}
				</span>
				<span class="film-year">· {{ asFilm(opt).year }}</span>
			</div>
			<span *ngPopupIcon class="material-symbols-outlined">expand_more</span>
			<span *ngClearIcon class="material-symbols-outlined">close</span>
			<ng-template ngPaper let-body>
				<div class="custom-paper">
					<div class="paper-header">Films</div>
					<ng-container [ngTemplateOutlet]="body" />
				</div>
			</ng-template>
		</autocomplete>
		<p class="readout">Selected: {{ value()?.title ?? '—' }}</p>

		<details class="example-source">
			<summary>View source</summary>
			<code-block [code]="code" language="typescript" />
		</details>
	`,
	styles: [`
		.film-option { display: flex; align-items: baseline; gap: 4px; }
		.film-title mark { background: rgba(255, 213, 79, 0.6); color: inherit; border-radius: 2px; }
		.film-year { color: var(--ng-muted, #6b7280); font-size: 13px; }
		.custom-paper { border-top: 2px solid var(--ng-primary, #3f51b5); }
		.paper-header {
			padding: 6px 16px;
			font-size: 12px;
			font-weight: 600;
			text-transform: uppercase;
			letter-spacing: 0.04em;
			color: var(--ng-muted, #6b7280);
		}
		.readout { margin-top: 12px; color: var(--ng-muted, #6b7280); font-size: 14px; }
		.material-symbols-outlined { font-size: 20px; }
		.example-source { margin-top: 1rem; }
		.example-source summary { cursor: pointer; color: #3f51b5; font-size: 0.875rem; }
		.example-code { margin: 0.5rem 0 0; padding: 1rem; overflow-x: auto; border-radius: 8px; background: rgba(0,0,0,0.04); font-family: 'Roboto Mono', ui-monospace, monospace; font-size: 0.8125rem; line-height: 1.5; }
	`],
})
export class CustomRenderExample {
	protected readonly settings = inject(DemoSettings);

	protected readonly code = `import { NgTemplateOutlet } from '@angular/common';
import { Component, signal } from '@angular/core';
import { AutocompleteComponent, NgClearIconDef, NgOptionDef, NgPaperDef, NgPopupIconDef } from '@js-smart/ng-kit';

@Component({
	selector: 'app-custom-render-example',
	imports: [AutocompleteComponent, NgOptionDef, NgPopupIconDef, NgClearIconDef, NgPaperDef, NgTemplateOutlet],
	template: \`
		<autocomplete [options]="films" [(value)]="value" [getOptionLabel]="f => f.title" label="Film">
			<!-- custom option with <mark> query highlighting + year -->
			<div *ngOption="let opt; query as q" class="film-option">
				<span class="film-title">
					@for (seg of splitTitle(asFilm(opt).title, q); track $index) {
						@if (seg.match) { <mark>{{ seg.text }}</mark> } @else { <span>{{ seg.text }}</span> }
					}
				</span>
				<span class="film-year">· {{ asFilm(opt).year }}</span>
			</div>
			<!-- custom icons + paper surface via slots -->
			<span *ngPopupIcon class="material-symbols-outlined">expand_more</span>
			<span *ngClearIcon class="material-symbols-outlined">close</span>
			<ng-template ngPaper let-body>
				<div class="custom-paper"><div class="paper-header">Films</div>
					<ng-container [ngTemplateOutlet]="body" /></div>
			</ng-template>
		</autocomplete>
	\`,
})
export class CustomRenderExample {
	protected readonly films: Film[] = [/* ... */];
	protected readonly value = signal<Film | null>(null);

	// The generic option template yields unknown; narrow it back to Film.
	protected asFilm(o: unknown): Film { return o as Film; }

	protected splitTitle(title: string, query: string): TitleSegment[] {
		// split the title into matched / unmatched segments around the query
	}
}`;

	protected readonly films: Film[] = [
		{ title: 'The Shawshank Redemption', year: 1994 },
		{ title: 'The Godfather', year: 1972 },
		{ title: 'The Dark Knight', year: 2008 },
		{ title: 'Pulp Fiction', year: 1994 },
		{ title: 'Inception', year: 2010 },
		{ title: 'Interstellar', year: 2014 },
		{ title: 'Parasite', year: 2019 },
		{ title: 'The Matrix', year: 1999 },
		{ title: 'Fight Club', year: 1999 },
		{ title: 'Forrest Gump', year: 1994 },
	];

	protected readonly value = signal<Film | null>(null);

	protected readonly getOptionLabel = (f: Film) => f.title;

	/** The generic option template yields `unknown`; narrow it back to Film. */
	protected asFilm(o: unknown): Film {
		return o as Film;
	}

	protected splitTitle(title: string, query: string): TitleSegment[] {
		if (!query) {
			return [{ text: title, match: false }];
		}
		const lowerTitle = title.toLowerCase();
		const lowerQuery = query.toLowerCase();
		const index = lowerTitle.indexOf(lowerQuery);
		if (index === -1) {
			return [{ text: title, match: false }];
		}
		const segments: TitleSegment[] = [];
		if (index > 0) {
			segments.push({ text: title.slice(0, index), match: false });
		}
		segments.push({ text: title.slice(index, index + query.length), match: true });
		if (index + query.length < title.length) {
			segments.push({ text: title.slice(index + query.length), match: false });
		}
		return segments;
	}
}
