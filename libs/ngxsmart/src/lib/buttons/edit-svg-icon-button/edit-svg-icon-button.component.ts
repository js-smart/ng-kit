import { Component, Input, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { EditSolidSvgComponentModule } from "../../svg-icons/edit-solid-svg/edit-solid-svg.component";

@Component({
	selector: 'edit-svg-icon-button',
	template: `
		<button class="primary-button" mat-raised-button type="{{ type }}">
			<edit-solid-svg></edit-solid-svg>
			{{ label }}
		</button>
	`,
	styles: [
		`
			.primary-button {
				color: white;
				background-color: #193791;
			}
		`,
	],
})
export class EditSvgIconButtonComponent {
	/**
	 * Type of the button. Following values are supported. See BootStrap docs for mor
	 * e information
	 * <pre>
	 *   1. button
	 *   2. submit
	 * </pre>
	 */
	@Input() type = 'button';

	/**
	 * If set, shows material icon
	 */
	@Input() icon = 'edit';

	/**
	 * If set, shows the label on the button
	 */
	@Input() label = 'Edit';
}

@NgModule({
	imports: [CommonModule, MatButtonModule, EditSolidSvgComponentModule],
	declarations: [EditSvgIconButtonComponent],
	exports: [EditSvgIconButtonComponent],
})
export class EditSvgIconButtonComponentModule {}
