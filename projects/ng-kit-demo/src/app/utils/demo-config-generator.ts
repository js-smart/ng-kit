import { DemoConfig } from '../types/demo-config';

/**
 * Generates a DemoConfig for the alert-demo component
 */
export function getAlertDemoConfig(): DemoConfig {
	return {
		title: 'Alert Demo',
		description: 'Demo showcasing the Alert component from @js-smart/ng-kit',
		componentName: 'alert-demo',
		componentTs: `import { Component } from '@angular/core';
import { AlertComponent } from '@js-smart/ng-kit';

@Component({
	selector: 'app-alert-demo',
	standalone: true,
	imports: [AlertComponent],
	templateUrl: './alert-demo.component.html',
	styles: [\`\`],
})
export class AlertDemoComponent {
	dismissOnTimeout = false;
	dismissible = true;
}`,
		componentHtml: `<div>
	<h2>Success Alert</h2>
	<alert [dismissOnTimeout]="dismissOnTimeout" [dismissible]="dismissible" type="success"> Success Alert </alert>
</div>

<div>
	<h2>Error Alert</h2>
	<alert [dismissOnTimeout]="dismissOnTimeout" [dismissible]="dismissible" type="danger"> Error Alert </alert>
</div>

<hr />`,
	};
}

