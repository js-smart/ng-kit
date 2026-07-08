import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { EDIT_SOLID_SVG_ICON_NAME, EditSolidSvgIconRegistry } from './edit-solid-svg-icon.registry';

@Component({
	selector: 'edit-solid-svg',
	imports: [MatIconModule],
	template: `
		<mat-icon
			[class]="iconClass()"
			[style.font-size]="size()"
			aria-hidden="true"
			[svgIcon]="svgIconName" />
	`,
	styles: [
		`
			:host {
				display: contents;
			}

			mat-icon {
				display: inline-flex;
				align-items: center;
				justify-content: center;
				flex-shrink: 0;
				width: 1em;
				height: 1em;
				line-height: 1;
				overflow: visible;
				vertical-align: middle;
			}

			mat-icon svg {
				display: block;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditSolidSvgComponent {
	protected readonly svgIconName = EDIT_SOLID_SVG_ICON_NAME;
	iconClass = input('');
	size = input('1rem');

	// Ensure the SVG icon is registered once per application.
	private readonly _ = inject(EditSolidSvgIconRegistry);
}
