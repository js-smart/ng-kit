import { DemoConfig } from '../types/demo-config';

/**
 * Generates a DemoConfig for the alert-demo component
 */
export function getAlertDemoConfig(): DemoConfig {
	return {
		title: 'Alert Demo',
		description: 'Demo showcasing the Alert component from @js-smart/ng-kit',
		componentName: 'alert-demo',
		componentTs: `import { Component } from '@angular/core';
import { AlertComponent } from '@js-smart/ng-kit';

@Component({
	selector: 'app-alert-demo',
	standalone: true,
	imports: [AlertComponent],
	templateUrl: './alert-demo.component.html',
	styles: [\`\`],
})
export class AlertDemoComponent {
	dismissOnTimeout = false;
	dismissible = true;
}`,
		componentHtml: `<div>
	<h2>Success Alert</h2>
	<alert [dismissOnTimeout]="dismissOnTimeout" [dismissible]="dismissible" type="success"> Success Alert </alert>
</div>

<div>
	<h2>Error Alert</h2>
	<alert [dismissOnTimeout]="dismissOnTimeout" [dismissible]="dismissible" type="danger"> Error Alert </alert>
</div>

<hr />`,
	};
}

/**
 * Generates a DemoConfig for the confirm-dialog-demo component
 */
export function getConfirmDialogDemoConfig(): DemoConfig {
	return {
		title: 'Confirm Dialog Demo',
		description: 'Demo showcasing the ConfirmDialogComponent from @js-smart/ng-kit',
		componentName: 'confirm-dialog-demo',
		requiredImports: ['BrowserAnimationsModule'],
		componentTs: `import { Component, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, PrimaryButtonComponent } from '@js-smart/ng-kit';

@Component({
	selector: 'app-confirm-dialog-demo',
	standalone: true,
	imports: [PrimaryButtonComponent],
	templateUrl: './confirm-dialog-demo.component.html',
	styles: [\`\`],
})
export class ConfirmDialogDemoComponent {
	dialog = inject(MatDialog);
	confirmStatus = signal('');

	confirm(): void {
		const ref = this.dialog.open(ConfirmDialogComponent, {
			data: {
				title: 'Confirm',
				message: 'Are you sure you want to do this?',
			},
		});

		ref.afterClosed().subscribe((status: boolean) => {
			if (status) {
				this.confirmStatus.set('Confirmed');
			} else {
				this.confirmStatus.set('Canceled');
			}
		});
	}
}`,
		componentHtml: `<div class="m-5">
	<primary-button (click)="confirm()" (keydown)="confirm()" label="Click to Confirm"></primary-button>

	<br />
	<br />
	<section>
		<h3 class="mat-h3"><b class="m-2">Confirm Status:</b>{{ confirmStatus() }}</h3>
	</section>
</div>`,
	};
}

