import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { SavePrimaryButtonComponent, SavePrimaryButtonDirective } from '@js-smart/ng-kit';
import { StackBlitzService } from '../services/stackblitz.service';
import { OpenInStackblitzButtonComponent } from '../shared/open-in-stackblitz-button.component';
import { getSavePrimaryButtonDemoConfig } from './save-primary-button-demo.config';

@Component({
	selector: 'ng-kit-save-primary-button-demo',
	standalone: true,
	imports: [SavePrimaryButtonComponent, SavePrimaryButtonDirective, OpenInStackblitzButtonComponent],
	template: `
		<div style="margin-bottom: 20px;">
			<ng-kit-open-in-stackblitz-button (open)="openInStackBlitz()" />
		</div>

		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="Save" (click)="onSave()" savePrimaryButton>Save</button>
		</div>

		<div>
			<h2>Component</h2>
			<save-primary-button ariaLabel="Save" (click)="onSave()">Save</save-primary-button>
		</div>

		<p>{{ status() }}</p>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavePrimaryButtonDemoComponent {
	status = signal('');

	private readonly stackBlitzService = inject(StackBlitzService);

	openInStackBlitz(): void {
		this.stackBlitzService.openDemo(getSavePrimaryButtonDemoConfig());
	}

	onSave(): void {
		this.status.set('Save clicked!');
	}
}
