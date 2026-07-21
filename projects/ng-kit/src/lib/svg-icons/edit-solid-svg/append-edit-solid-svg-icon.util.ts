import { ComponentRef, ViewContainerRef } from '@angular/core';
import { EditSolidSvgComponent } from './edit-solid-svg.component';

/**
 * Mounts {@link EditSolidSvgComponent} into a host element with a text label.
 * Destroys any previously mounted icon component reference.
 */
export function mountEditSolidSvgIcon(
	viewContainerRef: ViewContainerRef,
	document: Document,
	host: HTMLElement,
	label: string,
	iconComponentRef: ComponentRef<EditSolidSvgComponent> | null,
): ComponentRef<EditSolidSvgComponent> {
	iconComponentRef?.destroy();

	const componentRef = viewContainerRef.createComponent(EditSolidSvgComponent);

	host.textContent = '';
	host.appendChild(componentRef.location.nativeElement);
	host.appendChild(document.createTextNode(' ' + label));

	return componentRef;
}
