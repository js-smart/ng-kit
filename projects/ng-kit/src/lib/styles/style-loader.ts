import { ComponentRef, createComponent, DestroyRef, EnvironmentInjector, inject, Injectable, Type } from '@angular/core';

/**
 * Adds the styles of style-only components to the document, once per application.
 *
 * Directives cannot declare styles, so a directive that needs CSS asks this service to instantiate a template-less
 * component using `ViewEncapsulation.None`. Creating the component registers its styles with Angular's shared style
 * host, which also takes care of CSP nonces and server-side rendering. The component is never attached to the DOM.
 *
 * @internal
 */
@Injectable({ providedIn: 'root' })
export class NgKitStyleLoader {
	private readonly environmentInjector = inject(EnvironmentInjector);
	private readonly loaded = new Map<Type<unknown>, ComponentRef<unknown>>();

	constructor() {
		inject(DestroyRef).onDestroy(() => {
			this.loaded.forEach((componentRef) => componentRef.destroy());
			this.loaded.clear();
		});
	}

	/**
	 * Instantiates the given style-only component unless it has already been loaded for this application.
	 *
	 * @param styles Component whose styles should be added to the document
	 */
	load(styles: Type<unknown>): void {
		if (!this.loaded.has(styles)) {
			this.loaded.set(styles, createComponent(styles, { environmentInjector: this.environmentInjector }));
		}
	}
}
