import { Type } from '@angular/core';

/** Top-level nav groupings, mirroring the ng-kit-docs categories. */
export type GalleryCategory = 'getting-started' | 'components' | 'buttons' | 'directives' | 'utilities';

export interface GalleryPage {
	/** URL slug and route path. */
	readonly slug: string;
	/** Display title (nav list, page heading, home card). */
	readonly title: string;
	/** Which nav group this page belongs to. */
	readonly category: GalleryCategory;
	/** One-line summary for the nav filter and home cards. */
	readonly blurb: string;
	/** Lazily-loaded standalone page component. */
	readonly load: () => Promise<Type<unknown>>;
}

/** Human-readable labels for each category (nav subheaders + home sections). */
export const CATEGORY_LABELS: Record<GalleryCategory, string> = {
	'getting-started': 'Getting Started',
	components: 'Components',
	buttons: 'Buttons',
	directives: 'Directives',
	utilities: 'Utilities',
};

/** Fixed display order for categories. */
export const CATEGORY_ORDER: readonly GalleryCategory[] = [
	'getting-started',
	'components',
	'buttons',
	'directives',
	'utilities',
];

/**
 * Every gallery page. Populated centrally (the fan-out agents each build a page
 * folder and hand back metadata; this list is assembled from those). The app
 * routes, sidenav nav list, and home overview grid all derive from this array.
 */
export const GALLERY_PAGES: readonly GalleryPage[] = [
	{
		slug: 'autocomplete',
		title: 'Autocomplete',
		category: 'components',
		blurb: 'Accessible signal-based autocomplete/combobox composed with Angular Material.',
		load: () => import('../pages/autocomplete/autocomplete.page').then((m) => m.AutocompletePage),
	},
];

/** Pages grouped by category, in display order — used by the shell and home page. */
export function groupedPages(): { category: GalleryCategory; label: string; pages: GalleryPage[] }[] {
	return CATEGORY_ORDER.map((category) => ({
		category,
		label: CATEGORY_LABELS[category],
		pages: GALLERY_PAGES.filter((p) => p.category === category),
	})).filter((group) => group.pages.length > 0);
}
