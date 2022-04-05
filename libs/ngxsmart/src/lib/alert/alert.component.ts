import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";

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
	@Input() type = 'info';

	/**
	 *  Is alert visible or open
	 */
	@Input() isOpen = true;

	/**
	 * If set, displays an inline “Close” button
	 */
	@Input() dismissible = true;

	/**
	 * If set, dismisses the alert after Dismiss Timeout
	 */
	@Input() dismissOnTimeout = true;

	/**
	 * Number in milliseconds, after which alert will be closed. Default value is 5000 ms
	 */
	@Input() dismissTimeout = 5000;

	constructor(private cdr: ChangeDetectorRef) {}

	/**
	 * Initialize the component and settings
	 *
	 * @author Pavan Kumar Jadda
	 * @since 12.0.0
	 */
	ngOnInit(): void {
		this.openAlert();

		if (this.dismissOnTimeout) {
			setTimeout(() => {
				this.closeAlert();
				this.cdr.markForCheck();
			}, this.dismissTimeout);
		}
	}

	/**
	 * Closes BootStrap Alert if not open
	 *
	 * @author Pavan Kumar Jadda
	 * @since 12.0.0
	 */
	closeAlert(): void {
		if (!this.isOpen) {
			return;
		}
		this.isOpen = false;
	}

	/**
	 * Opens Bootstrap Alert
	 *
	 * @author Pavan Kumar Jadda
	 * @since 12.0.0
	 */
	private openAlert(): void {
		this.isOpen = true;
	}
}
