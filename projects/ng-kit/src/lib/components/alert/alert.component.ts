import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	computed,
	effect,
	inject,
	input,
	type OnInit,
	output,
	signal,
} from '@angular/core';

export type AlertType = 'info' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'dark' | 'light';

/**
 * Bootstrap 6 replaces `alert-{type}` with `theme-{name}`. It has no `dark` or `light` theme, so `dark` maps to `theme-inverse`
 * and `light` uses the default (neutral) alert.
 */
const ALERT_THEME_CLASSES: Record<AlertType, string> = {
	info: 'theme-info',
	primary: 'theme-primary',
	secondary: 'theme-secondary',
	success: 'theme-success',
	warning: 'theme-warning',
	danger: 'theme-danger',
	dark: 'theme-inverse',
	light: '',
};

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
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent implements OnInit {
	cdr = inject(ChangeDetectorRef);
	/**
	 * Type of the BootStrap Alert. Following values are supported. See BootStrap docs for more information
	 */
	type = input<AlertType>('info');

	/**
	 * Bootstrap 5 (`alert-{type}`) and Bootstrap 6 (`theme-{name}`) classes for the alert type
	 */
	typeClasses = computed(() => `alert-${this.type()} ${ALERT_THEME_CLASSES[this.type()]}`.trim());

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
		if (!this.open()) {
			return;
		}
		this.open.set(false);
		this.closed.emit();
	}
}
