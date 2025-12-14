import { ChangeDetectorRef, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PreventMultipleClicksDirective } from '@js-smart/ng-kit';

@Component({
	template: ` <button preventMultipleClicks [throttleTime]="throttleTime" (throttleClick)="onClick($event)">Test Button</button>`,
	standalone: true,
	imports: [PreventMultipleClicksDirective],
})
class TestComponent {
	throttleTime = 2000;
	clicks: Event[] = [];

	onClick(event: Event) {
		this.clicks.push(event);
	}
}

describe('PreventMultipleClicksDirective', () => {
	let component: TestComponent;
	let fixture: ComponentFixture<TestComponent>;
	let button: HTMLButtonElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TestComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		button = fixture.debugElement.query(By.css('button')).nativeElement;
	});

	it('should create', () => {
		const directive = fixture.debugElement.query(By.directive(PreventMultipleClicksDirective));
		expect(directive).toBeTruthy();
	});

	it('should prevent default behavior and stop propagation', () => {
		const event = new MouseEvent('click');
		vi.spyOn(event, 'preventDefault');
		vi.spyOn(event, 'stopPropagation');

		button.dispatchEvent(event);

		expect(event.preventDefault).toHaveBeenCalled();
		expect(event.stopPropagation).toHaveBeenCalled();
	});

	it('should emit only one event within throttle time period', () => {
		vi.useFakeTimers();

		// First click
		button.click();
		vi.advanceTimersByTime(1000); // Wait 1 second

		// Second click within throttle period
		button.click();
		vi.advanceTimersByTime(1000);

		expect(component.clicks.length).toBe(1);

		// Third click after throttle period
		vi.advanceTimersByTime(2000);
		button.click();

		expect(component.clicks.length).toBe(2);

		vi.useRealTimers();
	});

	it('should respect custom throttle time', () => {
		vi.useFakeTimers();

		component.throttleTime = 1000;
		const cdr = fixture.debugElement.injector.get(ChangeDetectorRef);
		cdr.detectChanges();

		button.click();
		vi.advanceTimersByTime(500);
		button.click(); // Should be throttled
		vi.advanceTimersByTime(500);

		expect(component.clicks.length).toBe(1);

		vi.advanceTimersByTime(1000);
		button.click(); // Should emit after throttle period

		expect(component.clicks.length).toBe(2);

		vi.useRealTimers();
	});

	it('should clean up subscription on destroy', () => {
		const directive = fixture.debugElement.query(By.directive(PreventMultipleClicksDirective));
		const instance = directive.injector.get(PreventMultipleClicksDirective);

		const subscription = instance['subscription'];
		vi.spyOn(subscription!, 'unsubscribe');

		fixture.destroy();

		expect(subscription?.unsubscribe).toHaveBeenCalled();
	});
});
