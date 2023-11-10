import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'manage-button',
	standalone: true,
	imports: [CommonModule, MatButtonModule, MatIconModule],
	template: `
		<button type="{{ type }}" class="mr-3 btn btn-secondary secondary-button" mat-raised-button data-cy="manage-button">
			<mat-icon>{{ icon }}</mat-icon>
			{{ label }}
		</button>
	`,
	styleUrls: ['../../../../assets/app-buttons.css'],
})
export class ManageButtonComponent {
	/**
	 * If set, shows when search is not in progress
	 */
	@Input() label = 'Manage';

	/**
	 * If set, shows material icon
	 */
	@Input() icon = 'settings';

	/**
	 * If set, shows button type. Defaults to 'button'. Other options are 'submit' and 'reset'
	 */
	@Input() type = 'button';
}
