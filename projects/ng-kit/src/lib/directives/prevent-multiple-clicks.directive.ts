import { Directive, HostListener, input, OnDestroy, OnInit, output } from '@angular/core';
import { Subject, Subscription, throttleTime } from 'rxjs';

@Directive({
	selector: '[preventMultipleClicks]',
	standalone: true,
})
export class PreventMultipleClicksDirective implements OnInit, OnDestroy {
	throttleTime = input(2000);
	throttleClick = output<Event>();

	private clicks = new Subject<Event>();
	private subscription: Subscription | undefined;

	/**
	 * Intercepts click event and stops default navigation. After first click set {@link throttleTime} to 2000 to prevent duplicate clicks
	 *
	 * @param event DOM event
	 *
	 * @author Pavan Kumar Jadda
	 * @since 2.3.27
	 */
	@HostListener('click', ['$event'])
	clickEvent(event: Event) {
		event.preventDefault();
		event.stopPropagation();
		this.clicks.next(event);
	}

	ngOnInit() {
		this.subscription = this.clicks.pipe(throttleTime(this.throttleTime())).subscribe((e) => this.throttleClick.emit(e));
	}

	ngOnDestroy() {
		this.subscription?.unsubscribe();
	}
}
