import { Component, output, ChangeDetectionStrategy } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
	selector: 'autocomplete-clear-button',
	standalone: true,
	imports: [MatIconButton, MatIcon],
	changeDetection: ChangeDetectionStrategy.Eager,
	template: `
		<button
			mat-icon-button
			type="button"
			aria-label="Clear value"
			style="padding: 0 !important; width: 32px; height: 32px;"
			(click)="clicked.emit($event)">
			<mat-icon>close</mat-icon>
		</button>
	`,
})
export class AutocompleteClearButtonComponent {
	readonly clicked = output<MouseEvent>();
}
