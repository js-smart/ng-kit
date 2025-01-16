import { Component, input } from '@angular/core';

import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { BaseButtonComponent } from '../base-button/base-button.component';

@Component({
    selector: 'manage-button',
    imports: [MatButton, MatIcon],
    template: `
		<button
			mat-raised-button
			class="{{ classes() }}"
			(click)="onClick.emit($event)"
			(focus)="onFocus.emit($event)"
			(blur)="onBlur.emit($event)"
			[disabled]="disabled()"
			[type]="type()"
			[style]="style()"
			[attr.data-cy]="'manage-button'">
			<mat-icon>{{ icon() }}</mat-icon>
			{{ label() }}
		</button>
	`,
    styleUrls: ['../../../../assets/app-buttons.css']
})
export class ManageButtonComponent extends BaseButtonComponent {
	override label = input('Manage');
	override icon = input('settings');
	override classes = input('mr-3 btn btn-secondary secondary-button');

	constructor() {
		super();
	}
}
