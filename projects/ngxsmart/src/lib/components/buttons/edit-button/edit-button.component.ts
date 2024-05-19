import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'edit-button',
	standalone: true,
	imports: [CommonModule, MatButtonModule, MatIconModule],

	template: `
		<button class="primary-button" mat-raised-button type="{{ type() }}" data-cy="edit-button">
			<mat-icon>{{ icon() }}</mat-icon>
			{{ label() }}
		</button>
	`,
	styleUrls: ['../../../../assets/app-buttons.css'],
})
export class EditButtonComponent {
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
	 * If set, shows the label
	 */
	label = input('Edit');
}
