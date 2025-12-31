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

describe('AlertComponent', () => {
	let component: AlertComponent;
	let fixture: ComponentFixture<AlertComponent>;

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

	it('should apply correct bootstrap class based on type', () => {
		const types: AlertType[] = ['success', 'danger', 'warning', 'info', 'primary', 'secondary', 'dark', 'light'];

		types.forEach((type) => {
			fixture.componentRef.setInput('type', type);
			fixture.detectChanges();
			const alertDiv = fixture.debugElement.query(By.css('.alert'));
			expect(alertDiv.nativeElement.classList).toContain(`alert-${type}`);
		});
	});

	it('should add custom classes from class input', () => {
		fixture.componentRef.setInput('class', 'custom-class-1 custom-class-2');
		fixture.detectChanges();
		const rowDiv = fixture.debugElement.query(By.css('.row'));
		expect(rowDiv.nativeElement.classList).toContain('custom-class-1');
		expect(rowDiv.nativeElement.classList).toContain('custom-class-2');
	});

	it('should not render when open signal is false', () => {
		component.open.set(false);
		fixture.detectChanges();
		const alertDiv = fixture.debugElement.query(By.css('.alert'));
		expect(alertDiv).toBeNull();
	});

	it('should show close button by default and hide it when dismissible is false', () => {
		let closeButton = fixture.debugElement.query(By.css('.btn-close'));
		expect(closeButton).toBeTruthy();

		fixture.componentRef.setInput('dismissible', false);
		fixture.detectChanges();
		closeButton = fixture.debugElement.query(By.css('.btn-close'));
		expect(closeButton).toBeNull();
	});

	it('should call closeAlert and emit closed output when close button is clicked', () => {
		const closedSpy = vi.spyOn(component.closed, 'emit');
		const closeButton = fixture.debugElement.query(By.css('.btn-close'));
		closeButton.nativeElement.click();

		expect(component.open()).toBe(false);
		expect(closedSpy).toHaveBeenCalled();
	});

	it('should project content', () => {
		const hostFixture = TestBed.createComponent(TestAlertComponent);
		hostFixture.detectChanges();
		const alertElement = hostFixture.debugElement.query(By.css('.alert'));
		expect(alertElement.nativeElement.textContent).toContain('Test Content');
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
		const alertDiv = fixture.debugElement.query(By.css('.alert'));
		expect(alertDiv.attributes['role']).toBe('alert');
		expect(alertDiv.attributes['aria-live']).toBe('polite');
	});
});
