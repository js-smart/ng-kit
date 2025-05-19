import { ChangeDetectorRef, Component, effect, inject, input, type OnInit, output, signal } from '@angular/core';

export type AlertType = 'info' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'dark' | 'light';

/**
 * Boostrap Alert component that can be used to alert messages to the user
 *
 * @author Pavan Kumar Jadda
 * @since 12.0.0
 */
@Component({
	selector: 'lib-alert, alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
	cdr = inject(ChangeDetectorRef);
	/**
	 * Type of the BootStrap Alert. Following values are supported. See BootStrap docs for more information
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
	 * Additional classes to be added to the alert. This can be used to add custom styles to the alert
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
		this.openAlert();

		if (this.dismissOnTimeout()) {
			setTimeout(() => {
				this.closeAlert();
				this.cdr.markForCheck();
			}, this.dismissTimeout());
		}
	}

	/**
	 * Closes BootStrap Alert if not open
	 *
	 * @author Pavan Kumar Jadda
	 * @since 12.0.0
	 */
	closeAlert(): void {
		if (!this.isOpen()) {
			return;
		}
		this.open.set(false);
		this.closed.emit();
	}

	/**
	 * Opens Bootstrap Alert
	 *
	 * @author Pavan Kumar Jadda
	 * @since 12.0.0
	 */
	private openAlert(): void {
		this.open.set(true);
	}
}
