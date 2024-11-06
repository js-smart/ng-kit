import { Component, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { EditSolidSvgComponent } from '../../../svg-icons/edit-solid-svg/edit-solid-svg.component';
import { BaseButtonComponent } from '../base-button/base-button.component';
import { NgStyle } from '@angular/common';

@Component({
    selector: 'edit-svg-icon-button',
    imports: [MatButton, EditSolidSvgComponent, NgStyle],
    template: `
		<button
			type="{{ type() }}"
			class="{{ classes() }}"
			(click)="onClick.emit($event)"
			(focus)="onFocus.emit($event)"
			(blur)="onBlur.emit($event)"
			[disabled]="disabled()"
			[type]="type()"
			[style]="style()"
			[attr.data-cy]="'edit-svg-icon-button'"
			mat-raised-button>
			<edit-solid-svg></edit-solid-svg>
			{{ label() }}
		</button>
	`,
    styleUrls: ['../../../../assets/app-buttons.css']
})
export class EditSvgIconButtonComponent extends BaseButtonComponent {
	override label = input('Edit');
	override icon = input('edit');
	override classes = input('primary-button');

	constructor() {
		super();
	}
}
