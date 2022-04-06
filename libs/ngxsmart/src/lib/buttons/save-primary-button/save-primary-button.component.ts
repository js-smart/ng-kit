import { Component, Input, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@Component({
	selector: 'save-primary-button',
	template: `
		<button class="btn btn-primary {{ loading ? 'disabled' : '' }}" mat-raised-button type="{{ type }}">
			<span *ngIf="loading" aria-hidden="true" class="spinner-border spinner-border-sm" role="status"></span>
			<mat-icon *ngIf="!loading">{{ icon }}</mat-icon>
			{{ loading ? loadingLabel : label }}
		</button>`,
	styles: [`
		.btn-primary, .btn-primary:hover, .btn-primary:active, .btn-primary:visited {
			background-color: #193791 !important;
		}
	`]
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

@NgModule({
	imports: [CommonModule, MatIconModule, MatButtonModule],
	declarations: [SavePrimaryButtonComponent],
	exports: [SavePrimaryButtonComponent],
})
export class SavePrimaryButtonComponentModule {}
