import { Component, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'manage-button',
	template: `
		<button class="mr-3 btn btn-secondary" mat-raised-button data-cy="manage-button">
			<mat-icon>{{ icon }}</mat-icon>
			{{ label }}
		</button>
	`,
	styles: [],
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
}

@NgModule({
	imports: [CommonModule, MatButtonModule, MatIconModule],
	declarations: [ManageButtonComponent],
	exports: [ManageButtonComponent],
})
export class ManageButtonComponentModule {}
