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

/**
 * Generates a DemoConfig for the snack-bar-demo component
 */
export function getSnackBarDemoConfig(): DemoConfig {
	return {
		title: 'Snack Bar Demo',
		description: 'Demo showcasing MatSnackBarService from @js-smart/ng-kit',
		componentName: 'snack-bar-demo',
		requiredImports: ['BrowserAnimationsModule'],
		componentTs: `import { Component, inject } from '@angular/core';
import { MatSnackBarService } from '@js-smart/ng-kit';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'app-snack-bar-demo',
	standalone: true,
	imports: [MatSnackBarModule, MatButtonModule],
	providers: [MatSnackBarService],
	template: \`
		<div class="center_div">
			<button mat-raised-button color="primary" (click)="mdc.success('Update Success')">Show Success Snack Bar</button>
			<button style="margin-left: 30px" mat-raised-button color="warn" (click)="mdc.error('Failed to update the record')">
				Show Error Snack Bar
			</button>
		</div>
	\`,
})
export class SnackBarDemoComponent {
	mdc = inject(MatSnackBarService);
}`,
		componentHtml: '',
	};
}

/**
 * Generates a DemoConfig for the autocomplete-demo component
 */
export function getAutocompleteDemoConfig(): DemoConfig {
	return {
		title: 'Autocomplete Demo',
		description: 'Demo showcasing the AutocompleteComponent from @js-smart/ng-kit',
		componentName: 'autocomplete-demo',
		requiredImports: ['BrowserAnimationsModule'],
		componentTs: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteComponent } from '@js-smart/ng-kit';

@Component({
	selector: 'app-autocomplete-demo',
	standalone: true,
	imports: [AutocompleteComponent, ReactiveFormsModule],
	templateUrl: './autocomplete-demo.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteDemoComponent {
	cities: City[] = [
		{ id: 1001, location: 'New York', state: 'NY' },
		{ id: 1002, location: 'Boston', state: 'MA' },
		{ id: 1003, location: 'Washington DC', state: 'DC' },
		{ id: 1004, location: 'Los Angeles', state: 'CA' },
	];

	genericFormGroup = this.fb.group({
		autocomplete: new FormControl<City | undefined>(undefined),
	});

	stringFormGroup = this.fb.group({
		autocomplete: new FormControl<string | undefined>(undefined),
	});

	loadingFormGroup = this.fb.group({
		autocomplete: new FormControl<City | undefined>(undefined),
	});

	disabledFormGroup = this.fb.group({
		autocomplete: new FormControl<City | undefined>({ value: this.cities[0], disabled: true }),
	});

	isLoading = signal(true);
	loadingCities = signal<City[]>([]);

	constructor(private fb: FormBuilder) {
		setTimeout(() => {
			this.loadingCities.set(this.cities);
			this.isLoading.set(false);
		}, 3000);
	}

	displayWith = (item: City) => item?.location ?? '';

	toggleDisabled(): void {
		const control = this.disabledFormGroup.get('autocomplete');
		if (control?.disabled) {
			control.enable();
		} else {
			control?.disable();
		}
	}
}

export interface City {
	id: number;
	location: string;
	state: string;
}`,
		componentHtml: `<div class="row">
	<div class="col-6">
		<h1>Autocomplete with Objects</h1>
		<form [formGroup]="genericFormGroup">
			<autocomplete [displayWith]="displayWith" [options]="cities" formControlName="autocomplete" label="City" placeholder="Select City">
			</autocomplete>
		</form>
	</div>
	<div class="col-6">
		<h1>Autocomplete with Strings</h1>
		<form [formGroup]="stringFormGroup">
			<autocomplete
				[options]="['New York', 'Boston', 'Washington DC']"
				formControlName="autocomplete"
				label="City"
				placeholder="Select City">
			</autocomplete>
		</form>
	</div>
	<div class="col-6">
		<h2>Autocomplete with Loading State</h2>
		<form [formGroup]="loadingFormGroup">
			<autocomplete
				[displayWith]="displayWith"
				[loading]="isLoading()"
				[options]="loadingCities()"
				formControlName="autocomplete"
				label="City"
				loadingText="Fetching cities..."
				placeholder="Select City">
			</autocomplete>
		</form>
	</div>
	<div class="col-6">
		<h2>Autocomplete with Disabled State</h2>
		<form [formGroup]="disabledFormGroup">
			<autocomplete [displayWith]="displayWith" [options]="cities" formControlName="autocomplete" label="City" placeholder="Select City">
			</autocomplete>
		</form>
		<button (click)="toggleDisabled()">
			{{ disabledFormGroup.get('autocomplete')?.disabled ? 'Enable' : 'Disable' }}
		</button>
	</div>
</div>`,
	};
}

