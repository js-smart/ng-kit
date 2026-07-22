import { DemoConfig } from '../types/demo-config';

/**
 * Input for {@link buildDemoConfig}.
 */
export interface DemoConfigInput {
	/** Human-readable example title, e.g. "Basic". */
	title: string;
	/**
	 * Kebab-case component name used as the StackBlitz filename and to derive the
	 * class name. `basic-alert` produces `basic-alert.component.ts` and expects the
	 * source in {@link code} to export `class BasicAlertComponent`.
	 */
	componentName: string;
	/** Complete, runnable component source (single source of truth for view-source + StackBlitz). */
	code: string;
	/** Optional StackBlitz description; defaults to `"<title> — @js-smart/ng-kit example"`. */
	description?: string;
	/**
	 * Angular modules the StackBlitz app needs registered via `importProvidersFrom`
	 * (e.g. `BrowserAnimationsModule` for Material overlays/ripples). Every module a
	 * component itself imports belongs in its own `imports` array, not here.
	 * Defaults to `['BrowserAnimationsModule']`.
	 */
	requiredImports?: string[];
	/** Optional external template markup; defaults to empty (templates are inline in {@link code}). */
	componentHtml?: string;
	/** Optional provider expressions injected into the StackBlitz `app.config.ts`. */
	additionalProviders?: string[];
	/** Optional extra files (path → contents) merged into the StackBlitz project. */
	additionalFiles?: Record<string, string>;
}

/**
 * Builds a {@link DemoConfig} for a gallery example so it can be launched in
 * StackBlitz via `StackBlitzService.openDemo`. The generic counterpart to the
 * autocomplete-specific `buildAutocompleteExampleConfig`, shared by every
 * {@link DemoCard} across the gallery.
 */
export function buildDemoConfig(input: DemoConfigInput): DemoConfig {
	return {
		title: input.title,
		description: input.description ?? `${input.title} — @js-smart/ng-kit example`,
		componentName: input.componentName,
		componentTs: input.code,
		componentHtml: input.componentHtml ?? '',
		requiredImports: input.requiredImports ?? ['BrowserAnimationsModule'],
		additionalProviders: input.additionalProviders,
		additionalFiles: input.additionalFiles,
	};
}
