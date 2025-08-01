import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
	BsLinkButtonComponent,
	BsLinkButtonDirective,
	CloseButtonDirective,
	DeleteButtonComponent,
	DeleteButtonDirective,
	EditBsButtonComponent,
	EditBsButtonDirective,
	EditButtonComponent,
	EditButtonDirective,
	EditSvgIconButtonComponent,
	EditSvgIconButtonDirective,
	ExcelExportButtonComponent,
	ExcelExportButtonDirective,
	ManageButtonComponent,
	ManageButtonDirective,
	PdfExportButtonComponent,
	PdfExportButtonDirective,
	PrimaryButtonComponent,
	PrimaryButtonDirective,
	SavePrimaryButtonComponent,
	SavePrimaryButtonDirective,
	SearchButtonComponent,
	SuccessButtonComponent,
	SuccessButtonDirective,
	ViewButtonComponent,
	ViewButtonDirective,
	ViewPrimaryButtonComponent,
	ViewPrimaryButtonDirective,
} from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-buttons-demo',
	imports: [
		MatIconModule,
		SavePrimaryButtonComponent,
		SavePrimaryButtonDirective,
		PrimaryButtonComponent,
		PrimaryButtonDirective,
		PdfExportButtonComponent,
		PdfExportButtonDirective,
		ExcelExportButtonComponent,
		ExcelExportButtonDirective,
		EditBsButtonComponent,
		EditBsButtonDirective,
		ViewButtonComponent,
		ViewButtonDirective,
		ViewPrimaryButtonComponent,
		ViewPrimaryButtonDirective,
		EditButtonComponent,
		EditButtonDirective,
		EditSvgIconButtonComponent,
		EditSvgIconButtonDirective,
		EditBsButtonComponent,
		BsLinkButtonComponent,
		ManageButtonComponent,
		ManageButtonDirective,
		SearchButtonComponent,
		SuccessButtonComponent,
		SuccessButtonDirective,
		DeleteButtonComponent,
		DeleteButtonDirective,
		CloseButtonDirective,
		MatButtonModule,
		BsLinkButtonDirective,
	],
	templateUrl: './buttons-demo.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [],
})
export class ButtonsDemoComponent {
	loading = signal(false);

	setLoading(): void {
		console.log('setLoading');
		this.loading.set(true);
		setTimeout(() => {
			this.loading.set(false);
		}, 3000);
	}
}
