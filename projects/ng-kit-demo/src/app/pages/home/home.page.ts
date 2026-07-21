import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CodeBlock } from '../../shared/code-block.component';
import { groupedPages } from '../../gallery/gallery-registry';

const INSTALL_SNIPPET = 'pnpm add @js-smart/ng-kit @angular/material @angular/cdk';

interface Feature {
	readonly icon: string;
	readonly title: string;
	readonly description: string;
}

const FEATURES: readonly Feature[] = [
	{ icon: 'bolt', title: 'Signals-first', description: 'Reactive inputs, two-way models, and derived state throughout.' },
	{ icon: 'category', title: 'Standalone & tree-shakable', description: 'Import only what you use — the rest never ships.' },
	{ icon: 'palette', title: 'Angular Material', description: 'Consistent theming and behaviour, out of the box.' },
	{ icon: 'accessibility_new', title: 'Accessible', description: 'Keyboard navigation and ARIA states are built in.' },
];

/**
 * Landing page: a hero with the install command, a feature grid, and a
 * catalogue of every page grouped by category.
 */
@Component({
	selector: 'ng-kit-home-page',
	imports: [RouterLink, MatButtonModule, MatIconModule, CodeBlock],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<section class="hero">
			<p class="hero__eyebrow">Angular component library</p>
			<h1 class="hero__title">NG Kit</h1>
			<p class="hero__tagline">Standalone Angular components, directives, and utilities — signals-first and built on Angular Material.</p>

			<div class="hero__actions">
				<a mat-flat-button color="primary" routerLink="/introduction">Get started</a>
				<a mat-stroked-button routerLink="/autocomplete">Browse components</a>
				<a mat-button href="https://github.com/js-smart/ng-kit" target="_blank" rel="noopener">
					GitHub
					<mat-icon iconPositionEnd>open_in_new</mat-icon>
				</a>
			</div>

			<div class="hero__install">
				<code-block [code]="installSnippet" language="bash" />
			</div>
		</section>

		<section class="features" aria-label="Highlights">
			@for (feature of features; track feature.title) {
				<div class="feature">
					<span class="feature__icon"><mat-icon>{{ feature.icon }}</mat-icon></span>
					<div class="feature__text">
						<h3 class="feature__title">{{ feature.title }}</h3>
						<p class="feature__desc">{{ feature.description }}</p>
					</div>
				</div>
			}
		</section>

		@for (group of groups; track group.category) {
			<section class="catalog">
				<h2 class="catalog__heading">{{ group.label }}</h2>
				<div class="catalog__grid">
					@for (page of group.pages; track page.slug) {
						<a [routerLink]="['/', page.slug]" class="page-card">
							<span class="page-card__title">
								{{ page.title }}
								<mat-icon>arrow_forward</mat-icon>
							</span>
							<span class="page-card__blurb">{{ page.blurb }}</span>
						</a>
					}
				</div>
			</section>
		}
	`,
	styles: `
		:host {
			display: block;
		}

		/* ── Hero ─────────────────────────────────────────────────────────── */
		.hero {
			padding-block: 1rem 2.5rem;
			border-block-end: 1px solid rgba(0, 0, 0, 0.08);
			margin-block-end: 2.5rem;
		}

		.hero__eyebrow {
			margin: 0;
			font-size: 0.8125rem;
			font-weight: 600;
			letter-spacing: 0.08em;
			text-transform: uppercase;
			color: #3f51b5;
		}

		.hero__title {
			font-size: clamp(2.5rem, 6vw, 3.5rem);
			font-weight: 700;
			letter-spacing: -0.02em;
			line-height: 1.05;
			margin: 0.4rem 0 0.75rem;
		}

		.hero__tagline {
			max-width: 62ch;
			margin: 0;
			font-size: 1.125rem;
			line-height: 1.55;
			color: rgba(0, 0, 0, 0.68);
		}

		.hero__actions {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			gap: 0.75rem;
			margin-block: 1.75rem 1.75rem;
		}

		.hero__install {
			max-width: 640px;
		}

		/* ── Feature grid ─────────────────────────────────────────────────── */
		.features {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
			gap: 1.5rem 2rem;
			margin-block-end: 3rem;
		}

		.feature {
			display: flex;
			gap: 0.85rem;
			align-items: flex-start;
		}

		.feature__icon {
			flex: none;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: 40px;
			height: 40px;
			border-radius: 10px;
			background: rgba(63, 81, 181, 0.1);
			color: #3f51b5;
		}

		.feature__title {
			font-size: 1rem;
			font-weight: 600;
			margin: 0.15rem 0 0.25rem;
		}

		.feature__desc {
			margin: 0;
			font-size: 0.9375rem;
			line-height: 1.5;
			color: rgba(0, 0, 0, 0.6);
		}

		/* ── Catalogue ────────────────────────────────────────────────────── */
		.catalog {
			margin-block-end: 2.5rem;
		}

		.catalog__heading {
			margin: 0 0 1rem;
		}

		.catalog__grid {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
			gap: 1rem;
		}

		.page-card {
			display: flex;
			flex-direction: column;
			gap: 0.35rem;
			padding: 1rem 1.1rem;
			border: 1px solid rgba(0, 0, 0, 0.12);
			border-radius: 12px;
			text-decoration: none;
			color: inherit;
			background: #fff;
			transition:
				border-color 120ms ease,
				box-shadow 120ms ease,
				transform 120ms ease;
		}

		.page-card:hover,
		.page-card:focus-visible {
			border-color: #3f51b5;
			box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
			transform: translateY(-2px);
			outline: none;
		}

		.page-card__title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-weight: 600;
			font-size: 1rem;
		}

		.page-card__title mat-icon {
			font-size: 18px;
			width: 18px;
			height: 18px;
			color: #3f51b5;
			opacity: 0;
			transform: translateX(-6px);
			transition:
				opacity 120ms ease,
				transform 120ms ease;
		}

		.page-card:hover .page-card__title mat-icon,
		.page-card:focus-visible .page-card__title mat-icon {
			opacity: 1;
			transform: none;
		}

		.page-card__blurb {
			font-size: 0.875rem;
			line-height: 1.5;
			color: rgba(0, 0, 0, 0.6);
		}

		@media (prefers-reduced-motion: reduce) {
			.page-card,
			.page-card__title mat-icon {
				transition: none;
			}
			.page-card:hover,
			.page-card:focus-visible {
				transform: none;
			}
		}
	`,
})
export class HomePage {
	protected readonly groups = groupedPages();
	protected readonly features = FEATURES;
	protected readonly installSnippet = INSTALL_SNIPPET;
}
