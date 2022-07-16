import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ErrorSnackBarComponent } from '../components/snack-bar/error-snack-bar/error-snack-bar.component';
import { SuccessSnackBarComponent } from '../components/snack-bar/success-snack-bar/success-snack-bar.component';

@Injectable({
	providedIn: 'root',
})
export class MatSnackBarService {
	/**
	 * Duration (in milliseconds) of the Snack Bar to be open. Defaults to 5 seconds(5000 milliseconds)
	 */
	duration = 5000;

	/**
	 * Horizontal Position of the MatSnackBar. Defaults to left side
	 */
	horizontalPosition: MatSnackBarHorizontalPosition = 'right';

	/**
	 * Vertical Position of the MatSnackBar. Defaults to page bottom
	 */
	verticalPosition: MatSnackBarVerticalPosition = 'top';

	constructor(private snackBar: MatSnackBar) {}

	/**
	 * Opens Success Snack Bar
	 *
	 * @param message Message to display on Snack Bar
	 * @param options Options of the Snack Bar
	 *
	 * @author Pavan Kumar Jadda
	 * @since 2.2.3
	 */
	success(message: string, options?: MatSnackBarOptions) {
		this.snackBar.openFromComponent(SuccessSnackBarComponent, {
			data: { message },
			duration: options?.duration ?? this.duration,
			panelClass: options?.panelClass ?? 'success-snackbar',
			horizontalPosition: options?.horizontalPosition ?? this.horizontalPosition,
			verticalPosition: options?.verticalPosition ?? this.verticalPosition,
		});
	}

	/**
	 * Opens Error Snack Bar
	 *
	 * @param message Message to display on Snack Bar
	 * @param options Options of the Snack Bar
	 *
	 * @author Pavan Kumar Jadda
	 * @since 2.2.3
	 */
	error(message: string, options?: MatSnackBarOptions) {
		this.snackBar.openFromComponent(ErrorSnackBarComponent, {
			data: { message },
			duration: options?.duration ?? 10000,
			panelClass: options?.panelClass ?? 'error-snackbar',
			horizontalPosition: options?.horizontalPosition ?? this.horizontalPosition,
			verticalPosition: options?.verticalPosition ?? this.verticalPosition,
		});
	}

	/**
	 * Opens Generic Snack Bar
	 *
	 * @param message Message to display on Snack Bar
	 *
	 * @author Pavan Kumar Jadda
	 * @since 2.2.3
	 */
	open(message: string) {
		this.snackBar.open(message, 'Close', {
			duration: this.duration,
			horizontalPosition: this.horizontalPosition,
			verticalPosition: this.verticalPosition,
		});
	}
}

/**
 * MatSnackBarOptions for Snack Bar
 *
 * @author Pavan Kumar Jadda
 * @since 2.7.19
 */
export interface MatSnackBarOptions {
	duration?: number;
	horizontalPosition?: MatSnackBarHorizontalPosition;
	verticalPosition?: MatSnackBarVerticalPosition;
	panelClass?: string;
}
