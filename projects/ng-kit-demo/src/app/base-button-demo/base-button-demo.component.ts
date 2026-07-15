import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PrimaryButtonComponent, PrimaryButtonDirective } from '@js-smart/ng-kit';
import { StackBlitzService } from '../services/stackblitz.service';
import { getBaseButtonDemoConfig } from './base-button-demo.config';

@Component({
	selector: 'ng-kit-base-button-demo',
	standalone: true,
	imports: [PrimaryButtonComponent, PrimaryButtonDirective],
	template: `
		<div style="margin-bottom: 20px;">
			<button (click)="openInStackBlitz()" class="btn btn-primary">🚀 Open in StackBlitz</button>
		</div>

		<div>
			<h2>Loading state</h2>
			<primary-button [loading]="loading()" label="Save" (click)="toggleLoading()"></primary-button>
		</div>

		<div>
			<h2>Disabled state</h2>
			<primary-button [disabled]="true" label="Disabled"></primary-button>
		</div>

		<div>
			<h2>With icon</h2>
			<primary-button [showIcon]="true" icon="save" label="Save with icon"></primary-button>
		</div>

		<div>
			<h2>Directive with loading</h2>
			<button ariaLabel="Submit" [loading]="loading()" primaryButton>Submit</button>
		</div>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseButtonDemoComponent {
	loading = signal(false);

	private readonly stackBlitzService = inject(StackBlitzService);

	openInStackBlitz(): void {
		this.stackBlitzService.openDemo(getBaseButtonDemoConfig());
	}

	toggleLoading(): void {
		this.loading.update((value) => !value);
	}
}
