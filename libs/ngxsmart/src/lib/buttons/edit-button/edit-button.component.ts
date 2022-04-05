import {Component, Input, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
	selector: 'edit-button',
	template: `
		<button class="primary-button" mat-raised-button type="{{ type }}">
			<mat-icon>{{ icon }}</mat-icon>
			{{ message }}
		</button>
	`,
	styles: [
		`
			.primary-button {
				color: white;
				background-color: #193791;
			}
		`
	]
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
	@Input() type = 'button';

	/**
	 * If set, shows material icon
	 */
	@Input() icon = 'edit';

	/**
	 * If set, shows when search in progress
	 */
	@Input() message = 'Edit';
}

@NgModule({
	imports: [CommonModule, MatIconModule, MatButtonModule],
	declarations: [EditButtonComponent],
	exports: [EditButtonComponent],
})
export class EditButtonComponentModule {}
