import { ComponentRef, Directive, ElementRef, inject, OnInit, signal, ViewContainerRef } from '@angular/core';
import { EditSolidSvgComponent } from '../../../svg-icons/edit-solid-svg/edit-solid-svg.component';

@Directive({
	selector: '[editBsButton]',
})
export class EditBsButtonDirective implements OnInit {
	elementRef = inject(ElementRef);
	viewContainerRef = inject(ViewContainerRef);
	protected originalText = signal('');
	protected iconComponentRef = signal<ComponentRef<EditSolidSvgComponent> | null>(null);

	ngOnInit(): void {
		// Add the btn class first
		this.elementRef.nativeElement.classList.add('btn', 'text-primary');

		// Capture original text before creating icon
		this.originalText.set(this.elementRef.nativeElement.textContent?.trim() || 'Edit');

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
	}
}
