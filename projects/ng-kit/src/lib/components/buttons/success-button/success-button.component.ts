import { Component, input } from '@angular/core';
import { BaseButtonComponent } from '../base-button/base-button.component';
import { NgStyle } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'success-button',
    imports: [NgStyle, MatButton, MatIcon],
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
			[attr.data-cy]="'success-button'">
			@if (loading()) {
				<span aria-hidden="true" class="spinner-border spinner-border-sm" role="status"></span>
			}
			@if (!loading()) {
				<mat-icon>{{ icon() }}</mat-icon>
			}
			{{ loading() ? loadingLabel() : label() }}
		</button>
	`
})
export class SuccessButtonComponent extends BaseButtonComponent {
	override loadingLabel = input('Updating...');
	override label = input('Update');
	override icon = input('save');
	override classes = input('success-button');

	constructor() {
		super();
	}
}
