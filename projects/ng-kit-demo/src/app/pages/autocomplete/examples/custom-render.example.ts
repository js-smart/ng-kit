import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { DemoSettings } from '../../../shared/demo-settings';
import { buildAutocompleteExampleConfig } from './example-stackblitz';
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

const CODE = `import { NgTemplateOutlet } from '@angular/common';
import { Component, signal } from '@angular/core';
import { AutocompleteComponent, NgClearIconDef, NgOptionDef, NgPaperDef, NgPopupIconDef } from '@js-smart/ng-kit';

interface Film {
	title: string;
	year: number;
}

interface TitleSegment {
	text: string;
	match: boolean;
}

@Component({
	selector: 'app-custom-render',
	imports: [AutocompleteComponent, NgOptionDef, NgPopupIconDef, NgClearIconDef, NgPaperDef, NgTemplateOutlet],
	template: \`
		<autocomplete [options]="films" [(value)]="value" [getOptionLabel]="getOptionLabel" appearance="outline" label="Film" placeholder="Search films">
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
		<p class="readout">Selected: {{ value()?.title ?? '—' }}</p>
	\`,
	styles: [\`
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
	\`],
})
export class CustomRenderComponent {
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

	// The generic option template yields unknown; narrow it back to Film.
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
}`;

export const customRenderConfig = buildAutocompleteExampleConfig({
	title: 'Custom rendering',
	componentName: 'custom-render',
	code: CODE,
});

@Component({
	selector: 'ng-kit-custom-render-example',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
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
	`],
})
export class CustomRenderExample {
	protected readonly settings = inject(DemoSettings);

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
