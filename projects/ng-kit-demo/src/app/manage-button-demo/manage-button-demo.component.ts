import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ManageButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-manage-button-demo',
	standalone: true,
	imports: [ManageButtonDirective, MatButton],
	template: `
		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="Manage settings" (click)="onManage()" manageButton mat-raised-button>Manage</button>
		</div>

		<p>{{ status() }}</p>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageButtonDemoComponent {
	status = signal('');

	onManage(): void {
		this.status.set('Manage clicked!');
	}
}
