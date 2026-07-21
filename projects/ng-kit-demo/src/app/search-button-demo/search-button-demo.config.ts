import { DemoConfig } from '../types/demo-config';

/**
 * Generates a DemoConfig for the search-button-demo component
 */
export function getSearchButtonDemoConfig(): DemoConfig {
	return {
		title: 'Search Button Demo',
		description: 'Demo showcasing the SearchButtonComponent from @js-smart/ng-kit',
		componentName: 'search-button-demo',
		requiredImports: ['BrowserAnimationsModule'],
		componentTs: `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SearchButtonComponent } from '@js-smart/ng-kit';

@Component({
	selector: 'app-search-button-demo',
	standalone: true,
	imports: [SearchButtonComponent],
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
	<h2>Component</h2>
	<search-button ariaLabel="Search" (click)="onSearch()"></search-button>
</div>

<p>{{ status() }}</p>`,
	};
}
