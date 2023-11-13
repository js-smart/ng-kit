import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'save-primary-button',
	standalone: true,
	imports: [MatButtonModule, MatIconModule],
	template: ` <button
		class="btn btn-primary primary-button {{ loading ? 'disabled' : '' }}"
		mat-raised-button
		type="{{ type }}"
		data-cy="save-primary-button">
		@if (loading) {
			<span aria-hidden="true" class="spinner-border spinner-border-sm" role="status"></span>
		}
		@if (!loading) {
			<mat-icon>{{ icon }}</mat-icon>
		}
		{{ loading ? loadingLabel : label }}
	</button>`,
	styleUrls: ['../../../../assets/app-buttons.css'],
})
export class SavePrimaryButtonComponent {
	/**
	 *  Is search in progress and loading the data
	 */
	@Input() loading: boolean | undefined = false;

	/**
	 * Type of the button. Following values are supported. See BootStrap docs for more information
	 * <pre>
	 *   1. button
	 *   2. submit
	 * </pre>
	 */
	@Input() type = 'button';

	/**
	 * If set, shows when search in progress
	 */
	@Input() loadingLabel = 'Saving...';

	/**
	 * If set, shows when search is not in progress
	 */
	@Input() label = 'Save';

	/**
	 * If set, shows material icon
	 */
	@Input() icon = 'save';
}
