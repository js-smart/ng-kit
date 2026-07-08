import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { BaseButtonComponent } from '../base-button/base-button.component';

@Component({
	selector: 'edit-svg-icon-button',
	imports: [MatButton, MatIcon],
	template: `
		<button
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
			[attr.data-cy]="'edit-svg-icon-button'"
			mat-raised-button>
			<mat-icon>{{ icon() }}</mat-icon>
			{{ label() }}
		</button>
	`,
	changeDetection: ChangeDetectionStrategy.Eager,
	styleUrls: ['../../../../assets/app-buttons.css'],
})
export class EditSvgIconButtonComponent extends BaseButtonComponent {
	override label = input('Edit');
	override icon = input('edit_square');
	override classes = input('primary-button');

	constructor() {
		super();
	}
}
