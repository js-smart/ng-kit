import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
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
	imports: [RouterLink, MatButtonModule, MatCardModule, MatIconModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<section class="hero">
			<h1>ng-kit</h1>
			<p class="pitch">A component library for Angular — standalone components, directives, and utilities built on Angular Material with a signals-first API.</p>
		</section>

		<mat-card appearance="outlined" class="install-card">
			<mat-card-header>
				<mat-card-title>Install</mat-card-title>
			</mat-card-header>
			<mat-card-content>
				<div class="install-row">
					<pre class="code-block"><code>{{ installSnippet }}</code></pre>
					<button mat-icon-button color="primary" type="button" (click)="copyInstall()" [attr.aria-label]="installCopied() ? 'Copied' : 'Copy install command'">
						<mat-icon>{{ installCopied() ? 'check' : 'content_copy' }}</mat-icon>
					</button>
				</div>
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

		.install-row {
			display: flex;
			align-items: center;
			gap: 0.5rem;
		}

		.install-row .code-block {
			flex: 1;
			margin: 0;
		}

		.code-block {
			padding: 1rem;
			overflow-x: auto;
			border-radius: 8px;
			background: rgba(0, 0, 0, 0.04);
			font-family: 'Roboto Mono', ui-monospace, monospace;
			font-size: 0.8125rem;
			line-height: 1.5;
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
	protected readonly installCopied = signal(false);

	private installCopyResetHandle?: ReturnType<typeof setTimeout>;

	protected copyInstall(): void {
		void navigator.clipboard.writeText(this.installSnippet).then(() => {
			this.installCopied.set(true);
			if (this.installCopyResetHandle !== undefined) {
				clearTimeout(this.installCopyResetHandle);
			}
			this.installCopyResetHandle = setTimeout(() => this.installCopied.set(false), 2000);
		});
	}
}
