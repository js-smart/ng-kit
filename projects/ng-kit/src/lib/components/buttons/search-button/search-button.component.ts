import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BaseButtonComponent } from '../base-button/base-button.component';

@Component({
	selector: 'search-button',
	imports: [CommonModule, MatButtonModule, MatIconModule],
	template: `
		<button
			class="btn btn-primary primary-button {{ loading() || disabled() ? 'disabled' : '' }}"
			(click)="onClick.emit($event)"
			(focus)="onFocus.emit($event)"
			(blur)="onBlur.emit($event)"
			(keydown)="onKeyDown.emit($event)"
			(keyup)="onKeyUp.emit($event)"
			mat-raised-button
			type="{{ type() }}"
			data-cy="primary-button">
			@if (loading()) {
				<span aria-hidden="true" class="spinner-border spinner-border-sm" role="status"></span>
			}
			@if (!loading()) {
				<mat-icon>{{ icon() }}</mat-icon>
			}
			{{ loading() ? loadingLabel() : label() }}
		</button>
	`,
	styleUrls: ['../../../../assets/app-buttons.css'],
})
export class SearchButtonComponent extends BaseButtonComponent {
	override loadingLabel = input('Searching...');
	override label = input('Search');
	override icon = input('search');
	override classes = input('btn-primary primary-button');

	constructor() {
		super();
	}
}
