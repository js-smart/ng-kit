import {Component, Input, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
	selector: 'mib-air-view-button',
	template: `
		<button class="primary-button" mat-raised-button type="{{ type }}">
			<mat-icon>{{ icon }}</mat-icon>
			{{ message }}
		</button>
	`,
	styles: [],
})
export class ViewButtonComponent {
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
	@Input() message = 'View';
}

@NgModule({
	imports: [CommonModule, MatIconModule, MatButtonModule],
	declarations: [ViewButtonComponent],
	exports: [ViewButtonComponent],
})
export class ViewButtonComponentModule {}
