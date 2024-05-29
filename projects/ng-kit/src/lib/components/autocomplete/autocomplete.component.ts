import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  input,
  OnChanges,
  OnInit,
  Optional,
  output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteModule, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TypeOfPipe } from '../../pipes/type-of.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';

/**
 * Reusable Auto Complete component that extends MatAutoComplete to show Clear icon and Arrow buttons
 *
 * @author Pavan Kumar Jadda
 * @since 12.0.0
 */
@Component({
	selector: 'autocomplete, lib-autocomplete',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		TypeOfPipe,
		MatFormFieldModule,
		MatAutocompleteModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		AsyncPipe,
	],
	templateUrl: './autocomplete.component.html',
})
export class AutocompleteComponent implements OnInit, OnChanges, AfterContentChecked {
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
	label = input('');

	/**
	 * Placeholder of the AutoComplete
	 */
	placeHolder = input('');

	/**
	 * Appearance of the AutoComplete, defaults to `fill`
	 */
	appearance = input('fill');

	/**
	 * List of CSS classes that need to applied to autocomplete
	 */
	classes = input('');

	/**
	 * Attribute of the Object whose value would be shown when searching for data. Defaults to `ID`
	 */
	bindLabel = input('');

	/**
	 * Attribute of the Object whose value would be used for search
	 */
	bindValue = input('id');

	/**
	 * Function that maps an option's control value to its display value in the trigger.
	 */
	@Input() @Optional() displayWith: ((value: any) => string) | null = null;

	/**
	 * Specifies if the autocomplete is required. Default is not required.
	 */
	required = input(false);

	/**
	 * List of Objects that need to be bind and searched for
	 */
	data = input<string[] | any[]>();

	/**
	 * Emit selected value on selection changes
	 *
	 * @author Pavan Kumar Jadda
	 * @since 13.0.3
	 */
	onSelectionChange = output<any>();

	/**
	 * BehaviorSubject that shows the current active arrow icon
	 */
	arrowIconSubject = new BehaviorSubject('arrow_drop_down');

	/**
	 * Filtered options when user
	 */
	filteredOptions: Observable<any[] | undefined> | undefined;

	constructor(private cdRef: ChangeDetectorRef) {}

	ngAfterContentChecked(): void {
		this.cdRef.detectChanges();
	}

	/**
	 * Define autocomplete search filter on search text changes
	 *
	 * @author Pavan Kumar Jadda
	 * @since 12.0.0
	 */
	ngOnInit() {
		this.filteredOptions = this.inputFormGroup?.get('autocomplete')?.valueChanges.pipe(
			startWith(''),
			map((value) => (typeof value === 'string' ? value : value !== null ? value[this.bindLabel()] : '')),
			map(
				(propertyName) =>
					this.data()?.filter((option) => {
						return typeof option === 'string'
							? option?.toLowerCase().indexOf(propertyName.toLowerCase()) === 0
							: option[this.bindLabel()]?.toLowerCase().indexOf(propertyName.toLowerCase()) === 0;
					}) ?? this.data()?.slice(),
			),
		);
	}

	ngOnChanges(_changes: SimpleChanges): void {
		this.displayFn = this.displayFn.bind(this);
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

	/**
	 * Display function that is used to show the values
	 *
	 * @author Pavan Kumar Jadda
	 * @since 12.0.0
	 */
	displayFn(object: any): string {
		if (this.displayWith !== undefined && this.displayWith !== null && typeof this.displayWith === 'function') {
			this.displayFn = this.displayWith.bind(this);
			return this.displayWith(object);
		} else {
			if (typeof object === 'string') return object;
			return object && object[this.bindLabel()] ? object[this.bindLabel()] : '';
		}
	}

	/**
	 * Emit selected value
	 * @param $event - Event emitted by autocomplete
	 *
	 * @author Pavan Kumar Jadda
	 * @since 13.0.3
	 */
	emitSelectedValue($event: MatOptionSelectionChange) {
		this.onSelectionChange.emit($event.source.value);
	}
}
