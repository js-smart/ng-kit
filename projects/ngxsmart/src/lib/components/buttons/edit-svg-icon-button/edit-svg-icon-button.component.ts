import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { EditSolidSvgComponent } from '../../../svg-icons/edit-solid-svg/edit-solid-svg.component';

@Component({
	selector: 'edit-svg-icon-button',
	standalone: true,
	imports: [CommonModule, MatButtonModule, EditSolidSvgComponent],

	template: `
		<button class="primary-button" mat-raised-button type="{{ type() }}" data-cy="edit-svg-icon-button">
			<edit-solid-svg></edit-solid-svg>
			{{ label() }}
		</button>
	`,
	styleUrls: ['../../../../assets/app-buttons.css'],
})
export class EditSvgIconButtonComponent {
	/**
	 * Type of the button. Following values are supported. See BootStrap docs for mor
	 * e information
	 * <pre>
	 *   1. button
	 *   2. submit
	 * </pre>
	 */
	type = input('button');

	/**
	 * If set, shows material icon
	 */
	icon = input('edit');

	/**
	 * If set, shows the label on the button
	 */
	label = input('Edit');
}
