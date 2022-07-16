import { Component, inject } from '@angular/core';
import { MatSnackBarService } from '@ngxsmart/ngxsmart';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'ngxsmart-snack-bar-demo',
	standalone: true,
	imports: [MatSnackBarModule, MatButtonModule],
	providers: [MatSnackBarService],
	template: `
		<div class="center_div">
			<button mat-raised-button color="primary" (click)="mdc.success('Update Success', { duration: 200000 })">
				Show Success Snack Bar
			</button>
			<br />
			<br />
			<button mat-raised-button color="warn" (click)="mdc.error('Failed to update the record')">Show Error Snack Bar</button>
		</div>
	`,
})
export class SnackBarDemoComponent {
	mdc = inject(MatSnackBarService);
}
