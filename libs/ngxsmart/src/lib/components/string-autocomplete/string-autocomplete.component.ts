import { AfterContentChecked, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteModule, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'lib-string-autocomplete, string-autocomplete',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatAutocompleteModule, MatInputModule, MatButtonModule, MatIconModule],
	templateUrl: './string-autocomplete.component.html',
	styleUrls: ['./string-autocomplete.component.css'],
})
export class StringAutocompleteComponent implements OnInit, AfterContentChecked {
	/**
	 * Gets reference inputAutoComplete HTML attribute
	 */
	@ViewChild('inputAutoComplete') inputAutoComplete!: ElementRef;

	/**
	 * Input form group of the auto complete
	 */
	@Input() inputFormGroup!: FormGroup;

	/**
	 * Label of the AutoComplete
	 */
	@Input() label = '';

	/**
	 * Place Holder of the AutoComplete
	 */
	@Input() placeHolder = '';

	/**
	 * Appearance of the AutoComplete, defaults to `fill`
	 */
	@Input() appearance = 'fill';

	/**
	 * List of CSS classes that need to applied to autocomplete
	 */
	@Input() classes = '';

	/**
	 * Specifies if the autocomplete is required. Default is not required.
	 */
	@Input() required = false;

	/**
	 * List of Objects that need to be bind and searched for
	 */
	@Input() data: string[] | undefined;

	/**
	 * BehaviorSubject that shows the current active arrow icon
	 */
	arrowIconSubject = new BehaviorSubject('arrow_drop_down');

	/**
	 * Filtered options when user
	 */
	filteredOptions: Observable<string[]> | undefined;

	constructor(private cdRef: ChangeDetectorRef) {}

	/**
	 * Define autocomplete search filter on search text changes
	 *
	 * @author Pavan Kumar Jadda
	 * @since 12.0.0
	 */
	ngOnInit() {
		// @ts-ignore
		this.filteredOptions = this.inputFormGroup?.get('autocomplete')?.valueChanges.pipe(
			startWith(''),
			map((value) => (typeof value === 'string' ? value : '')),
			map((propertyName) =>
				propertyName ? this.data?.filter((option) => option.toLowerCase().indexOf(propertyName.toLowerCase()) === 0) : this.data?.slice()
			)
		);
	}

	/**
	 * Detect and load changes when Form changed
	 *
	 * @author Pavan Kumar Jadda
	 * @since 12.0.0
	 */
	ngAfterContentChecked(): void {
		this.cdRef.detectChanges();
	}

	/**
	 * Clear input and Reset autocomplete form control
	 *
	 * @author Pavan Kumar Jadda
	 * @since 12.0.0
	 */
	clearInput(evt: any): void {
		evt.stopPropagation();
		this.inputFormGroup.get('autocomplete')?.reset();
		this.inputAutoComplete?.nativeElement.focus();
	}

	/**
	 * Open or Close panel
	 *
	 * @author Pavan Kumar Jadda
	 * @since 12.0.0
	 */
	openOrClosePanel(evt: any, trigger: MatAutocompleteTrigger): void {
		evt.stopPropagation();
		if (trigger.panelOpen) trigger.closePanel();
		else trigger.openPanel();
	}
}
