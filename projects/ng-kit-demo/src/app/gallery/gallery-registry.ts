import { Type } from '@angular/core';

/** Top-level nav groupings, mirroring the ng-kit-docs categories. */
export type GalleryCategory = 'getting-started' | 'components' | 'directives' | 'utilities';

export interface GalleryPage {
	/** URL slug and route path (a full path for nested pages, e.g. `buttons/base-button`). */
	readonly slug: string;
	/** Display title (nav list, page heading, home card). */
	readonly title: string;
	/** Which nav group this page belongs to. */
	readonly category: GalleryCategory;
	/** One-line summary for the nav filter and home cards. */
	readonly blurb: string;
	/** Lazily-loaded standalone page component. */
	readonly load: () => Promise<Type<unknown>>;
	/**
	 * When set, this page is a child of the named expandable group within its
	 * category (e.g. `'buttons'`). Grouped pages render nested in the sidenav.
	 */
	readonly group?: string;
}

/**
 * An expandable nav group (e.g. Buttons, Autocomplete): a family of pages shown
 * as a collapsible node in the sidenav. The group's own card / node links to
 * its introduction page.
 */
export interface GalleryGroup {
	/** Group key, matched against a page's `group` field (e.g. `'buttons'`). */
	readonly key: string;
	/** Display title for the group node / home card. */
	readonly title: string;
	/** Category the group lives under. */
	readonly category: GalleryCategory;
	/** One-line summary for the home card. */
	readonly blurb: string;
	/** Landing page the group node / home card links to. */
	readonly introSlug: string;
}

/** Human-readable labels for each category (nav subheaders + home sections). */
export const CATEGORY_LABELS: Record<GalleryCategory, string> = {
	'getting-started': 'Getting Started',
	components: 'Components',
	directives: 'Directives',
	utilities: 'Utilities',
};

/** Fixed display order for categories. */
export const CATEGORY_ORDER: readonly GalleryCategory[] = ['getting-started', 'components', 'directives', 'utilities'];

/** Expandable groups, keyed by `group`. */
export const GALLERY_GROUPS: readonly GalleryGroup[] = [
	{
		key: 'autocomplete',
		title: 'Autocomplete',
		category: 'components',
		blurb: 'Accessible signal-based autocomplete/combobox composed with Angular Material.',
		introSlug: 'autocomplete/introduction',
	},
	{
		key: 'buttons',
		title: 'Buttons',
		category: 'components',
		blurb: 'A suite of themed action buttons built on a shared base.',
		introSlug: 'buttons/introduction',
	},
];

/**
 * Every gallery page in nav / prev-next display order. Nested pages carry a full
 * path slug (`buttons/base-button`) and a `group` key; the sidenav tree, the
 * home overview grid, the app routes, and prev/next navigation all derive from
 * this array (plus {@link GALLERY_GROUPS} for the collapsible group nodes).
 */
