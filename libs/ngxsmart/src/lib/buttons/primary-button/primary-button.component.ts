import { Component, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'primary-button',
	template: `
		<button
			class="btn btn-primary primary-button {{ loading || disabled ? 'disabled' : '' }}"
			mat-raised-button
			type="{{ type }}"
			data-cy="primary-button">
			<span *ngIf="loading" aria-hidden="true" class="spinner-border spinner-border-sm" role="status"></span>
			<mat-icon *ngIf="!loading && showIcon">{{ icon }}</mat-icon>
			{{ loading ? loadingLabel : label }}
		</button>
	`,
	styles: [],
	encapsulation: ViewEncapsulation.None,
})
export class PrimaryButtonComponent {
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
	@Input() loadingLabel = 'Saving...';

	/**
	 * If set, shows when search is not in progress
	 */
	@Input() label = 'Save';

	/**
	 * If set, shows material icon
	 */
	@Input() icon = 'save';

	/**
	 * If set, shows material icon otherwise hides the icons
	 */
	@Input() showIcon = false;
}

@NgModule({
	imports: [CommonModule, MatButtonModule, MatIconModule],
	declarations: [PrimaryButtonComponent],
	exports: [PrimaryButtonComponent],
})
export class PrimaryButtonComponentModule {}
