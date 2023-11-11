import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'success-button',
	standalone: true,
	imports: [MatButtonModule, MatIconModule],
	template: `
		<button
			class="btn success-button {{ loading || disabled ? 'disabled' : '' }}"
			mat-raised-button
			type="{{ type }}"
			data-cy="success-button">
			@if(loading){
			<span aria-hidden="true" class="spinner-border spinner-border-sm" role="status"></span>
			} @if(!loading){
			<mat-icon>{{ icon }}</mat-icon>
			}
			{{ loading ? loadingLabel : label }}
		</button>
	`,
	styleUrls: ['../../../../assets/app-buttons.css'],
})
export class SuccessButtonComponent {
	/**
	 *  Is search in progress and loading the data
	 */
	@Input() loading: boolean | undefined = false;

	/**
	 *  Is button disabled, default is false
	 */
	@Input() disabled = false;

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
	@Input() loadingLabel = 'Updating...';

	/**
	 * If set, shows when search is not in progress
	 */
	@Input() label = 'Update';

	/**
	 * If set, shows the icon. Otherwise, shows save icon
	 */
	@Input() icon = 'save';
}
