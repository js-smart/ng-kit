import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'delete-button',
	standalone: true,
	imports: [MatButtonModule, MatIconModule],

	template: `
		<button [disabled]="disabled() || loading()" class="btn delete-button }}" mat-raised-button type="{{ type() }}" data-cy="delete-button">
			@if (loading()) {
				<span aria-hidden="true" class="spinner-border spinner-border-sm" role="status"></span>
			}
			@if (!loading()) {
				<mat-icon>{{ icon() }}</mat-icon>
			}
			{{ loading() ? loadingLabel() : label() }}
		</button>
	`,
	styleUrls: ['../../../../assets/app-buttons.css'],
})
export class DeleteButtonComponent {
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
	 * If set, shows when Delete in Progress
	 */
	loadingLabel = input('Deleting...');

	/**
	 * If set, shows when Delete is not in progress
	 */
	label = input('Delete');

	/**
	 * If set, shows the icon. Otherwise, shows delete icon
	 */
	icon = input('delete');
}
