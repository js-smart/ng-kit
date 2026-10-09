/// <reference types="vitest/globals" />
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AlertComponent, AlertType } from './alert.component';

@Component({
	template: ` <lib-alert>Test Content</lib-alert> `,
	imports: [AlertComponent],
})
class TestAlertComponent {}

const ALERT_TYPES: AlertType[] = ['info', 'primary', 'secondary', 'success', 'warning', 'danger', 'dark', 'light'];

describe('AlertComponent', () => {
	let component: AlertComponent;
	let fixture: ComponentFixture<AlertComponent>;

	function alertElement(): HTMLElement | null {
		return (fixture.nativeElement as HTMLElement).querySelector('[role="alert"]');
	}

	function closeButton(): HTMLButtonElement | null {
		return (fixture.nativeElement as HTMLElement).querySelector('button[aria-label="Close"]');
	}

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AlertComponent, TestAlertComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(AlertComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have default values', () => {
		expect(component.type()).toBe('info');
		expect(component.isOpen()).toBe(true);
		expect(component.dismissible()).toBe(true);
		expect(component.dismissOnTimeout()).toBe(true);
		expect(component.dismissTimeout()).toBe(5000);
	});

	it.each(ALERT_TYPES)('should apply the alert-{type} class for type %s', (type: AlertType) => {
		fixture.componentRef.setInput('type', type);
		fixture.detectChanges();

		const classList: DOMTokenList | undefined = alertElement()?.classList;
		expect(classList).toContain('alert');
		expect(classList).toContain('alert-dismissible');
		expect(classList).toContain('alert_div');
		expect(classList).toContain(`alert-${type}`);
		// exactly one type class at a time
		expect(Array.from(classList ?? []).filter((c) => /^alert-(info|primary|secondary|success|warning|danger|dark|light)$/.test(c))).toEqual(
			[`alert-${type}`],
		);
	});

	it('should preserve the existing layout classes', () => {
		const container: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector('.row');
		const column: HTMLElement | null = container?.querySelector('.col-xs-12.col-sm-12.col-md-auto.mx-auto') ?? null;
		expect(container).not.toBeNull();
		expect(column).not.toBeNull();
	});

	it('should add custom classes from class input to the container', () => {
		fixture.componentRef.setInput('class', 'custom-class-1 custom-class-2');
		fixture.detectChanges();

		const container: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector('.row');
		expect(container).not.toBeNull();
		expect(container?.classList).toContain('custom-class-1');
		expect(container?.classList).toContain('custom-class-2');
		expect(alertElement()?.classList).not.toContain('custom-class-1');
	});

	it('should not render when open signal is false', () => {
		component.open.set(false);
		fixture.detectChanges();

		expect(alertElement()).toBeNull();
	});

	it('should show close button by default and hide it when dismissible is false', () => {
		expect(closeButton()).not.toBeNull();
		expect(closeButton()?.type).toBe('button');
		expect(closeButton()?.classList).toContain('btn-close');

		fixture.componentRef.setInput('dismissible', false);
		fixture.detectChanges();

		expect(closeButton()).toBeNull();
	});

	it('should call closeAlert and emit closed output when close button is clicked', () => {
		const closedSpy = vi.spyOn(component.closed, 'emit');
		closeButton()?.click();
		fixture.detectChanges();

		expect(component.open()).toBe(false);
		expect(closedSpy).toHaveBeenCalledTimes(1);
		expect(alertElement()).toBeNull();
	});

	it('should emit closed only once when closeAlert is called repeatedly', () => {
		const closedSpy = vi.spyOn(component.closed, 'emit');
		component.closeAlert();
		component.closeAlert();

		expect(closedSpy).toHaveBeenCalledTimes(1);
	});

	it('should project content', () => {
		const hostFixture = TestBed.createComponent(TestAlertComponent);
		hostFixture.detectChanges();
		const alert: HTMLElement = hostFixture.debugElement.query(By.css('[role="alert"]')).nativeElement;

		expect(alert.textContent).toContain('Test Content');
	});

	describe('Timeout Logic (Zoneless)', () => {
		beforeEach(() => {
			vi.useFakeTimers();
		});

		afterEach(() => {
			vi.useRealTimers();
		});

		it('should close automatically after timeout when dismissOnTimeout is true', () => {
			// Create a fresh fixture inside fake timers scope to capture ngOnInit
			const newFixture = TestBed.createComponent(AlertComponent);
			newFixture.detectChanges(); // Trigger ngOnInit
			expect(newFixture.componentInstance.open()).toBe(true);

			vi.advanceTimersByTime(5000);
			expect(newFixture.componentInstance.open()).toBe(false);
		});

		it('should not close automatically after timeout when dismissOnTimeout is false', () => {
			const newFixture = TestBed.createComponent(AlertComponent);
			newFixture.componentRef.setInput('dismissOnTimeout', false);
			newFixture.detectChanges();

			vi.advanceTimersByTime(5000);
			expect(newFixture.componentInstance.open()).toBe(true);
		});

		it('should use custom dismissTimeout', () => {
			const customTimeout = 2000;
			const newFixture = TestBed.createComponent(AlertComponent);
			newFixture.componentRef.setInput('dismissTimeout', customTimeout);
			newFixture.detectChanges();

			vi.advanceTimersByTime(1999);
			expect(newFixture.componentInstance.open()).toBe(true);

			vi.advanceTimersByTime(1);
			expect(newFixture.componentInstance.open()).toBe(false);
		});
	});

	it('should have accessibility attributes', () => {
		const alert: HTMLElement | null = alertElement();

		expect(alert?.getAttribute('role')).toBe('alert');
		expect(alert?.getAttribute('aria-live')).toBe('polite');
		expect(closeButton()?.getAttribute('aria-label')).toBe('Close');
	});
});
