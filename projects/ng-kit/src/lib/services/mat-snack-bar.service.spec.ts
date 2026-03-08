/// <reference types="vitest/globals" />
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarService } from './mat-snack-bar.service';
import { ErrorSnackBarComponent } from '../components/snack-bar/error-snack-bar/error-snack-bar.component';
import { SuccessSnackBarComponent } from '../components/snack-bar/success-snack-bar/success-snack-bar.component';

describe('MatSnackBarService', () => {
	let service: MatSnackBarService;
	let snackBar: {
		openFromComponent: ReturnType<typeof vi.fn>;
		open: ReturnType<typeof vi.fn>;
	};

	beforeEach(() => {
		snackBar = {
			openFromComponent: vi.fn(),
			open: vi.fn(),
		};

		TestBed.configureTestingModule({
			providers: [MatSnackBarService, { provide: MatSnackBar, useValue: snackBar }],
		});

		service = TestBed.inject(MatSnackBarService);
	});

	it('should use default duration when no duration is provided (success)', () => {
		service.success('Saved');

		expect(snackBar.openFromComponent).toHaveBeenCalledTimes(1);
		const [component, config] = snackBar.openFromComponent.mock.calls[0];
		expect(component).toBe(SuccessSnackBarComponent);
		expect(config?.duration).toBe(5000);
	});

	it('should use default duration when no duration is provided (error)', () => {
		service.error('Failed');

		expect(snackBar.openFromComponent).toHaveBeenCalledTimes(1);
		const [component, config] = snackBar.openFromComponent.mock.calls[0];
		expect(component).toBe(ErrorSnackBarComponent);
		expect(config?.duration).toBe(5000);
	});

	it('should use default duration when no duration is provided (open)', () => {
		service.open('Hello');

		expect(snackBar.open).toHaveBeenCalledTimes(1);
		const [, , config] = snackBar.open.mock.calls[0];
		expect(config?.duration).toBe(5000);
	});
});
