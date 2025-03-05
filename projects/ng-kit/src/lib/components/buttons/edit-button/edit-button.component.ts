import { Component, input } from '@angular/core';

import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { BaseButtonComponent } from '../base-button/base-button.component';

@Component({
    selector: 'edit-button',
    imports: [MatButton, MatIcon],
    template: `
		<button
			class="{{ classes() }}"
			(click)="onClick.emit($event)"
			(focus)="onFocus.emit($event)"
			(blur)="onBlur.emit($event)"
			[disabled]="disabled()"
			[type]="type()"
			[style]="style()"
			[attr.data-cy]="'edit-button'"
			mat-raised-button>
			<mat-icon>{{ icon() }}</mat-icon>
			{{ label() }}
		</button>
	`,
    styleUrls: ['../../../../assets/app-buttons.css']
})
export class EditButtonComponent extends BaseButtonComponent {
	override label = input('Edit');
	override icon = input('edit');
	override classes = input('primary-button');

	constructor() {
		super();
	}
}
