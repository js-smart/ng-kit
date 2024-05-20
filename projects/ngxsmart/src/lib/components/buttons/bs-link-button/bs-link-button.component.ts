import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor, MatButton } from '@angular/material/button';
import { EditSolidSvgComponent } from '../../../svg-icons/edit-solid-svg/edit-solid-svg.component';
import { BaseButtonComponent } from '../base-button/base-button.component';
import { NgStyle } from '@angular/common';

@Component({
	selector: 'bs-link-button',
	standalone: true,
	imports: [MatButton, MatIcon, EditSolidSvgComponent, MatAnchor, NgStyle],
	template: `
		<a
			type="{{ type() }}"
			class="{{ classes() }}"
			(click)="onClick.emit($event)"
			(focus)="onFocus.emit($event)"
			(blur)="onBlur.emit($event)"
			[disabled]="disabled()"
			[type]="type()"
			[ngStyle]="style()"
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
