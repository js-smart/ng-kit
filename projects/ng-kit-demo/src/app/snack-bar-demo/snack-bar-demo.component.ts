import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatSnackBarService } from '@js-smart/ng-kit';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { StackBlitzService } from '../services/stackblitz.service';
import { OpenInStackblitzButtonComponent } from '../shared/open-in-stackblitz-button.component';
import { getSnackBarDemoConfig } from '../utils/demo-config-generator';

@Component({
	selector: 'ng-kit-snack-bar-demo',
	imports: [MatSnackBarModule, MatButtonModule, OpenInStackblitzButtonComponent],
	providers: [MatSnackBarService],
	changeDetection: ChangeDetectionStrategy.Eager,
	template: `
		<div style="margin-bottom: 20px;">
			<ng-kit-open-in-stackblitz-button (open)="openInStackBlitz()" />
		</div>

		<div class="center_div">
			<button mat-raised-button color="primary" (click)="mdc.success('Update Success')">Show Success Snack Bar</button>
			<button style="margin-left: 30px" mat-raised-button color="warn" (click)="mdc.error('Failed to update the record')">
				Show Error Snack Bar
			</button>
		</div>
	`,
})
export class SnackBarDemoComponent {
	mdc = inject(MatSnackBarService);
	private readonly stackBlitzService = inject(StackBlitzService);

	openInStackBlitz(): void {
		this.stackBlitzService.openDemo(getSnackBarDemoConfig());
	}
}
