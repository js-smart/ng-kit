import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { NgxSpinnerComponent } from './ngx-spinner.component';
import { DEFAULTS, NgxSpinner, PRIMARY_SPINNER } from './ngx-spinner.enum';
import { NgxSpinnerService } from './ngx-spinner.service';

describe('NgxSpinnerComponent', () => {
	let component: NgxSpinnerComponent;
	let fixture: ComponentFixture<NgxSpinnerComponent>;
	let spinnerService: ReturnType<typeof vi.spyOn>;
	let changeDetectorRef: ReturnType<typeof vi.spyOn>;

	const mockSpinnerSubject = new BehaviorSubject<NgxSpinner>(new NgxSpinner());

	// Helper function to create a keyboard event with spies
	const createKeyboardEvent = (type = 'keydown'): KeyboardEvent => {
		const event = new KeyboardEvent(type);
		vi.spyOn(event, 'preventDefault');
		Object.defineProperty(event, 'returnValue', {
			set: vi.fn(),
			get: vi.fn(() => false),
			configurable: true,
		});
		return event;
	};

	beforeEach(async () => {
		const spySpinnerService = {
			getSpinner: vi.fn().mockReturnValue(mockSpinnerSubject.asObservable()),
			show: vi.fn(),
			hide: vi.fn(),
		} as unknown as NgxSpinnerService;
		const spyChangeDetectorRef = {
			detectChanges: vi.fn(),
		} as unknown as ChangeDetectorRef;

		await TestBed.configureTestingModule({
			imports: [NgxSpinnerComponent],
			providers: [
				{ provide: NgxSpinnerService, useValue: spySpinnerService },
				{ provide: ChangeDetectorRef, useValue: spyChangeDetectorRef },
			],
		}).compileComponents();

		spinnerService = TestBed.inject(NgxSpinnerService);
		changeDetectorRef = TestBed.inject(ChangeDetectorRef);
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(NgxSpinnerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should initialize with default values', () => {
		expect(component.bdColor()).toBe(DEFAULTS.BD_COLOR);
		expect(component.size()).toBe('large');
		expect(component.color()).toBe(DEFAULTS.SPINNER_COLOR);
		expect(component.type()).toBe(DEFAULTS.SPINNER_TYPE);
		expect(component.fullScreen()).toBe(true);
		expect(component.name()).toBe(PRIMARY_SPINNER);
		expect(component.zIndex()).toBe(DEFAULTS.Z_INDEX);
		expect(component.template()).toBe('');
		expect(component.showSpinner()).toBe(false);
		expect(component.disableAnimation()).toBe(false);
	});

	it('should update spinner when service emits new value', () => {
		const newSpinner = new NgxSpinner({
			name: 'test-spinner',
			bdColor: 'rgba(0,0,0,0.8)',
			size: 'medium',
			color: '#ffffff',
			type: 'ball-spin',
			fullScreen: false,
			show: true,
		});

		mockSpinnerSubject.next(newSpinner);

		expect(component.spinner.name).toBe('test-spinner');
		expect(component.spinner.bdColor).toBe('rgba(0,0,0,0.8)');
		expect(component.spinner.size).toBe('medium');
		expect(component.spinner.color).toBe('#ffffff');
		expect(component.spinner.type).toBe('ball-spin');
		expect(component.spinner.fullScreen).toBe(false);
		expect(component.spinner.show).toBe(true);
	});

	describe('Keyboard Event Handling', () => {
		it('should handle keydown event when spinner is visible', () => {
			const event = createKeyboardEvent();
			component.spinnerDOM = { nativeElement: document.createElement('div') };

			component.handleKeyboardEvent(event);

			expect(event.preventDefault).toHaveBeenCalled();
			expect(event.returnValue).toBe(false);
		});

		it('should handle keyup event when spinner is visible', () => {
			const event = createKeyboardEvent('keyup');
			component.spinnerDOM = { nativeElement: document.createElement('div') };

			component.handleKeyboardEvent(event);

			expect(event.preventDefault).toHaveBeenCalled();
			expect(event.returnValue).toBe(false);
		});

		it('should not handle keyboard events when spinner is not visible', () => {
			const event = createKeyboardEvent();
			component.spinnerDOM = null;

			component.handleKeyboardEvent(event);

			expect(event.preventDefault).not.toHaveBeenCalled();
		});

		it('should not handle keyboard events when spinner DOM is not initialized', () => {
			const event = createKeyboardEvent();
			component.spinnerDOM = undefined;

			component.handleKeyboardEvent(event);

			expect(event.preventDefault).not.toHaveBeenCalled();
		});
	});

	describe('Spinner Class Generation', () => {
		it('should generate correct class name for large spinner', () => {
			const type = 'ball-spin';
			const size = 'large';
			const className = component.getClass(type, size);
			expect(className).toBe('la-ball-spin la-3x');
		});

		it('should generate correct class name for medium spinner', () => {
			const type = 'ball-spin';
			const size = 'medium';
			const className = component.getClass(type, size);
			expect(className).toBe('la-ball-spin la-2x');
		});

		it('should generate correct class name for small spinner', () => {
			const type = 'ball-spin';
			const size = 'small';
			const className = component.getClass(type, size);
			expect(className).toBe('la-ball-spin la-sm');
		});

		it('should update spinner class on input change', () => {
			component.spinner.type = 'ball-spin';
			component.spinner.size = 'large';
			component.onInputChange();
			expect(component.spinner.class).toBe('la-ball-spin la-3x');
		});

		it('should use default values when type or size is undefined', () => {
			component.spinner.type = undefined;
			component.spinner.size = undefined;
			component.onInputChange();
			expect(component.spinner.class).toBe(`la-${DEFAULTS.SPINNER_TYPE} `);
		});
	});

	describe('Component Lifecycle', () => {
		it('should clean up subscription on destroy', () => {
			vi.spyOn(component.ngUnsubscribe, 'next');
			vi.spyOn(component.ngUnsubscribe, 'complete');

			component.ngOnDestroy();

			expect(component.ngUnsubscribe.next).toHaveBeenCalled();
			expect(component.ngUnsubscribe.complete).toHaveBeenCalled();
		});

		it('should set default options on init', () => {
			vi.spyOn(component, 'setDefaultOptions');
			component.ngOnInit();
			expect(component.setDefaultOptions).toHaveBeenCalled();
		});
	});
});
