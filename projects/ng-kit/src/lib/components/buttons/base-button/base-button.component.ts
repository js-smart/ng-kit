import { Component, input, output } from '@angular/core';

@Component({
	standalone: true,
	template: ``,
})
export class BaseButtonComponent {
	/**
	 *  Is search in progress and loading the data
	 */
	loading = input<boolean>(false);

	/**
	 *  Is button disabled
	 */
	disabled = input<boolean>(false);

	/**
	 * Type of the button. Following values are supported. See BootStrap docs for more information
	 * <pre>
	 *   1. button
	 *   2. submit
	 * </pre>
	 */
	type = input('button');

	/**
	 * If set, shows when action in Progress
	 */
	loadingLabel = input('Saving...');

	/**
	 * If set, shows when Delete is not in progress
	 */
	label = input('Save');

	/**
	 * If set, shows the icon. Otherwise, shows delete icon
	 */
	icon = input('save');

	/**
	 * If set, shows material icon otherwise hides the icons
	 */
	showIcon = input(true);

	/**
	 * If set, sets the style of the button
	 */
	style = input<{ [name: string]: any } | null | undefined>();

	/**
	 * If set, sets the class of the button
	 */
	classes = input('btn');

	/**
	 * If set, sets the data-cy attribute for the button
	 */
	dataCy = input('save-button');

	/**
	 *  Output event when button is clicked
	 */
	onClick = output<MouseEvent>();

	/**
	 *  Output event when button is focused
	 */
	onFocus = output<FocusEvent>();

	/**
	 * Output event when button is blurred
	 */
	onBlur = output<FocusEvent>();
}
