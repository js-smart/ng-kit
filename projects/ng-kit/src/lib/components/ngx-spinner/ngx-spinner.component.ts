import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, HostListener, input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DEFAULTS, LOADERS, NgxSpinner, PRIMARY_SPINNER, Size } from './ngx-spinner.enum';
import { NgxSpinnerService } from './ngx-spinner.service';
import { SafeHtmlPipe } from './safe-html.pipe';

@Component({
	selector: 'ngx-spinner',
	imports: [SafeHtmlPipe],
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
export class NgxSpinnerComponent implements OnDestroy, OnInit {
	/**
	 * To set backdrop color
	 * Only supports RGBA color format
	 */
	bdColor = input<string>(DEFAULTS.BD_COLOR);

	/**
	 * To set spinner size
	 */
	size = input<Size>('large');

	/**
	 * To set spinner color(DEFAULTS.SPINNER_COLOR)
	 */
	color = input<string>(DEFAULTS.SPINNER_COLOR);

	/**
	 * To set type of spinner
	 */
	type = input<string>(DEFAULTS.SPINNER_TYPE);

	/**
	 * To toggle fullscreen mode
	 */
	fullScreen = input<boolean>(true);

	/**
	 * Spinner name
	 */
	name = input<string>(PRIMARY_SPINNER);

	/**
	 * z-index value
	 */
	zIndex = input<number>(DEFAULTS.Z_INDEX);

	/**
	 * Custom template for spinner/loader
	 */
	template = input<string | undefined>(undefined);

	/**
	 * Show/Hide the spinner
	 * @type {boolean}
	 */
	showSpinner = input<boolean>(false);

	/**
	 * To enable/disable animation
	 */
	disableAnimation = input<boolean>(false);

	/**
	 * Spinner Object
	 */
	spinner: NgxSpinner = new NgxSpinner();

	/**
	 * Array for spinner's div
	 */
	divArray: number[] = [];

	/**
	 * Counter for div
	 */
	divCount = 0;

	/**
	 * Show spinner
	 **/
	show = false;

	/**
	 * Unsubscribe from spinner's observable
	 **/
	ngUnsubscribe = new Subject<void>();

	/**
	 * Element Reference
	 */
	// @ts-ignore
	@ViewChild('overlay') spinnerDOM;

	/**
	 * Creates an instance of NgxSpinnerComponent.
	 */
	constructor(
		private spinnerService: NgxSpinnerService,
		private changeDetector: ChangeDetectorRef,
	) {}

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
			.getSpinner(this.name())
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
			name: this.name(),
			bdColor: this.bdColor(),
			size: this.size(),
			color: this.color(),
			type: this.type(),
			fullScreen: this.fullScreen(),
			divArray: this.divArray,
			divCount: this.divCount,
			show: this.show,
			zIndex: this.zIndex(),
			template: this.template(),
			showSpinner: this.showSpinner(),
		});
	};

	/**
	 * To get class for spinner
	 */
	getClass(type: string, size: Size): string {
		// @ts-ignore
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
		this.spinner.class = this.getClass(this.spinner.type ?? DEFAULTS.SPINNER_TYPE, this.spinner.size ?? 'default');
	}

	/**
	 * Component destroy event
	 */
	ngOnDestroy() {
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
	}
}
