import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, PrimaryButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-confirm-dialog-demo',
	templateUrl: './confirm-dialog-demo.component.html',
	styles: [``],
	changeDetection: ChangeDetectionStrategy.Eager,
	imports: [PrimaryButtonDirective, MatButton],
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
