import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { SearchButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-search-button-demo',
	standalone: true,
	imports: [SearchButtonDirective, MatButton],
	template: `
		<div>
			<h2>Directive (Preferred)</h2>
			<button ariaLabel="Search" (click)="onSearch()" searchButton mat-raised-button>Search</button>
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
