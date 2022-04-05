import { Component, Input, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'app-search-button',
	template: `
		<button class="btn btn-primary {{ loading ? 'disabled' : '' }}" mat-raised-button type="{{ type }}">
			<span *ngIf="loading" aria-hidden="true" class="spinner-border spinner-border-sm" role="status"></span>
			<mat-icon *ngIf="!loading">search</mat-icon>
			{{ loading ? searchMessage : nonSearchMessage }}
		</button>
	`,
})
export class SearchButtonComponent implements OnInit {
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
	@Input() searchMessage = 'Searching...';

	/**
	 * If set, shows when search is not in progress
	 */
	@Input() nonSearchMessage = 'Search';

	constructor() {}

	ngOnInit(): void {}
}

@NgModule({
	declarations: [SearchButtonComponent],
	imports: [CommonModule, MatIconModule, MatButtonModule],
	exports: [SearchButtonComponent],
})
export class SearchButtonComponentModule {}
