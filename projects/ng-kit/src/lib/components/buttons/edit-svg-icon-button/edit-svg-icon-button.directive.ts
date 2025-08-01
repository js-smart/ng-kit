import { ComponentRef, Directive, ElementRef, inject, OnInit, signal, ViewContainerRef } from '@angular/core';
import { EditSolidSvgComponent } from '../../../svg-icons/edit-solid-svg/edit-solid-svg.component';

@Directive({
	selector: '[editSvgIconButton]',
})
export class EditSvgIconButtonDirective implements OnInit {
	elementRef = inject(ElementRef);
	viewContainerRef = inject(ViewContainerRef);

	protected originalText = signal('');
	protected iconComponentRef = signal<ComponentRef<EditSolidSvgComponent> | null>(null);

	ngOnInit(): void {
		// Add Material Design button classes
		this.elementRef.nativeElement.classList.add('mat-raised-button', 'primary-button');

		// Capture original text before creating icon
		this.originalText.set(this.elementRef.nativeElement.textContent?.trim() || 'Edit');

		// Set data-cy attribute for testing
		this.elementRef.nativeElement.setAttribute('data-cy', 'edit-svg-icon-button');

		// Update content to show icon and text
		this.updateContent();
	}

	private updateContent(): void {
		// Create the EditSolidSvgComponent properly using Angular's component system
		const componentRef = this.viewContainerRef.createComponent(EditSolidSvgComponent);
		this.iconComponentRef.set(componentRef);

		// Clear the original content and append the icon component
		this.elementRef.nativeElement.textContent = '';
		this.elementRef.nativeElement.appendChild(componentRef.location.nativeElement);

		// Add text after the icon
		this.elementRef.nativeElement.appendChild(document.createTextNode(' ' + this.originalText()));

		console.log('Edit SVG icon component created and stored in signal', componentRef);
	}
}
