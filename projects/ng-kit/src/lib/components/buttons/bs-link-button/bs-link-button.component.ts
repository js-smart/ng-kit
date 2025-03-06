import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor } from '@angular/material/button';
import { BaseButtonComponent } from '../base-button/base-button.component';

@Component({
	selector: 'bs-link-button',
	imports: [MatIcon, MatAnchor],
	template: `
		<a
			type="{{ type() }}"
			class="{{ classes() }}"
			(click)="onClick.emit($event)"
			(focus)="onFocus.emit($event)"
			(blur)="onBlur.emit($event)"
			(keydown)="onKeyDown.emit($event)"
			(keyup)="onKeyUp.emit($event)"
			[disabled]="disabled()"
			[type]="type()"
			[style]="style()"
			[attr.data-cy]="'edit-link-button'"
			mat-button>
			<mat-icon>{{ icon() }}</mat-icon>
			{{ label() }}
		</a>
	`,
	styleUrls: ['../../../../assets/app-buttons.css'],
})
export class BsLinkButtonComponent extends BaseButtonComponent {
	override label = input('Edit');
	override icon = input('search');
	override classes = input('btn text-primary');

	constructor() {
		super();
	}
}
