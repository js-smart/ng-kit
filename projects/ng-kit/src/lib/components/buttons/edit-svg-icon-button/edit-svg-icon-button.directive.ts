import { ComponentRef, Directive, DOCUMENT, ElementRef, inject, OnDestroy, OnInit, signal, ViewContainerRef } from '@angular/core';
import { mountEditSolidSvgIcon } from '../../../svg-icons/edit-solid-svg/append-edit-solid-svg-icon.util';
import { EditSolidSvgComponent } from '../../../svg-icons/edit-solid-svg/edit-solid-svg.component';

@Directive({
	selector: '[editSvgIconButton]',
})
export class EditSvgIconButtonDirective implements OnInit, OnDestroy {
	elementRef = inject(ElementRef);
	viewContainerRef = inject(ViewContainerRef);
	document = inject(DOCUMENT);

	protected originalText = signal('');
	private iconComponentRef: ComponentRef<EditSolidSvgComponent> | null = null;

	ngOnInit(): void {
		this.elementRef.nativeElement.classList.add('mat-raised-button', 'primary-button', 'gap-1');
		this.originalText.set(this.elementRef.nativeElement.textContent?.trim() || 'Edit');
		this.elementRef.nativeElement.setAttribute('data-cy', 'edit-svg-icon-button');
		this.updateContent();
	}

	ngOnDestroy(): void {
		this.iconComponentRef?.destroy();
	}

	private updateContent(): void {
		this.iconComponentRef = mountEditSolidSvgIcon(
			this.viewContainerRef,
			this.document,
			this.elementRef.nativeElement,
			this.originalText(),
			this.iconComponentRef,
		);
	}
}
