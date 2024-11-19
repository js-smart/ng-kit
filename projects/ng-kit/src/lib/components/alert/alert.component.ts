import { ChangeDetectorRef, Component, OnInit, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Boostrap Alert component that can be used to alert messages to the user
 *
 * @author Pavan Kumar Jadda
 * @since 12.0.0
 */
@Component({
    selector: 'lib-alert, alert',
    imports: [CommonModule],
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
	/**
	 * Type of the BootStrap Alert. Following values are supported. See BootStrap docs for more information
	 * <pre>
	 *   1. info
	 *   2. primary
	 *   3. secondary
	 *   4. success
	 *   5. warning
	 *   6. danger
	 *   7. dark
	 *   8. light
	 * </pre>
	 */
	type = input('info');

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

	constructor(private cdr: ChangeDetectorRef) {}

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
