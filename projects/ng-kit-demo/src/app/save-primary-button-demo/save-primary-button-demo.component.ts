import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { SavePrimaryButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-save-primary-button-demo',
	standalone: true,
	imports: [SavePrimaryButtonDirective, MatButton],
	template: `
		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="Save" (click)="onSave()" savePrimaryButton mat-raised-button>Save</button>
		</div>

		<p>{{ status() }}</p>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavePrimaryButtonDemoComponent {
	status = signal('');

	onSave(): void {
		this.status.set('Save clicked!');
	}
}
