/// <reference types="vitest/globals" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { By } from '@angular/platform-browser';
import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
	let fixture: ComponentFixture<SpinnerComponent>;
	let element: HTMLElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SpinnerComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SpinnerComponent);
		element = fixture.nativeElement as HTMLElement;
		fixture.detectChanges();
	});

	function progressSpinner(): MatProgressSpinner {
		return fixture.debugElement.query(By.directive(MatProgressSpinner)).componentInstance;
	}

	it('should render an indeterminate Material progress spinner', () => {
		const spinner: HTMLElement | null = element.querySelector('mat-progress-spinner');

		expect(spinner).not.toBeNull();
		expect(spinner?.classList).toContain('mx-auto');
		expect(progressSpinner().mode).toBe('indeterminate');
	});

	it('should expose an accessible progressbar', () => {
		const spinner: HTMLElement | null = element.querySelector('[role="progressbar"]');

		expect(spinner).not.toBeNull();
		expect(spinner?.getAttribute('aria-label')).toBe('Loading');
	});

	it('should apply the default diameter, stroke width and color', () => {
		expect(progressSpinner().diameter).toBe(50);
		expect(progressSpinner().strokeWidth).toBe(5);
		expect(progressSpinner().color).toBe('primary');
	});

	it('should pass diameter, strokeWidth and color through', () => {
		fixture.componentRef.setInput('diameter', 40);
		fixture.componentRef.setInput('strokeWidth', 4);
		fixture.componentRef.setInput('color', 'accent');
		fixture.detectChanges();

		expect(progressSpinner().diameter).toBe(40);
		expect(progressSpinner().strokeWidth).toBe(4);
		expect(progressSpinner().color).toBe('accent');
	});

	it('should ignore the deprecated bootstrapSpinner input', () => {
		fixture.componentRef.setInput('bootstrapSpinner', false);
		fixture.detectChanges();

		expect(element.querySelectorAll('mat-progress-spinner').length).toBe(1);
	});

	it('should not render the former CSS or Bootstrap spinner markup', () => {
		for (const legacyClass of ['spinner-border', 'bs-spinner', 'd-flex', 'justify-content-center']) {
			expect(element.querySelector(`.${legacyClass}`), `unexpected .${legacyClass}`).toBeNull();
		}
	});
});
