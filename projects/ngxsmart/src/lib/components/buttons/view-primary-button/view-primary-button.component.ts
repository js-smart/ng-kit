import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'view-primary-button',
	standalone: true,
	imports: [CommonModule, MatButtonModule, MatIconModule],
	template: `
		<button class="btn btn-primary primary-button" mat-raised-button type="{{ type }}" data-cy="view-button">
			<mat-icon>{{ icon }}</mat-icon>
			{{ label }}
		</button>
	`,
	styleUrls: ['../../../../assets/app-buttons.css'],
})
export class ViewPrimaryButtonComponent {
	/**
	 * Type of the button. Following values are supported. See BootStrap docs for more information
	 * <pre>
	 *   1. button
	 *   2. submit
	 * </pre>
	 */
	@Input() type = 'button';

	/**
	 * If set, shows material icon
	 */
	@Input() icon = 'visibility';

	/**
	 * If set, shows when search is not in progress
	 */
	@Input() label = 'View';
}
