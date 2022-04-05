import { Component, Input, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'app-success-button',
	template: `
		<button class="btn btn-success {{ loading || disabled ? 'disabled' : '' }}" mat-raised-button type="{{ type }}">
			<span *ngIf="loading" aria-hidden="true" class="spinner-border spinner-border-sm" role="status"></span>
			<mat-icon *ngIf="!loading">save</mat-icon>
			{{ loading ? loadingMessage : message }}
		</button>
	`,
})
export class SuccessButtonComponent implements OnInit {
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
	@Input() loadingMessage = 'Updating...';

	/**
	 * If set, shows when search is not in progress
	 */
	@Input() message = 'Update';

	constructor() {}

	ngOnInit(): void {}
}

@NgModule({
	declarations: [SuccessButtonComponent],
	imports: [CommonModule, MatIconModule, MatButtonModule],
	exports: [SuccessButtonComponent],
})
export class SuccessButtonComponentModule {}