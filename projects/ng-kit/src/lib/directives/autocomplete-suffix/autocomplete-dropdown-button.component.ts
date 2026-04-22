import { Component, output, signal } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
	selector: 'autocomplete-dropdown-button',
	standalone: true,
	imports: [MatIconButton, MatIcon],
	template: `
		<button
			mat-icon-button
			type="button"
			style="padding: 0 !important; width: 32px; height: 32px;"
			[attr.aria-label]="expanded() ? 'Close options' : 'Open options'"
			(click)="clicked.emit($event)">
			<mat-icon>{{ expanded() ? 'arrow_drop_up' : 'arrow_drop_down' }}</mat-icon>
		</button>
	`,
})
export class AutocompleteDropdownButtonComponent {
	readonly expanded = signal(false);
	readonly clicked = output<MouseEvent>();
}
