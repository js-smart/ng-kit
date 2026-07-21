import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CodeBlock } from '../../shared/code-block.component';
import { groupedPages } from '../../gallery/gallery-registry';

const INSTALL_SNIPPET = 'pnpm add @js-smart/ng-kit @angular/material @angular/cdk';

const FEATURES: readonly string[] = [
	'A set of standalone, tree-shakable Angular components, directives, and utilities',
	'Built on Angular Material with a signals-first API',
	'Autocomplete, alerts, dialogs, spinners, snackbars, and a rich button suite',
	'Directives (ngxPrint, prevent-multiple-clicks) and helpers (progress state, TanStack Query adapter)',
	'Accessibility-minded: keyboard navigation, ARIA roles and states',
];

/**
 * Gallery overview: a short pitch, an install snippet, feature highlights, and
 * a grid of links into every page, grouped by category.
 */
@Component({
	selector: 'ng-kit-home-page',
	imports: [RouterLink, MatButtonModule, MatCardModule, MatIconModule, CodeBlock],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<section class="hero">
			<h1>NG Kit</h1>
			<p class="pitch">A component library for Angular — standalone components, directives, and utilities built on Angular Material with a signals-first API.</p>
		</section>

		<mat-card appearance="outlined" class="install-card">
			<mat-card-header>
				<mat-card-title>Install</mat-card-title>
			</mat-card-header>
			<mat-card-content>
				<code-block [code]="installSnippet" language="bash" />
			</mat-card-content>
		</mat-card>

		<mat-card appearance="outlined" class="features-card">
			<mat-card-header>
				<mat-card-title>Highlights</mat-card-title>
			</mat-card-header>
			<mat-card-content>
				<ul class="features-list">
					@for (feature of features; track feature) {
						<li>{{ feature }}</li>
					}
				</ul>
			</mat-card-content>
		</mat-card>

		@for (group of groups; track group.category) {
			<h2 class="section-heading">{{ group.label }}</h2>
			<div class="cards-grid">
				@for (page of group.pages; track page.slug) {
					<mat-card appearance="outlined" class="link-card">
						<mat-card-header>
							<mat-card-title>
								<a [routerLink]="['/', page.slug]" class="stretched-link">{{ page.title }}</a>
							</mat-card-title>
						</mat-card-header>
						<mat-card-content>{{ page.blurb }}</mat-card-content>
					</mat-card>
				}
			</div>
		}
	`,
	styles: `
		:host {
			display: block;
		}




		.install-card,
		.features-card {
			margin-block-end: 1.5rem;
			max-width: 720px;
		}

		.features-list {
			margin: 0;
			padding-inline-start: 1.25rem;
		}

		.features-list li {
			margin-block-end: 0.4rem;
		}

		.section-heading {
			margin-block: 1.5rem 1rem;
		}

		.cards-grid {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
			gap: 1rem;
		}

		.link-card {
			position: relative;
		}

		.stretched-link {
			text-decoration: none;
			color: inherit;
		}

		.stretched-link::after {
			content: '';
			position: absolute;
			inset: 0;
		}
	`,
})
export class HomePage {
	protected readonly groups = groupedPages();
	protected readonly features = FEATURES;
	protected readonly installSnippet = INSTALL_SNIPPET;


}
