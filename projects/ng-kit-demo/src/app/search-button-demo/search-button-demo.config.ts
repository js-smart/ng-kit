import { DemoConfig } from '../types/demo-config';

/**
 * Generates a DemoConfig for the search-button-demo component
 */
export function getSearchButtonDemoConfig(): DemoConfig {
	return {
		title: 'Search Button Demo',
		description: 'Demo showcasing the SearchButtonDirective from @js-smart/ng-kit',
		componentName: 'search-button-demo',
		requiredImports: ['BrowserAnimationsModule'],
		componentTs: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { SearchButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'app-search-button-demo',
	standalone: true,
	imports: [SearchButtonDirective, MatButton],
	templateUrl: './search-button-demo.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchButtonDemoComponent {
	status = signal('');

	onSearch(): void {
		this.status.set('Search clicked!');
	}
}`,
		componentHtml: `<div>
	<h2>Directive (Preferred)</h2>
	<button ariaLabel="Search" (click)="onSearch()" searchButton mat-raised-button>Search</button>
</div>

<p>{{ status() }}</p>`,
	};
}
