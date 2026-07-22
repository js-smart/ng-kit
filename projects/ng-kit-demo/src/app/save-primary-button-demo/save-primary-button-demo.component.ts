import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SavePrimaryButtonComponent, SavePrimaryButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-save-primary-button-demo',
	standalone: true,
	imports: [SavePrimaryButtonComponent, SavePrimaryButtonDirective],
	template: `
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

	onSave(): void {
		this.status.set('Save clicked!');
	}
}
