import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CloseButtonDirective } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-close-button-demo',
	imports: [CloseButtonDirective],
	templateUrl: './close-button-demo.component.html',
	styles: [``],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloseButtonDemoComponent {
	isPanelVisible = signal(true);

	closePanel(): void {
		this.isPanelVisible.set(false);
	}

	resetPanel(): void {
		this.isPanelVisible.set(true);
	}
}
