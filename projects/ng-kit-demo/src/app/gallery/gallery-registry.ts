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
	// Getting Started
	{
		slug: 'introduction',
		title: 'Introduction',
		category: 'getting-started',
		blurb: 'What ng-kit is and what it provides.',
		load: () => import('../pages/introduction/introduction.page').then((m) => m.IntroductionPage),
	},
	{
		slug: 'installation',
		title: 'Installation',
		category: 'getting-started',
		blurb: 'How to install and set up ng-kit.',
		load: () => import('../pages/installation/installation.page').then((m) => m.InstallationPage),
	},

	// Components
	{
		slug: 'autocomplete',
		title: 'Autocomplete',
		category: 'components',
		blurb: 'Accessible signal-based autocomplete/combobox composed with Angular Material.',
		load: () => import('../pages/autocomplete/autocomplete.page').then((m) => m.AutocompletePage),
	},
	{
		slug: 'alert',
		title: 'Alert',
		category: 'components',
		blurb: 'Dismissible contextual alert banners.',
		load: () => import('../pages/alert/alert.page').then((m) => m.AlertPage),
	},
	{
		slug: 'buttons',
		title: 'Buttons',
		category: 'components',
		blurb: 'A suite of themed action buttons built on a shared base.',
		load: () => import('../pages/buttons/buttons.page').then((m) => m.ButtonsPage),
	},
	{
		slug: 'confirm-dialog',
		title: 'Confirm Dialog',
		category: 'components',
		blurb: 'Material confirm dialog with a simple service API.',
		load: () => import('../pages/confirm-dialog/confirm-dialog.page').then((m) => m.ConfirmDialogPage),
	},
	{
		slug: 'snack-bar',
		title: 'Snack Bar',
		category: 'components',
		blurb: 'Success/error snackbars via MatSnackBarService.',
		load: () => import('../pages/snack-bar/snack-bar.page').then((m) => m.SnackBarPage),
	},
	{
		slug: 'spinner',
		title: 'Spinner',
		category: 'components',
		blurb: 'Loading spinner component.',
		load: () => import('../pages/spinner/spinner.page').then((m) => m.SpinnerPage),
	},

	// Directives
	{
		slug: 'ngx-print',
		title: 'Ngx Print',
		category: 'directives',
		blurb: 'Print a DOM section with the ngxPrint directive.',
		load: () => import('../pages/ngx-print/ngx-print.page').then((m) => m.NgxPrintPage),
	},
	{
		slug: 'prevent-multiple-clicks',
		title: 'Prevent Multiple Clicks',
		category: 'directives',
		blurb: 'Debounce rapid repeated button clicks.',
		load: () => import('../pages/prevent-multiple-clicks/prevent-multiple-clicks.page').then((m) => m.PreventMultipleClicksPage),
	},
	{
		slug: 'autocomplete-suffix',
		title: 'Autocomplete Suffix',
		category: 'directives',
		blurb: 'Clear + dropdown suffix buttons for a Material autocomplete input.',
		load: () => import('../pages/autocomplete-suffix/autocomplete-suffix.page').then((m) => m.AutocompleteSuffixPage),
	},

	// Utilities
	{
		slug: 'progress-util',
		title: 'Progress Util',
		category: 'utilities',
		blurb: 'ProgressState helper for tracking async progress.',
		load: () => import('../pages/progress-util/progress-util.page').then((m) => m.ProgressUtilPage),
	},
	{
		slug: 'query',
		title: 'TanStack Query',
		category: 'utilities',
		blurb: 'Angular adapter for TanStack Query (injectQuery/injectMutation).',
		load: () => import('../pages/query/query.page').then((m) => m.QueryPage),
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