export const GALLERY_PAGES: readonly GalleryPage[] = [
	// ── Getting Started ──────────────────────────────────────────────────────
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

	// ── Components ───────────────────────────────────────────────────────────
	{
		slug: 'alert',
		title: 'Alert',
		category: 'components',
		blurb: 'Dismissible contextual alert banners.',
		load: () => import('../pages/alert/alert.page').then((m) => m.AlertPage),
	},

	// Autocomplete (group: introduction + one page per example)
	{
		slug: 'autocomplete/introduction',
		title: 'Introduction',
		category: 'components',
		group: 'autocomplete',
		blurb: 'Overview and API reference for the autocomplete/combobox.',
		load: () => import('../pages/autocomplete/autocomplete-intro.page').then((m) => m.AutocompleteIntroPage),
	},
	...autocompletePages(),

	// Buttons (group: introduction + one page per button)
	{
		slug: 'buttons/introduction',
		title: 'Introduction',
		category: 'components',
		group: 'buttons',
		blurb: 'Overview and shared API reference for every button.',
		load: () => import('../pages/buttons/buttons-intro.page').then((m) => m.ButtonsIntroPage),
	},
	...buttonPages(),

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

	// ── Directives ───────────────────────────────────────────────────────────
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

	// ── Utilities ────────────────────────────────────────────────────────────
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

/** Buttons group children — one page per button, in sidenav order. */
function buttonPages(): GalleryPage[] {
	const detail = () => import('../pages/buttons/button-detail.page').then((m) => m.ButtonDetailPage);
	const entries: { slug: string; title: string; blurb: string }[] = [
		{ slug: 'base-button', title: 'Base Button', blurb: 'The shared base supplying icon, label and loading behaviour.' },
		{ slug: 'bootstrap-link-button', title: 'Bootstrap Link Button', blurb: 'An anchor styled as a Bootstrap button.' },
		{ slug: 'close-button', title: 'Close Button', blurb: 'A dismiss button for dialogs, alerts and panels.' },
		{ slug: 'delete-button', title: 'Delete Button', blurb: 'A destructive delete button.' },
		{ slug: 'edit-bootstrap-button', title: 'Edit Bootstrap Button', blurb: 'An edit button with Bootstrap button styling.' },
		{ slug: 'edit-button', title: 'Edit Button', blurb: 'The default edit button.' },
		{ slug: 'edit-svg-icon-button', title: 'Edit SVG Icon Button', blurb: 'An icon-only edit button rendering an inline SVG pencil.' },
		{ slug: 'excel-export-button', title: 'Excel Export Button', blurb: 'Exports tabular data to a spreadsheet.' },
		{ slug: 'manage-button', title: 'Manage Button', blurb: 'A button for management / settings entry points.' },
		{ slug: 'pdf-export-button', title: 'PDF Export Button', blurb: 'Exports tabular data to a PDF document.' },
		{ slug: 'primary-button', title: 'Primary Button', blurb: 'The default call-to-action button.' },
		{ slug: 'save-primary-button', title: 'Save Primary Button', blurb: "A primary button with a save icon and 'Saving…' state." },
		{ slug: 'success-button', title: 'Success Button', blurb: 'A green, positive-affirmation button.' },
		{ slug: 'search-button', title: 'Search Button', blurb: 'A button styled for search / filter triggers.' },
		{ slug: 'view-button', title: 'View Button', blurb: 'A subtle view / details button.' },
		{ slug: 'view-primary-button', title: 'View Primary Button', blurb: 'A view button with primary emphasis.' },
	];
	return entries.map((e) => ({
		slug: `buttons/${e.slug}`,
		title: e.title,
		category: 'components' as const,
		group: 'buttons',
		blurb: e.blurb,
		load: detail,
	}));
}

/** Autocomplete group children — one page per example, in sidenav order. */
function autocompletePages(): GalleryPage[] {
	const example = () => import('../pages/autocomplete/autocomplete-example.page').then((m) => m.AutocompleteExamplePage);
	const entries: { slug: string; title: string; blurb: string }[] = [
		{ slug: 'combo-box', title: 'Combo Box', blurb: 'Basic single-select with a filtered list of options.' },
		{ slug: 'country-select', title: 'Country Select', blurb: 'Custom option template with a flag and dial code.' },
		{ slug: 'disabled-options', title: 'Disabled Options', blurb: 'Every 3rd option is disabled and cannot be selected.' },
		{ slug: 'sizes-appearances', title: 'Sizes & Appearances', blurb: 'Every combination of size and appearance.' },
		{ slug: 'checkboxes', title: 'Checkboxes', blurb: 'Multi-select with checkboxes; popup stays open after each pick.' },
		{ slug: 'fixed-tags', title: 'Fixed Tags', blurb: "Multi-select with fixed chips that can't be removed." },
		{ slug: 'free-solo', title: 'Free Solo', blurb: 'Type anything — the raw text becomes the value.' },
		{ slug: 'controlled', title: 'Controlled', blurb: 'Every piece of state is owned by external signals.' },
		{ slug: 'async', title: 'Asynchronous Requests', blurb: 'Simulates a server-side search: options load after each keystroke.' },
		{ slug: 'grouped', title: 'Grouped', blurb: 'Options grouped by their first letter via a pre-sorted group key.' },
		{ slug: 'virtualized', title: 'Virtualized', blurb: 'Single-select over 10,000 options, rendered virtually.' },
		{ slug: 'custom-render', title: 'Custom Rendering', blurb: 'Custom option markup with query highlighting and a custom paper surface.' },
		{ slug: 'playground', title: 'Playground', blurb: 'Flip every input live to see how the autocomplete reacts.' },
	];
	return entries.map((e) => ({
		slug: `autocomplete/${e.slug}`,
		title: e.title,
		category: 'components' as const,
		group: 'autocomplete',
		blurb: e.blurb,
		load: example,
	}));
}

/** A sidenav node: either a standalone page or an expandable group of pages. */
export type NavNode =
	| { readonly kind: 'page'; readonly page: GalleryPage }
	| { readonly kind: 'group'; readonly key: string; readonly title: string; readonly introSlug: string; readonly pages: GalleryPage[] };

/** Category with its ordered nav nodes — drives the sidenav tree. */
export interface NavSection {
	readonly category: GalleryCategory;
	readonly label: string;
	readonly nodes: NavNode[];
}

/**
 * The sidenav tree: categories, each holding an ordered mix of standalone pages
 * and expandable groups. A group node is inserted at the position of its first
 * child page and gathers every child in that category.
 */
export function navTree(): NavSection[] {
	return CATEGORY_ORDER.map((category) => {
		const pages = GALLERY_PAGES.filter((p) => p.category === category);
		const nodes: NavNode[] = [];
		const seenGroups = new Set<string>();
		for (const page of pages) {
			if (!page.group) {
				nodes.push({ kind: 'page', page });
				continue;
			}
			if (seenGroups.has(page.group)) {
				continue;
			}
			seenGroups.add(page.group);
			const group = GALLERY_GROUPS.find((g) => g.key === page.group);
			if (!group) {
				continue;
			}
			nodes.push({
				kind: 'group',
				key: group.key,
				title: group.title,
				introSlug: group.introSlug,
				pages: pages.filter((p) => p.group === group.key),
			});
		}
		return { category, label: CATEGORY_LABELS[category], nodes };
	}).filter((section) => section.nodes.length > 0);
}

/** A home overview card: a standalone page, or a group collapsed to one card. */
export interface HomeCard {
	readonly title: string;
	readonly blurb: string;
	readonly slug: string;
}

/** Home overview sections — groups collapse to a single card linking to their intro. */
export function homeSections(): { category: GalleryCategory; label: string; cards: HomeCard[] }[] {
	return navTree().map((section) => ({
		category: section.category,
		label: section.label,
		cards: section.nodes.map((node) =>
			node.kind === 'page'
				? { title: node.page.title, blurb: node.page.blurb, slug: node.page.slug }
				: { title: node.title, blurb: GALLERY_GROUPS.find((g) => g.key === node.key)!.blurb, slug: node.introSlug },
		),
	}));
}
