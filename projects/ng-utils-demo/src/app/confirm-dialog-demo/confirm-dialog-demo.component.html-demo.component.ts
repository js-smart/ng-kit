import { Component, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, PrimaryButtonComponent } from '@js-smart/ng-utils';

@Component({
	selector: 'ng-utils-confirm-dialog-demo',
	standalone: true,
	templateUrl: './confirm-dialog-demo.component.html',
	styles: [``],
	imports: [ConfirmDialogComponent, PrimaryButtonComponent],
})
export class ConfirmDialogDemoComponent {
	dialog = inject(MatDialog);
	confirmStatus = signal('');
	confirm() {
		const ref = this.dialog.open(ConfirmDialogComponent, {
			data: {
				title: 'Confirm',
				message: 'Are you sure you want to do this?',
			},
		});

		// Listen for confirmation result
		ref.afterClosed().subscribe((status: boolean) => {
			if (status) {
				this.confirmStatus.set('Confirmed');
			} else {
				this.confirmStatus.set('Canceled');
			}
		});
	}
}
