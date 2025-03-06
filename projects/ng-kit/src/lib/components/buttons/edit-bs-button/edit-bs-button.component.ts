import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EditSolidSvgComponent } from '../../../svg-icons/edit-solid-svg/edit-solid-svg.component';
import { BaseButtonComponent } from '../base-button/base-button.component';

@Component({
	selector: 'edit-bs-button',
	imports: [CommonModule, MatButtonModule, MatIconModule, EditSolidSvgComponent],
	template: `
		<button
			color="primary"
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
			[attr.data-cy]="'edit-bs-button'"
			mat-button>
			<edit-solid-svg></edit-solid-svg>
			{{ label() }}
		</button>
	`,
	styleUrls: ['../../../../assets/app-buttons.css'],
})
export class EditBsButtonComponent extends BaseButtonComponent {
	override label = input('Edit');
	override classes = input('text-primary');

	constructor() {
		super();
	}
}
