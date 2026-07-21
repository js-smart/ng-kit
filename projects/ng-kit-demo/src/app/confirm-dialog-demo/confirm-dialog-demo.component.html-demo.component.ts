import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, PrimaryButtonComponent } from '@js-smart/ng-kit';
import { StackBlitzService } from '../services/stackblitz.service';
import { OpenInStackblitzButtonComponent } from '../shared/open-in-stackblitz-button.component';
import { getConfirmDialogDemoConfig } from '../utils/demo-config-generator';

@Component({
	selector: 'ng-kit-confirm-dialog-demo',
	templateUrl: './confirm-dialog-demo.component.html',
	styles: [``],
	changeDetection: ChangeDetectionStrategy.Eager,
	imports: [PrimaryButtonComponent, OpenInStackblitzButtonComponent],
})
export class ConfirmDialogDemoComponent {
	dialog = inject(MatDialog);
	confirmStatus = signal('');
	protected readonly console = console;

	private readonly stackBlitzService = inject(StackBlitzService);

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

	openInStackBlitz(): void {
		this.stackBlitzService.openDemo(getConfirmDialogDemoConfig());
	}
}
