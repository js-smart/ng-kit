import { Component, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, PrimaryButtonComponent } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-confirm-dialog-demo',
	templateUrl: './confirm-dialog-demo.component.html',
	styles: [``],
	imports: [PrimaryButtonComponent],
})
export class ConfirmDialogDemoComponent {
	dialog = inject(MatDialog);
	confirmStatus = signal('');
	protected readonly console = console;

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
