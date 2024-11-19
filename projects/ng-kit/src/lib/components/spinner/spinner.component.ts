import { Component, input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'spinner,lib-spinner',
    imports: [MatProgressSpinnerModule],
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
	/**
	 *  Use Boostrap Spinner. Default `true`
	 */
	bootstrapSpinner = input(true);

	/**
	 * Diameter of the Angular Material spinner
	 */
	diameter = input(50);

	/**
	 *  Color of the Angular Material spinner
	 */
	color = input<ThemePalette>('primary');

	/**
	 *  Stroke Width of the Angular Material spinner
	 */
	strokeWidth = input(5);
}
