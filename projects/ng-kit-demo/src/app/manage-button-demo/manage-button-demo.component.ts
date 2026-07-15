import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ManageButtonComponent, ManageButtonDirective } from '@js-smart/ng-kit';
import { StackBlitzService } from '../services/stackblitz.service';
import { getManageButtonDemoConfig } from './manage-button-demo.config';

@Component({
	selector: 'ng-kit-manage-button-demo',
	standalone: true,
	imports: [ManageButtonComponent, ManageButtonDirective],
	template: `
		<div style="margin-bottom: 20px;">
			<button (click)="openInStackBlitz()" class="btn btn-primary">🚀 Open in StackBlitz</button>
		</div>

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

	private readonly stackBlitzService = inject(StackBlitzService);

	openInStackBlitz(): void {
		this.stackBlitzService.openDemo(getManageButtonDemoConfig());
	}

	onManage(): void {
		this.status.set('Manage clicked!');
	}
}
