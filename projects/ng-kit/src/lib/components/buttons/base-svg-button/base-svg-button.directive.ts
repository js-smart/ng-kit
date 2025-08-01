import { ComponentRef, Directive, ElementRef, inject, input, OnInit, Renderer2, signal, ViewContainerRef } from '@angular/core';
import { EditSolidSvgComponent } from '../../../svg-icons/edit-solid-svg/edit-solid-svg.component';

@Directive()
export abstract class BaseSvgButtonDirective implements OnInit {
	icon = input<string>('');
	elementRef = inject(ElementRef);
	renderer = inject(Renderer2);
	viewContainerRef = inject(ViewContainerRef);
	protected iconComponentRef = signal<ComponentRef<EditSolidSvgComponent> | null>(null);

	constructor() {
		this.renderer.addClass(this.elementRef.nativeElement, 'btn');
	}

	ngOnInit(): void {
		// Create icon after capturing text
		this.createIcon();
	}

	protected createIcon(): void {
		if (this.icon()) {
			// Create the EditSolidSvgComponent dynamically
			const iconComponentRef = this.viewContainerRef.createComponent(EditSolidSvgComponent);

			// Add spacing class to the component's host element
			this.renderer.addClass(iconComponentRef.location.nativeElement, 'pe-2');

			// Append the component to the button
			this.renderer.appendChild(this.elementRef.nativeElement, iconComponentRef.location.nativeElement);

			// Store the component reference
			this.iconComponentRef.set(iconComponentRef);
		}
	}
}
