import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-success-snack-bar',
	standalone: true,
	imports: [CommonModule, MatButtonModule, MatIconModule],
	template: `
		<div class="custom-flex-center success-snackbar">
			<mat-icon>check_circle</mat-icon>
			<label>{{ data.message }}</label>
			<button style="margin-left: auto" (click)="close()" mat-icon-button>
				<mat-icon>close</mat-icon>
			</button>
		</div>
	`,
	styleUrls: ['../../../../assets/app-mat-snack-bar.css'],
})
export class SuccessSnackBarComponent {
	constructor(
		public msb: MatSnackBarRef<SuccessSnackBarComponent>,
		@Inject(MAT_SNACK_BAR_DATA) public data: { message: string; action?: string },
	) {}

	/**
	 * Close the Snack Bar
	 *
	 * @author Pavan Kumar Jadda
	 * @since 2.7.18
	 */
	close() {
		this.msb.dismissWithAction();
	}
}
