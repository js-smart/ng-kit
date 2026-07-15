import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { SearchButtonComponent } from '@js-smart/ng-kit';
import { StackBlitzService } from '../services/stackblitz.service';
import { OpenInStackblitzButtonComponent } from '../shared/open-in-stackblitz-button.component';
import { getSearchButtonDemoConfig } from './search-button-demo.config';

@Component({
	selector: 'ng-kit-search-button-demo',
	standalone: true,
	imports: [SearchButtonComponent, OpenInStackblitzButtonComponent],
	template: `
		<div style="margin-bottom: 20px;">
			<ng-kit-open-in-stackblitz-button (open)="openInStackBlitz()" />
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
