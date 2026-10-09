/// <reference types="vitest/globals" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
	let fixture: ComponentFixture<SpinnerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({ imports: [SpinnerComponent] }).compileComponents();
		fixture = TestBed.createComponent(SpinnerComponent);
	});

	it('renders an indeterminate Material spinner by default with the existing centering class', () => {
		fixture.detectChanges();
		const spinner = fixture.nativeElement.querySelector('mat-progress-spinner');
		expect(spinner).toBeTruthy();
		expect(spinner.getAttribute('mode')).toBe('indeterminate');
		expect(spinner.classList).toContain('mx-auto');
		expect(fixture.nativeElement.querySelector('.bs-spinner')).toBeNull();
	});

	it('keeps the Material spinner when the deprecated Bootstrap input is enabled', () => {
		fixture.componentRef.setInput('bootstrapSpinner', true);
		fixture.detectChanges();
		expect(fixture.nativeElement.querySelector('mat-progress-spinner')).toBeTruthy();
		expect(fixture.nativeElement.querySelector('.bs-spinner')).toBeNull();
	});
});
