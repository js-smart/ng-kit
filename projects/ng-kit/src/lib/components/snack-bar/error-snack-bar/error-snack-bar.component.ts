import { Component, Inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
	selector: 'app-error-snack-bar',
	imports: [MatIconModule, MatButtonModule],
	template: `
		<div class="app-flex-center error-snackbar">
			<mat-icon style="font-size:1.3rem">error</mat-icon>
			<label>{{ data.message }}</label>
			<button style="margin-left: auto" (click)="close()" mat-icon-button>
				<mat-icon>close</mat-icon>
			</button>
		</div>
	`,
	styleUrls: ['../../../../assets/app-mat-snack-bar.css'],
})
export class ErrorSnackBarComponent {
	constructor(
		public msb: MatSnackBarRef<ErrorSnackBarComponent>,
		@Inject(MAT_SNACK_BAR_DATA) public data: { message: string; action?: string },
	) {}

	/**
	 * Close the Snack Bar
	 *
	 * @author Pavan Kumar Jadda
	 * @since 2.7.18
	 */
	close(): void {
		this.msb.dismissWithAction();
	}
}
