import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BaseButtonComponent } from '../base-button/base-button.component';
import { NgStyle } from '@angular/common';

@Component({
	selector: 'delete-button',
	standalone: true,
	imports: [MatButtonModule, MatIconModule, NgStyle],
	template: `
		<button
			mat-raised-button
			class="btn {{ classes() }}"
			(click)="onClick.emit($event)"
			(focus)="onFocus.emit($event)"
			(blur)="onBlur.emit($event)"
			[disabled]="disabled() || loading()"
			[type]="type()"
			[style]="style()"
			[attr.data-cy]="'delete-button'">
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
export class DeleteButtonComponent extends BaseButtonComponent {
	override loadingLabel = input('Deleting...');
	override label = input('Delete');
	override icon = input('delete');
	override classes = input('delete-button');

	constructor() {
		super();
	}
}
