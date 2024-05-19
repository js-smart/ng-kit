import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'search-button',
	standalone: true,
	imports: [CommonModule, MatButtonModule, MatIconModule],

	template: `
		<button
			class="btn btn-primary primary-button {{ loading() || disabled() ? 'disabled' : '' }}"
			mat-raised-button
			type="{{ type() }}"
			data-cy="primary-button">
			@if (loading()) {
				<span aria-hidden="true" class="spinner-border spinner-border-sm" role="status"></span>
			}
			@if (!loading()) {
				<mat-icon>search</mat-icon>
			}
			{{ loading() ? loadingLabel() : label() }}
		</button>
	`,
	styleUrls: ['../../../../assets/app-buttons.css'],
})
export class SearchButtonComponent {
	/**
	 *  Is search in progress and loading the data
	 */
	loading = input<boolean>(false);

	/**
	 *  Is button disabled, default is false
	 */
	disabled = input(false);

	/**
	 * Type of the button. Following values are supported. See BootStrap docs for more information
	 * <pre>
	 *   1. button
	 *   2. submit
	 * </pre>
	 */
	type = input('button');

	/**
	 * If set, shows when search in progress
	 */
	loadingLabel = input('Searching...');

	/**
	 * If set, shows when search is not in progress
	 */
	label = input('Search');
}
