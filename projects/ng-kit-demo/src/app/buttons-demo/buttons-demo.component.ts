import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
	BsLinkButtonComponent,
	BsLinkButtonDirective,
	CloseButtonDirective,
	DeleteButtonComponent,
	DeleteButtonDirective,
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
		BsLinkButtonDirective,
		DeleteButtonDirective,
	],
	templateUrl: './buttons-demo.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [],
})
export class ButtonsDemoComponent {
	loading = signal(false);

	setLoading(): void {
		this.loading.set(true);
		setTimeout(() => {
			this.loading.set(false);
		}, 3000);
	}

	setDeleteLoading(_$event: MouseEvent): void {
		this.loading.set(true);
		setTimeout(() => {
			this.loading.set(false);
		}, 3000);
	}
}
