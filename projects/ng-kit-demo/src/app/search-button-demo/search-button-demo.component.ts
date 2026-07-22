import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SearchButtonComponent } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-search-button-demo',
	standalone: true,
	imports: [SearchButtonComponent],
	template: `
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

	onSearch(): void {
		this.status.set('Search clicked!');
	}
}
