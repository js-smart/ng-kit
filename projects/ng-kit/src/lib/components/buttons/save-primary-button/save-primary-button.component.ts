import { Component, input } from '@angular/core';
import { BaseButtonComponent } from '../base-button/base-button.component';

import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'save-primary-button',
    imports: [MatButton, MatIcon],
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
			[attr.data-cy]="'save-primary-button'">
			@if (loading()) {
				<span aria-hidden="true" class="spinner-border spinner-border-sm" role="status"></span>
			}
			@if (!loading()) {
				<mat-icon>{{ icon() }}</mat-icon>
			}
			{{ loading() ? loadingLabel() : label() }}
		</button>
	`,
    styleUrls: ['../../../../assets/app-buttons.css']
})
export class SavePrimaryButtonComponent extends BaseButtonComponent {
	override loadingLabel = input('Saving...');
	override label = input('Save');
	override icon = input('save');
	override classes = input('btn-primary primary-button');

	constructor() {
		super();
	}
}
