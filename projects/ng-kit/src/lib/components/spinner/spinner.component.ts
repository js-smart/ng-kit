import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

/**
 * Centered, indeterminate Angular Material progress spinner.
 */
@Component({
	selector: 'spinner,lib-spinner',
	imports: [MatProgressSpinner],
	templateUrl: './spinner.component.html',
	changeDetection: ChangeDetectionStrategy.Eager,
	// Global styles keep the existing mx-auto class, scoped to the component host.
	styles: '@layer ng-kit { :is(spinner, lib-spinner) .mx-auto { margin-inline: auto; } }',
	encapsulation: ViewEncapsulation.None,
})
export class SpinnerComponent {
	/**
	 * @deprecated Has no effect: the component always renders the Angular Material progress spinner. Kept so existing
	 * `[bootstrapSpinner]` bindings still compile; it will be removed in a future major version.
	 */
	bootstrapSpinner = input(true);

	/**
	 * Diameter of the spinner in pixels. Default `50`
	 */
	diameter = input(50);

	/**
	 * Theme color of the spinner. Default `primary`
	 */
	color = input<ThemePalette>('primary');

	/**
	 * Stroke width of the spinner in pixels. Default `5`
	 */
	strokeWidth = input(5);
}
