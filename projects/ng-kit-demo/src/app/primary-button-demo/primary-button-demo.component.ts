import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryButtonComponent, PrimaryButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-primary-button-demo',
	standalone: true,
	imports: [PrimaryButtonComponent, PrimaryButtonDirective, MatButton, ReactiveFormsModule],
	template: `
		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="Submit" (click)="onSubmit()" primaryButton mat-raised-button>Submit</button>
		</div>

		<div>
			<h2>Component</h2>
			<primary-button ariaLabel="Submit" (click)="onSubmit()">Submit</primary-button>
		</div>

		<p>{{ status() }}</p>

		<!-- TEMP PROBE -->
		<form [formGroup]="probeForm" id="probe-form">
			<input formControlName="branch" id="probe-input" />
			<primary-button [disabled]="probeForm.invalid" [loading]="probeLoading()" id="cmp" label="Generate Report" type="submit" />
			<button [disabled]="probeForm.invalid" [loading]="probeLoading()" icon="" id="bare" loadingLabel="Generating" primaryButton type="submit">
				Generate Report
			</button>
			<button
				[disabled]="probeForm.invalid"
				[loading]="probeLoading()"
				icon=""
				id="raised"
				loadingLabel="Generating"
				mat-raised-button
				primaryButton
				type="submit">
				Generate Report
			</button>
		</form>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimaryButtonDemoComponent {
	status = signal('');
	probeForm = inject(FormBuilder).group({ branch: ['', [Validators.required]] });
	probeLoading = signal(false);

	onSubmit(): void {
		this.status.set('Submit clicked!');
	}
}
