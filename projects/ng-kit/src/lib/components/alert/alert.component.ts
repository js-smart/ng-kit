import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	effect,
	inject,
	input,
	type OnInit,
	output,
	signal,
	ViewEncapsulation,
} from '@angular/core';

export type AlertType = 'info' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'dark' | 'light';

/**
 * Alert component that shows a message to the user. It is dismissible by default and closes itself after a timeout.
 *
 * Styling is self-contained and needs no CSS framework. Colours come from Bootstrap's CSS variables when Bootstrap is
 * loaded, otherwise from Bootstrap 5's defaults; override `--ngk-alert-color`, `--ngk-alert-bg` and
 * `--ngk-alert-border-color` on an `.alert-{type}` class to theme a type.
 *
 * @author Pavan Kumar Jadda
 * @since 12.0.0
 */
@Component({
	selector: 'lib-alert, alert',
	templateUrl: './alert.component.html',
	styleUrl: './alert.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	// Global styles use the existing Bootstrap class names, scoped to the component host.
	encapsulation: ViewEncapsulation.None,
})
export class AlertComponent implements OnInit {
	cdr = inject(ChangeDetectorRef);
	/**
	 * Type of the alert, which selects its colours. Supported values: `info` (default), `primary`, `secondary`, `success`,
	 * `warning`, `danger`, `dark` and `light`
	 */
	type = input<AlertType>('info');

	/**
	 *  Is alert visible or open
	 */
	isOpen = input(true);

	/**
	 *  Writable signal for isOpen
	 */
	open = signal(this.isOpen());

	/**
	 * If set, displays an inline “Close” button
	 */
	dismissible = input(true);

	/**
	 * If set, dismisses the alert after Dismiss Timeout
	 */
	dismissOnTimeout = input(true);

	/**
	 * Number in milliseconds, after which alert will be closed. Default value is 5000 ms
	 */
	dismissTimeout = input(5000);

	/**
	 * Additional classes to be added to the alert container. This can be used to add custom styles to the alert
	 */
	class = input('');

	/**
	 * Emits when the alert is closed.
	 */
	closed = output<void>();

	constructor() {
		// React to isOpen input changes
		effect(() => {
			this.open.set(this.isOpen());
		});
	}

	/**
	 * Initialize the component and settings
	 *
	 * @author Pavan Kumar Jadda
	 * @since 12.0.0
	 */
	ngOnInit(): void {
		if (this.dismissOnTimeout()) {
			setTimeout(() => {
				this.closeAlert();
				this.cdr.markForCheck();
			}, this.dismissTimeout());
		}
	}

	/**
	 * Closes the alert and emits `closed`. Does nothing if the alert is already closed
	 *
	 * @author Pavan Kumar Jadda
	 * @since 12.0.0
	 */
	closeAlert(): void {
		if (!this.open()) {
			return;
		}
		this.open.set(false);
		this.closed.emit();
	}
}
