import { Component, input } from '@angular/core';
import { NgStyle } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { BaseButtonComponent } from '../base-button/base-button.component';

@Component({
	selector: 'view-primary-button',
	standalone: true,
	imports: [MatButton, MatIcon, NgStyle],
	template: `
		<button
			mat-raised-button
			class="btn {{ classes() }}"
			(click)="onClick.emit($event)"
			(focus)="onFocus.emit($event)"
			(blur)="onBlur.emit($event)"
			[disabled]="disabled()"
			[type]="type()"
			[ngStyle]="style()"
			[attr.data-cy]="'view-button'">
			<mat-icon>{{ icon() }}</mat-icon>
			{{ label() }}
		</button>
	`,
	styleUrls: ['../../../../assets/app-buttons.css'],
})
export class ViewPrimaryButtonComponent extends BaseButtonComponent {
	override label = input('View');
	override icon = input('visibility');
	override classes = input('btn-primary primary-button');

	constructor() {
		super();
	}
}
