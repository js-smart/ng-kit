import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { NgKitStyleLoader } from '../../styles/style-loader';

/**
 * Style-only component that carries the CSS used by the button directives. It is never rendered; see {@link injectButtonStyles}.
 *
 * @internal
 */
@Component({
	selector: 'ngk-style-carrier',
	template: '',
	styleUrl: './button-styles.css',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgKitButtonStyles {}

/**
 * Adds the button directive styles to the document (once per application). Must be called in an injection context.
 *
 * @internal
 */
export function injectButtonStyles(): void {
	inject(NgKitStyleLoader).load(NgKitButtonStyles);
}
