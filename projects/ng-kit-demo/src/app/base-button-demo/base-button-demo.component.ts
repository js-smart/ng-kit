import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { PrimaryButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-base-button-demo',
	standalone: true,
	imports: [PrimaryButtonDirective, MatButton],
	template: `
		<div>
			<h2>Loading state</h2>
			<button [loading]="loading()" label="Save" (click)="toggleLoading()" primaryButton mat-raised-button>Save</button>
		</div>

		<div>
			<h2>Disabled state</h2>
			<button [disabled]="true" primaryButton mat-raised-button>Disabled</button>
		</div>

		<div>
			<h2>With icon</h2>
			<button icon="save" primaryButton mat-raised-button>Save with icon</button>
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
