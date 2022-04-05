import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	EditSolidSvgComponentModule
} from "../../../../../libs/ngxsmart/src/lib/svg-icons/edit-solid-svg/edit-solid-svg.component";
import { MatButtonModule } from "@angular/material/button";

@Component({
	selector: 'ngxsmart-edit-svg-icon-demo',
	template: ` 
		<button class="m-5" mat-raised-button color="primary">
			<app-edit-solid-svg></app-edit-solid-svg>
			Edit
		</button>
	`,
	styles: [],
})
export class EditSvgIconDemoComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}

@NgModule({
	imports: [CommonModule, EditSolidSvgComponentModule, MatButtonModule],
	declarations: [EditSvgIconDemoComponent],
	exports: [EditSvgIconDemoComponent],
})
export class EditSvgIconDemoComponentModule {}
