import { DemoConfig } from '../../../types/demo-config';

/**
 * Input for {@link buildAutocompleteExampleConfig}.
 */
export interface AutocompleteExampleConfigInput {
	/** Human-readable example title, e.g. "Combo box". */
	title: string;
	/**
	 * Kebab-case component name used as the StackBlitz filename and to derive the
	 * class name. `combo-box` produces `combo-box.component.ts` and expects the
	 * source in {@link code} to export `class ComboBoxComponent`.
	 */
	componentName: string;
	/** Complete, runnable component source (single source of truth for view-source + StackBlitz). */
	code: string;
}

/**
 * Builds a {@link DemoConfig} for an Autocomplete gallery example so it can be
 * launched in StackBlitz via `StackBlitzService.openDemo`.
 *
 * Templates are inline in each example's source, so `componentHtml` is empty.
 * `BrowserAnimationsModule` is required for Material overlay/ripple animations;
 * every other module each example needs is already declared inside the source's
 * own component `imports` array.
 */
export function buildAutocompleteExampleConfig(input: AutocompleteExampleConfigInput): DemoConfig {
	return {
		title: input.title,
		description: `${input.title} — @js-smart/ng-kit Autocomplete example`,
		componentName: input.componentName,
		componentTs: input.code,
		componentHtml: '',
		requiredImports: ['BrowserAnimationsModule'],
	};
}
