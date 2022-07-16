import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'app-success-snack-bar',
	standalone: true,
	imports: [CommonModule, MatIconModule, MatButtonModule],
	template: `
		<div class="custom-flex-center">
			<mat-icon>check_circle</mat-icon>
			<label>{{ data.message }}</label>
			<button style="font-size: 18px; margin-left: auto" (click)="close()" mat-button>
				{{ data.action ?? 'Close' }}
			</button>
		</div>
	`,
	styleUrls: ['../../../../assets/app-mat-snack-bar.scss'],
})
export class SuccessSnackBarComponent {
	constructor(
		public msb: MatSnackBarRef<SuccessSnackBarComponent>,
		@Inject(MAT_SNACK_BAR_DATA) public data: { message: string; action?: string }
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
