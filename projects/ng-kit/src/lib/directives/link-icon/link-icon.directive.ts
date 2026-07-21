import {
	ApplicationRef,
	createComponent,
	Directive,
	effect,
	ElementRef,
	EnvironmentInjector,
	inject,
	input,
	OnDestroy,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';


/**
 * A directive that adds an icon to a link.
 *
 * @example
 * <a linkIcon="home">Home</a>
 *
 * @author Pavan Kumar Jadda
 * @since 22.5.0
 */
@Directive({
	selector: 'a[linkIcon]',
	host: {
		class: 'app-link-icon',
	},
})
export class LinkIconDirective implements OnDestroy {
	readonly linkIcon = input.required<string>();

	private readonly host = inject(ElementRef<HTMLAnchorElement>);
	private readonly environmentInjector = inject(EnvironmentInjector);
	private readonly appRef = inject(ApplicationRef);
	private readonly iconRef = createComponent(MatIcon, { environmentInjector: this.environmentInjector });

	constructor() {
		this.iconRef.setInput('inline', true);
		this.iconRef.location.nativeElement.setAttribute('aria-hidden', 'true');
		this.host.nativeElement.prepend(this.iconRef.location.nativeElement);
		this.appRef.attachView(this.iconRef.hostView);

		effect(() => {
			this.iconRef.location.nativeElement.textContent = this.linkIcon();
			this.iconRef.changeDetectorRef.detectChanges();
		});
	}

	/**
	 * Destroy the dynamically created icon when the host link is destroyed
	 *
	 * @author Pavan Kumar Jadda
	 * @since 22.5.0
	 */
	ngOnDestroy(): void {
		this.appRef.detachView(this.iconRef.hostView);
		this.iconRef.destroy();
	}
}
