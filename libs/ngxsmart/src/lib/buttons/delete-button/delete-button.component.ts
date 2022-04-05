import { Component, Input, NgModule, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@Component({
	selector: 'delete-button',
	template: `
		<button class="btn btn-danger {{ loading ? 'disabled' : '' }}" mat-raised-button type="{{ type }}">
			<span *ngIf="loading" aria-hidden="true" class="spinner-border spinner-border-sm" role="status"></span>
			<mat-icon *ngIf="!loading">delete</mat-icon>
			{{ loading ? loadingLabel : label }}
		</button>
	`,
})
export class DeleteButtonComponent implements OnInit {
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
	 * If set, shows when Delete in Progress
	 */
	@Input() loadingLabel = 'Deleting...';

	/**
	 * If set, shows when Delete is not in progress
	 */
	@Input() label = 'Delete';

	constructor() {}

	ngOnInit(): void {}
}

@NgModule({
	declarations: [DeleteButtonComponent],
	imports: [CommonModule, MatIconModule, MatButtonModule],
	exports: [DeleteButtonComponent],
})
export class DeleteButtonComponentModule {}
