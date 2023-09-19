import { ChangeDetectorRef, Component, HostListener, Input, OnChanges, OnDestroy, OnInit, SimpleChange, ViewChild } from '@angular/core';
import { NgxSpinnerService } from './ngx-spinner.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DEFAULTS, LOADERS, NgxSpinner, PRIMARY_SPINNER, Size } from './ngx-spinner.enum';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from './safe-html.pipe';

@Component({
	selector: 'ngx-spinner',
	standalone: true,
	imports: [CommonModule, SafeHtmlPipe],
	templateUrl: 'ngx-spinner.component.html',
	styleUrls: ['ngx-spinner.component.css'],
	animations: [
		trigger('fadeIn', [
			state('in', style({ opacity: 1 })),
			transition(':enter', [style({ opacity: 0 }), animate(300)]),
			transition(':leave', animate(200, style({ opacity: 0 }))),
		]),
	],
})
export class NgxSpinnerComponent implements OnDestroy, OnInit, OnChanges {
	/**
	 * To set backdrop color
	 * Only supports RGBA color format
	 */
	@Input() bdColor: string;

	/**
	 * To set spinner size
	 */
	@Input() size: Size;

	/**
	 * To set spinner color(DEFAULTS.SPINNER_COLOR)
	 */
	@Input() color: string;

	/**
	 * To set type of spinner
	 */
	@Input() type: string;

	/**
	 * To toggle fullscreen mode
	 */
	@Input() fullScreen: boolean;
	/**
	 * Spinner name
	 */
	@Input() name: string;
	/**
	 * z-index value
	 */

	@Input() zIndex: number;
	/**
	 * Custom template for spinner/loader
	 */

	@Input() template: string;
	/**
	 * Show/Hide the spinner
	 * @type {boolean}
	 */
	@Input() showSpinner: boolean;

	/**
	 * To enable/disable animation
	 */
	@Input() disableAnimation = false;
	/**
	 * Spinner Object
	 */

	spinner: NgxSpinner = new NgxSpinner();
	/**
	 * Array for spinner's div
	 */
	divArray: Array<number>;
	/**
	 * Counter for div
	 */
	divCount: number;
	/**
	 * Show spinner
	 **/
	show: boolean;

	/**
	 * Unsubscribe from spinner's observable
	 **/
	ngUnsubscribe: Subject<void> = new Subject();
	/**
	 * Element Reference
	 */
	@ViewChild('overlay') spinnerDOM;

	/**
	 * Creates an instance of NgxSpinnerComponent.
	 */
	constructor(
		private spinnerService: NgxSpinnerService,
		private changeDetector: ChangeDetectorRef
	) {
		this.bdColor = DEFAULTS.BD_COLOR;
		this.zIndex = DEFAULTS.Z_INDEX;
		this.color = DEFAULTS.SPINNER_COLOR;
		this.type = DEFAULTS.SPINNER_TYPE;
		this.size = 'large';
		this.fullScreen = true;
		this.name = PRIMARY_SPINNER;
		this.template = null;
		this.showSpinner = false;

		this.divArray = [];
		this.divCount = 0;
		this.show = false;
	}

	@HostListener('document:keydown', ['$event'])
	handleKeyboardEvent(event: KeyboardEvent) {
		if (this.spinnerDOM && this.spinnerDOM.nativeElement) {
			event.returnValue = false;
			event.preventDefault();
		}
	}

	/**
   * Initialization method

   */
	ngOnInit() {
		this.setDefaultOptions();
		this.spinnerService
			.getSpinner(this.name)
			.pipe(takeUntil(this.ngUnsubscribe))
			.subscribe((spinner: NgxSpinner) => {
				this.setDefaultOptions();
				Object.assign(this.spinner, spinner);
				if (spinner.show) {
					this.onInputChange();
				}
				this.changeDetector.detectChanges();
			});
	}

	/**
	 * To set default ngx-spinner options
	 */
	setDefaultOptions = () => {
		this.spinner = new NgxSpinner({
			name: this.name,
			bdColor: this.bdColor,
			size: this.size,
			color: this.color,
			type: this.type,
			fullScreen: this.fullScreen,
			divArray: this.divArray,
			divCount: this.divCount,
			show: this.show,
			zIndex: this.zIndex,
			template: this.template,
			showSpinner: this.showSpinner,
		});
	};

	/**
	 * On changes event for input variables
	 */
	ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
		for (const propName in changes) {
			if (propName) {
				const changedProp = changes[propName];
				if (changedProp.isFirstChange()) {
					return;
				} else if (typeof changedProp.currentValue !== 'undefined' && changedProp.currentValue !== changedProp.previousValue) {
					if (changedProp.currentValue !== '') {
						this.spinner[propName] = changedProp.currentValue;
						if (propName === 'showSpinner') {
							if (changedProp.currentValue) {
								this.spinnerService.show(this.spinner.name, this.spinner);
							} else {
								this.spinnerService.hide(this.spinner.name);
							}
						}
					}
				}
			}
		}
	}

	/**
	 * To get class for spinner
	 */
	getClass(type: string, size: Size): string {
		this.spinner.divCount = LOADERS[type];
		this.spinner.divArray = Array(this.spinner.divCount)
			.fill(0)
			.map((x, i) => i);
		let sizeClass = '';
		switch (size.toLowerCase()) {
			case 'small':
				sizeClass = 'la-sm';
				break;
			case 'medium':
				sizeClass = 'la-2x';
				break;
			case 'large':
				sizeClass = 'la-3x';
				break;
			default:
				break;
		}
		return 'la-' + type + ' ' + sizeClass;
	}

	/**
	 * Check if input variables have changed
	 */
	onInputChange() {
		this.spinner.class = this.getClass(this.spinner.type, this.spinner.size);
	}

	/**
	 * Component destroy event
	 */
	ngOnDestroy() {
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
	}
}
