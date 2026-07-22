import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ManageButtonComponent, ManageButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-manage-button-demo',
	standalone: true,
	imports: [ManageButtonComponent, ManageButtonDirective],
	template: `
		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="Manage settings" (click)="onManage()" manageButton>Manage</button>
		</div>

		<div>
			<h2>Component</h2>
			<manage-button ariaLabel="Manage settings" (click)="onManage()"></manage-button>
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
