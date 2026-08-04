import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
	BsLinkButtonDirective,
	CloseButtonDirective,
	DeleteButtonDirective,
	EditBsButtonDirective,
	EditButtonDirective,
	EditSvgIconButtonDirective,
	ExcelExportButtonDirective,
	ManageButtonDirective,
	PdfExportButtonDirective,
	PrimaryButtonDirective,
	SavePrimaryButtonDirective,
	SearchButtonDirective,
	SuccessButtonDirective,
	ViewButtonDirective,
	ViewPrimaryButtonDirective,
} from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-buttons-demo',
	imports: [
		MatIconModule,
		SavePrimaryButtonDirective,
		PrimaryButtonDirective,
		PdfExportButtonDirective,
		ExcelExportButtonDirective,
		EditBsButtonDirective,
		ViewButtonDirective,
		ViewPrimaryButtonDirective,
		EditButtonDirective,
		EditSvgIconButtonDirective,
		ManageButtonDirective,
		SearchButtonDirective,
		SuccessButtonDirective,
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
