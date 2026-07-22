import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PrimaryButtonComponent, PrimaryButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-base-button-demo',
	standalone: true,
	imports: [PrimaryButtonComponent, PrimaryButtonDirective],
	template: `
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

	toggleLoading(): void {
		this.loading.update((value) => !value);
	}
}
