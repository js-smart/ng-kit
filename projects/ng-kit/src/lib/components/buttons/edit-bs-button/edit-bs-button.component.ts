import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BaseButtonComponent } from '../base-button/base-button.component';

@Component({
	selector: 'edit-bs-button',
	imports: [MatButtonModule, MatIconModule],
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
			<mat-icon class="edit-square-icon">{{ icon() }}</mat-icon>
			{{ label() }}
		</button>
	`,
	changeDetection: ChangeDetectionStrategy.Eager,
	styleUrls: ['../../../../assets/app-buttons.css'],
})
export class EditBsButtonComponent extends BaseButtonComponent {
	override label = input('Edit');
	override icon = input('edit_square');
	override classes = input('text-primary');

	constructor() {
		super();
	}
}
