import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
	BsLinkButtonComponent,
	CloseButtonDirective,
	DeleteButtonComponent,
	EditBsButtonComponent,
	EditButtonComponent,
	EditSvgIconButtonComponent,
	ExcelExportButtonComponent,
	ManageButtonComponent,
	PdfExportButtonComponent,
	PrimaryButtonComponent,
	SavePrimaryButtonComponent,
	SearchButtonComponent,
	SuccessButtonComponent,
	ViewButtonComponent,
	ViewPrimaryButtonComponent,
} from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-buttons-demo',
	imports: [
		SavePrimaryButtonComponent,
		PrimaryButtonComponent,
		PdfExportButtonComponent,
		ExcelExportButtonComponent,
		EditBsButtonComponent,
		ViewButtonComponent,
		ViewPrimaryButtonComponent,
		EditButtonComponent,
		EditSvgIconButtonComponent,
		EditBsButtonComponent,
		BsLinkButtonComponent,
		ManageButtonComponent,
		SearchButtonComponent,
		SuccessButtonComponent,
		DeleteButtonComponent,
		CloseButtonDirective,
		MatButtonModule,
	],
	templateUrl: './buttons-demo.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [],
})
export class ButtonsDemoComponent {
	loading = false;

	setLoading(): void {
		this.loading = true;
		setTimeout(() => {
			this.loading = false;
		}, 3000);
	}

	setDeleteLoading(_$event: MouseEvent): void {
		this.loading = true;
		setTimeout(() => {
			this.loading = false;
		}, 3000);
	}
}
