import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal, viewChildren } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTree, MatTreeModule } from '@angular/material/tree';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { GALLERY_GROUPS, GALLERY_PAGES, GalleryPage, navTree } from './gallery/gallery-registry';
import { DemoSettings } from './shared/demo-settings';

/** A node in the sidenav Material tree: a navigable page, or an expandable group. */
interface SidenavNode {
	readonly title: string;
	/** Present on navigable leaf pages (full route path). */
	readonly slug?: string;
	/** Present on expandable group nodes (e.g. `buttons`). */
	readonly groupKey?: string;
	/** Child pages, present on group nodes. */
	readonly children?: SidenavNode[];
}

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
		MatTreeModule,
		MatIconModule,
		MatButtonModule,
	],
	host: { class: 'shell' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<a class="skip-link" href="#main-content">Skip to content</a>

		<mat-toolbar color="primary" class="shell-toolbar">
			<button mat-icon-button type="button" class="hamburger" (click)="toggleSidenav()" aria-label="Toggle navigation">
				<mat-icon>menu</mat-icon>
			</button>

			<a routerLink="/" class="brand">
				<img src="ng-kit-logo.png" alt="" class="brand-logo" />
				<span>NG Kit</span>
			</a>

			<span class="spacer"></span>

			<div class="header-search">
				<mat-icon aria-hidden="true">search</mat-icon>
				<input type="text" placeholder="Search" aria-label="Search" [value]="searchTerm()" (input)="onSearch($event)" />
			</div>

			<button
				mat-icon-button
				type="button"
				(click)="settings.cycleTheme()"
				[attr.aria-label]="'Theme: ' + settings.theme() + ' (click to change)'"
				[title]="'Theme: ' + settings.theme() + ' — click to change'">
				<mat-icon>{{ themeIcon() }}</mat-icon>
			</button>

			<a mat-icon-button href="https://github.com/js-smart/ng-kit" target="_blank" rel="noopener" aria-label="ng-kit on GitHub">
				<mat-icon svgIcon="github" />
			</a>
			<a mat-icon-button href="https://www.npmjs.com/package/@js-smart/ng-kit" target="_blank" rel="noopener" aria-label="ng-kit on npm">
				<mat-icon svgIcon="npm" />
			</a>
		</mat-toolbar>

		<mat-sidenav-container class="shell-body">
			<mat-sidenav [mode]="sidenavMode()" [opened]="sidenavOpened()" (openedChange)="sidenavOpened.set($event)" class="sidenav">
				<nav class="nav" aria-label="Components">
					<a class="nav-link nav-link--top" routerLink="/" routerLinkActive="active-link" [routerLinkActiveOptions]="{ exact: true }">Overview</a>

					@for (section of sections(); track section.category) {
						<h3 class="nav-subheader">{{ section.label }}</h3>
						<mat-tree #tree="matTree" [dataSource]="section.nodes" [childrenAccessor]="childrenAccessor" [expansionKey]="expansionKey" class="nav-tree">
							<!-- Navigable leaf page -->
							<mat-tree-node *matTreeNodeDef="let node" matTreeNodePadding [matTreeNodePaddingIndent]="16" class="nav-node">
								<a class="nav-link" [routerLink]="'/' + node.slug" routerLinkActive="active-link" [routerLinkActiveOptions]="{ exact: true }" (click)="onNavLinkClick()">
									{{ node.title }}
								</a>
							</mat-tree-node>

							<!-- Expandable group (e.g. Buttons, Autocomplete) -->
							<mat-tree-node *matTreeNodeDef="let node; when: hasChild" matTreeNodePadding [matTreeNodePaddingIndent]="16" class="nav-node">
								<button
									type="button"
									class="nav-group"
									matTreeNodeToggle
									[attr.aria-label]="'Toggle ' + node.title"
									[class.nav-group--active]="isGroupActive(node.groupKey)">
									<mat-icon class="nav-group__chevron">{{ tree.isExpanded(node) ? 'expand_more' : 'chevron_right' }}</mat-icon>
									<span class="nav-group__label">{{ node.title }}</span>
								</button>
							</mat-tree-node>
						</mat-tree>
					}
				</nav>
			</mat-sidenav>

			<mat-sidenav-content class="content">
				<main id="main-content" tabindex="-1">
					<router-outlet />
				</main>

				@if (!isHome()) {
					<nav class="prev-next" aria-label="Page navigation">
						@if (prevPage(); as prev) {
							<a mat-button color="primary" [routerLink]="'/' + prev.slug">
								<mat-icon>chevron_left</mat-icon>
								{{ prev.title }}
							</a>
						} @else {
							<span></span>
						}

						@if (nextPage(); as next) {
							<a mat-button color="primary" [routerLink]="'/' + next.slug">
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
			background: var(--mat-sys-surface);
			color: var(--mat-sys-on-surface);
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
			display: inline-flex;
			align-items: center;
			gap: 0.5rem;
			font-weight: 700;
			letter-spacing: -0.01em;
			color: inherit;
			text-decoration: none;
		}

		.brand-logo {
			height: 32px;
			width: auto;
			display: block;
		}

		/* Bold, readable category subheaders in the sidenav. */
		.nav-subheader {
			margin: 1rem 0 0.25rem;
			padding-inline: 0.75rem;
			font-size: 0.9375rem;
			font-weight: 700;
			color: var(--mat-sys-on-surface);
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
			background: var(--mat-sys-surface);
		}

		.sidenav {
			width: 280px;
			padding: 1rem;
		}

		.header-search {
			display: flex;
			align-items: center;
			gap: 0.4rem;
			flex: 0 1 320px;
			min-width: 0;
			margin-inline-end: 0.75rem;
			padding: 0 0.7rem;
			height: 38px;
			border-radius: 8px;
			background: rgba(255, 255, 255, 0.15);
			transition: background 120ms ease;
		}

		.header-search:focus-within {
			background: rgba(255, 255, 255, 0.25);
		}

		.header-search mat-icon {
			flex: none;
			color: rgba(255, 255, 255, 0.85);
			font-size: 20px;
			width: 20px;
			height: 20px;
		}

		.header-search input {
			flex: 1;
			min-width: 0;
			border: none;
			background: transparent;
			color: #fff;
			font: inherit;
			outline: none;
		}

		.header-search input::placeholder {
			color: rgba(255, 255, 255, 0.7);
		}

		@media (max-width: 599px) {
			.header-search {
				flex-basis: 140px;
			}
		}

		.content {
			padding: 2rem clamp(1rem, 4vw, 3rem);
			background: var(--mat-sys-surface);
			display: flex;
			flex-direction: column;
			min-height: 100%;
			box-sizing: border-box;
		}

		main {
			outline: none;
			width: 100%;
			flex: 1 0 auto;
		}

		/* ── Sidenav Material tree ────────────────────────────────────────── */
		.nav {
			display: flex;
			flex-direction: column;
		}

		.nav-tree {
			background: transparent;
		}

		/* Collapse the default 48px node height for a denser nav list. */
		.nav-node {
			min-height: 40px;
		}

		/* Shared row: navigable page link (leaf) and group toggle button. */
		.nav-link,
		.nav-group {
			display: flex;
			align-items: center;
			gap: 0.35rem;
			flex: 1;
			min-height: 36px;
			padding: 0.375rem 0.75rem;
			border-radius: 8px;
			color: var(--mat-sys-on-surface);
			text-decoration: none;
			font: inherit;
			font-size: 0.9375rem;
			line-height: 1.2;
		}

		.nav-link--top {
			margin-block-end: 0.25rem;
		}

		.nav-link:hover,
		.nav-group:hover {
			background: color-mix(in srgb, var(--mat-sys-on-surface) 6%, transparent);
		}

		/* Active page: light-blue pill + emphasised blue text (matches docs nav). */
		.nav-link.active-link {
			background: color-mix(in srgb, var(--mat-sys-primary) 12%, transparent);
			color: var(--mat-sys-primary);
			font-weight: 600;
		}

		/* Group toggle button. */
		.nav-group {
			width: 100%;
			background: none;
			border: none;
			cursor: pointer;
			text-align: start;
			font-weight: 700;
			color: var(--mat-sys-on-surface);
		}

		.nav-group--active .nav-group__label {
			color: var(--mat-sys-primary);
		}

		.nav-group__label {
			flex: 1;
			min-width: 0;
		}

		.nav-group__chevron {
			flex: none;
			color: var(--mat-sys-on-surface-variant);
			font-size: 20px;
			width: 20px;
			height: 20px;
		}

		.prev-next {
			display: flex;
			flex-wrap: wrap;
			gap: 1rem;
			justify-content: space-between;
			margin-block-start: 2rem;
			padding-block-start: 1rem;
			border-block-start: 1px solid var(--gallery-border);
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
	protected readonly settings = inject(DemoSettings);

	/** Toolbar theme-toggle icon, reflecting the active {@link DemoSettings.theme}. */
	protected readonly themeIcon = computed<string>(() => {
		switch (this.settings.theme()) {
			case 'light':
				return 'light_mode';
			case 'dark':
				return 'dark_mode';
			default:
				return 'brightness_auto';
		}
	});

	protected readonly searchTerm = signal('');

	/** The Material trees rendered per category — driven for auto-expansion. */
	private readonly trees = viewChildren<MatTree<SidenavNode>>('tree');

	/**
	 * The sidenav data, filtered by the search term and shaped into
	 * {@link SidenavNode}s for the Material tree. Standalone pages are kept when
	 * they match; a group is kept if its title matches (all children shown) or
	 * any child matches (only matching children shown).
	 */
	protected readonly sections = computed<{ category: string; label: string; nodes: SidenavNode[] }[]>(() => {
		const term = this.searchTerm().trim().toLowerCase();
		return navTree()
			.map((section) => ({
				category: section.category,
				label: section.label,
				nodes: section.nodes
					.map<SidenavNode | null>((node) => {
						if (node.kind === 'page') {
							const match = !term || node.page.title.toLowerCase().includes(term) || node.page.blurb.toLowerCase().includes(term);
							return match ? { title: node.page.title, slug: node.page.slug } : null;
						}
						const groupMatches = !term || node.title.toLowerCase().includes(term);
						const pages = groupMatches ? node.pages : node.pages.filter((p) => p.title.toLowerCase().includes(term) || p.blurb.toLowerCase().includes(term));
						if (pages.length === 0) {
							return null;
						}
						return { title: node.title, groupKey: node.key, children: pages.map((p) => ({ title: p.title, slug: p.slug })) };
					})
					.filter((node): node is SidenavNode => node !== null),
			}))
			.filter((section) => section.nodes.length > 0);
	});

	/** MatTree children accessor — group nodes expose their child pages. */
	protected readonly childrenAccessor = (node: SidenavNode): SidenavNode[] => node.children ?? [];

	/** Predicate selecting the expandable (group) node template. */
	protected readonly hasChild = (_: number, node: SidenavNode): boolean => (node.children?.length ?? 0) > 0;

	/** Stable expansion key so expand state survives dataSource rebuilds (filtering). */
	protected readonly expansionKey = (node: SidenavNode): string => node.groupKey ?? node.slug ?? node.title;

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

	private readonly currentSlug = computed(() => this.currentUrl().replace(/^\/+/, '').split(/[?#]/)[0]);
	protected readonly isHome = computed(() => this.currentSlug() === '');

	private readonly groupKeys = new Set(GALLERY_GROUPS.map((g) => g.key));

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

		// Auto-expand the group that owns the active route (so the current page is
		// visible after navigation/reload); expand everything while searching so
		// matching children are never hidden behind a collapsed group.
		effect(() => {
			const trees = this.trees();
			const searching = this.searchTerm().trim().length > 0;
			const activeKey = this.activeGroupKey();
			for (const tree of trees) {
				if (searching) {
					tree.expandAll();
					continue;
				}
				for (const node of tree.dataSource as SidenavNode[]) {
					if (node.groupKey && node.groupKey === activeKey) {
						tree.expand(node);
					}
				}
			}
		});
	}

	/** The group key owning the active route (e.g. `buttons`), or null. */
	private readonly activeGroupKey = computed<string | null>(() => {
		const first = this.currentSlug().split('/')[0];
		return this.groupKeys.has(first) ? first : null;
	});

	/** Whether the active route lives inside the given group. */
	protected isGroupActive(key: string | undefined): boolean {
		return !!key && this.activeGroupKey() === key;
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
