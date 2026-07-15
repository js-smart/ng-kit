import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { SearchButtonComponent } from '@js-smart/ng-kit';
import { StackBlitzService } from '../services/stackblitz.service';
import { getSearchButtonDemoConfig } from './search-button-demo.config';

@Component({
	selector: 'ng-kit-search-button-demo',
	standalone: true,
	imports: [SearchButtonComponent],
	template: `
		<div style="margin-bottom: 20px;">
			<button (click)="openInStackBlitz()" class="btn btn-primary">🚀 Open in StackBlitz</button>
		</div>

		<div>
			<h2>Component</h2>
			<search-button ariaLabel="Search" (click)="onSearch()"></search-button>
		</div>

		<p>{{ status() }}</p>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchButtonDemoComponent {
	status = signal('');

	private readonly stackBlitzService = inject(StackBlitzService);

	openInStackBlitz(): void {
		this.stackBlitzService.openDemo(getSearchButtonDemoConfig());
	}

	onSearch(): void {
		this.status.set('Search clicked!');
	}
}
