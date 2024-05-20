import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
	selector: 'app-confirm-dialog',
	standalone: true,
	imports: [MatButtonModule, MatDividerModule, MatDialogModule],
	template: `
		<div class="mat-dialog-title" style="text-align: center">
			<h3 class="m-3 mat-headline-5	">{{ title }}</h3>
		</div>

		<mat-divider></mat-divider>
		<div mat-dialog-content style="margin: 20px">
			<p>{{ message }}</p>
		</div>

		<div align="end" class="modal-footer" mat-dialog-actions>
			<button (click)="onDismiss()" mat-raised-button>No</button>
			<button (click)="onConfirm()" class="primary-button" mat-raised-button>Yes</button>
		</div>
	`,
	styles: [],
})
export class ConfirmDialogComponent {
	title: string;
	message: string;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData,
		public dialogRef: MatDialogRef<ConfirmDialogComponent>,
	) {
		// Update view with given values
		this.title = data.title;
		this.message = data.message;
	}

	onDismiss() {
		// Close the dialog, return true
		this.dialogRef.close(false);
	}

	onConfirm() {
		// Close the dialog, return true
		this.dialogRef.close(true);
	}
}

/**
 * Class to represent confirm dialog model.
 */
export interface ConfirmDialogData {
	title: string;
	message: string;
}
