import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { GALLERY_PAGES, GalleryPage, groupedPages } from './gallery/gallery-registry';

/**
 * App shell: a Material toolbar + sidenav gallery, modelled on
 * ng-autocomplete-demo. Nav groups, the example filter, and prev/next
 * navigation are all derived from the gallery registry.
 */
@Component({
	selector: 'ng-kit-root',
	imports: [
		RouterLink,
		RouterLinkActive,
		RouterOutlet,
		MatToolbarModule,
		MatSidenavModule,
		MatListModule,
		MatIconModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
	],
	host: { class: 'shell' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<a class="skip-link" href="#main-content">Skip to content</a>

		<mat-toolbar color="primary" class="shell-toolbar">
			<button mat-icon-button type="button" class="hamburger" (click)="toggleSidenav()" aria-label="Toggle navigation">
				<mat-icon>menu</mat-icon>
			</button>

			<a routerLink="/" class="brand">ng-kit</a>

			<span class="spacer"></span>

			<a mat-icon-button href="https://github.com/js-smart/ng-kit" target="_blank" rel="noopener" aria-label="ng-kit on GitHub">
				<mat-icon svgIcon="github" />
			</a>
			<a mat-icon-button href="https://www.npmjs.com/package/@js-smart/ng-kit" target="_blank" rel="noopener" aria-label="ng-kit on npm">
				<mat-icon svgIcon="npm" />
			</a>
		</mat-toolbar>

		<mat-sidenav-container class="shell-body">
			<mat-sidenav [mode]="sidenavMode()" [opened]="sidenavOpened()" (openedChange)="sidenavOpened.set($event)" class="sidenav">
				<mat-form-field appearance="outline" class="search-field">
					<mat-icon matPrefix>search</mat-icon>
					<input matInput type="text" placeholder="Filter" aria-label="Filter pages" [value]="searchTerm()" (input)="onSearch($event)" />
				</mat-form-field>

				<mat-nav-list>
					<a mat-list-item routerLink="/" routerLinkActive="active-link" [routerLinkActiveOptions]="{ exact: true }">Overview</a>

					@for (group of filteredGroups(); track group.category) {
						<h3 matSubheader>{{ group.label }}</h3>
						@for (page of group.pages; track page.slug) {
							<a mat-list-item [routerLink]="['/', page.slug]" routerLinkActive="active-link" (click)="onNavLinkClick()">
								{{ page.title }}
							</a>
						}
					}
				</mat-nav-list>
			</mat-sidenav>

			<mat-sidenav-content class="content">
				<main id="main-content" tabindex="-1">
					<router-outlet />
				</main>

				@if (!isHome()) {
					<nav class="prev-next" aria-label="Page navigation">
						@if (prevPage(); as prev) {
							<a mat-button color="primary" [routerLink]="['/', prev.slug]">
								<mat-icon>chevron_left</mat-icon>
								{{ prev.title }}
							</a>
						} @else {
							<span></span>
						}

						@if (nextPage(); as next) {
							<a mat-button color="primary" [routerLink]="['/', next.slug]">
								{{ next.title }}
								<mat-icon>chevron_right</mat-icon>
							</a>
						}
					</nav>
				}
			</mat-sidenav-content>
		</mat-sidenav-container>
	`,
	styles: `
		:host.shell {
			display: flex;
			flex-direction: column;
			height: 100vh;
		}

		.skip-link {
			position: absolute;
			left: -999px;
			top: 0;
			z-index: 100;
			padding: 0.75rem 1rem;
			background: #fff;
			color: #1a1a1a;
		}

		.skip-link:focus {
			left: 0.5rem;
			top: 0.5rem;
		}

		.shell-toolbar {
			flex: 0 0 auto;
			gap: 0.5rem;
			position: sticky;
			top: 0;
			z-index: 2;
		}

		.brand {
			font-weight: 700;
			letter-spacing: -0.01em;
			color: inherit;
			text-decoration: none;
		}

		.spacer {
			flex: 1 1 auto;
		}

		.hamburger {
			display: none;
		}

		.shell-body {
			flex: 1 1 auto;
			min-height: 0;
		}

		.sidenav {
			width: 280px;
			padding: 1rem;
		}

		.search-field {
			width: 100%;
		}

		.content {
			padding: 2rem clamp(1rem, 4vw, 3rem);
		}

		main {
			outline: none;
			width: 100%;
		}

		.active-link {
			font-weight: 600;
		}

		.prev-next {
			display: flex;
			justify-content: space-between;
			margin-block-start: 2rem;
			padding-block-start: 1rem;
			border-block-start: 1px solid rgba(0, 0, 0, 0.12);
		}

		@media (max-width: 720px) {
			.hamburger {
				display: inline-flex;
			}
		}
	`,
})
export class AppComponent {
	private readonly router = inject(Router);
	private readonly breakpointObserver = inject(BreakpointObserver);
	private readonly iconRegistry = inject(MatIconRegistry);
	private readonly sanitizer = inject(DomSanitizer);

	protected readonly pages = GALLERY_PAGES;

	protected readonly searchTerm = signal('');

	protected readonly filteredGroups = computed(() => {
		const term = this.searchTerm().trim().toLowerCase();
		return groupedPages()
			.map((group) => ({
				...group,
				pages: term ? group.pages.filter((p) => p.title.toLowerCase().includes(term) || p.blurb.toLowerCase().includes(term)) : group.pages,
			}))
			.filter((group) => group.pages.length > 0);
	});

	private readonly isHandset = toSignal(this.breakpointObserver.observe('(max-width: 720px)').pipe(map((state) => state.matches)), {
		initialValue: false,
	});

	protected readonly sidenavMode = computed<'over' | 'side'>(() => (this.isHandset() ? 'over' : 'side'));
	protected readonly sidenavOpened = signal(true);

	private readonly currentUrl = toSignal(
		this.router.events.pipe(
			filter((event): event is NavigationEnd => event instanceof NavigationEnd),
			map((event) => event.urlAfterRedirects),
		),
		{ initialValue: this.router.url },
	);

	private readonly currentSlug = computed(() => this.currentUrl().replace(/^\/+/, '').split('?')[0]);
	protected readonly isHome = computed(() => this.currentSlug() === '');

	private readonly currentIndex = computed(() => GALLERY_PAGES.findIndex((p) => p.slug === this.currentSlug()));
	protected readonly prevPage = computed<GalleryPage | null>(() => {
		const index = this.currentIndex();
		return index > 0 ? GALLERY_PAGES[index - 1] : null;
	});
	protected readonly nextPage = computed<GalleryPage | null>(() => {
		const index = this.currentIndex();
		return index >= 0 && index < GALLERY_PAGES.length - 1 ? GALLERY_PAGES[index + 1] : null;
	});

	constructor() {
		// GitHub and npm brand marks as named SVG icons (Material Icons has no
		// brand logos). Paths from simple-icons (CC0), 24x24, currentColor.
		this.iconRegistry.addSvgIconLiteral(
			'github',
			this.sanitizer.bypassSecurityTrustHtml(
				'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
			),
		);
		this.iconRegistry.addSvgIconLiteral(
			'npm',
			this.sanitizer.bypassSecurityTrustHtml(
				'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z"/></svg>',
			),
		);

		// Keep the sidenav open on desktop, closed by default on handset.
		effect(() => {
			this.sidenavOpened.set(!this.isHandset());
		});
	}

	protected toggleSidenav(): void {
		this.sidenavOpened.update((opened) => !opened);
	}

	protected onNavLinkClick(): void {
		if (this.isHandset()) {
			this.sidenavOpened.set(false);
		}
	}

	protected onSearch(event: Event): void {
		this.searchTerm.set((event.target as HTMLInputElement).value);
	}
}
