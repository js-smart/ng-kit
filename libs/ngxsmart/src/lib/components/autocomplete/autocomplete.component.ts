import {
	AfterContentChecked,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter,
	forwardRef,
	Input,
	OnChanges,
	OnInit,
	Optional,
	Output,
	SimpleChanges,
	ViewChild,
} from '@angular/core';
import { BehaviorSubject, map, Observable, startWith } from 'rxjs';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatOptionSelectionChange } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TypeOfPipe } from '../../pipes/type-of.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
		CommonModule,
		ReactiveFormsModule,
		TypeOfPipe,
		MatFormFieldModule,
		MatAutocompleteModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
	],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => AutocompleteComponent),
			multi: true,
		},
	],
	templateUrl: './autocomplete.component.html',
	changeDetection: ChangeDetectionStrategy.Default,
})
export class AutocompleteComponent implements OnInit, OnChanges, AfterContentChecked, ControlValueAccessor {
	/**
	 * Gets reference inputAutoComplete HTML attribute
	 */
	@ViewChild('inputAutoComplete') inputAutoComplete!: ElementRef;

	/**
	 * Label of the AutoComplete
	 */
	@Input() label = '';

	/**
	 * Placeholder of the AutoComplete
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
	 * Attribute of the Object whose value would be shown when searching for data. Defaults to `ID`
	 */
	@Input() bindLabel = '';

	/**
	 * Attribute of the Object whose value would be used for search
	 */
	@Input() bindValue = 'id';

	/**
	 * Function that maps an option's control value to its display value in the trigger.
	 */
	@Input() @Optional() displayWith: ((value: any) => string) | null = null;

	/**
	 * Specifies if the autocomplete is required. Default is not required.
	 */
	@Input() required = false;

	/**
	 * List of Objects that need to be bind and searched for
	 */
	@Input() data: any[] | undefined;

	/**
	 * Emit selected value on selection changes
	 *
	 * @author Pavan Kumar Jadda
	 * @since 13.0.3
	 */
	@Output() onSelectionChange = new EventEmitter<any>();

	/**
	 * BehaviorSubject that shows the current active arrow icon
	 */
	arrowIconSubject = new BehaviorSubject('arrow_drop_down');

	/**
	 * Filtered options when user
	 */
	filteredOptions: Observable<any[] | undefined> | undefined;
	value: any;
	private _disabled = false;

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
		this.filteredOptions = this.inputAutoComplete.nativeElement.valueChanges.pipe(
			startWith(''),
			map((value) => (typeof value === 'string' ? value : value !== null ? value[this.bindLabel] : '')),
			map(
				(propertyName) =>
					this.data?.filter((option) => {
						return typeof option === 'string'
							? option?.toLowerCase().indexOf(propertyName.toLowerCase()) === 0
							: option[this.bindLabel]?.toLowerCase().indexOf(propertyName.toLowerCase()) === 0;
					}) ?? this.data?.slice()
			)
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
		this.writeValue(null);
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
			return object && object[this.bindLabel] ? object[this.bindLabel] : '';
		}
	}

	/**
	 * Tracks autocomplete values by bindVale
	 *
	 * @author Pavan Kumar Jadda
	 * @since 12.1.2
	 */
	trackByFn(index: number, item: any) {
		return item[this.bindLabel]?.bindValue;
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
	/**
	 * @description
	 * Writes a new value to the element.
	 *
	 * This method is called by the forms API to write to the view when programmatic
	 * changes from model to view are requested.
	 *
	 *
	 * @param obj The new value for the element
	 */
	writeValue(obj: any): void {
		this.value = obj;
		this._onChange(obj);
	}

	/**
	 * @description
	 * Registers a callback function that is called when the control's value
	 * changes in the UI.
	 *
	 * This method is called by the forms API on initialization to update the form
	 * model when values propagate from the view to the model.
	 *
	 * When implementing the `registerOnChange` method in your own value accessor,
	 * save the given function so your class calls it at the appropriate time.
	 *
	 *
	 * @param fn The callback function to register
	 */
	registerOnChange(fn: any): void {
		this._onChange = fn;
		this.cdRef.markForCheck();
	}

	/**
	 * @description
	 * Registers a callback function that is called by the forms API on initialization
	 * to update the form model on blur.
	 *
	 * When implementing `registerOnTouched` in your own value accessor, save the given
	 * function so your class calls it when the control should be considered
	 * blurred or "touched".
	 *
	 *
	 * @param fn The callback function to register
	 */
	registerOnTouched(fn: any): void {
		this._onTouched = fn;
		this.cdRef.markForCheck();
	}

	/**
	 * @description
	 * Function that is called by the forms API when the control status changes to
	 * or from 'DISABLED'. Depending on the status, it enables or disables the
	 * appropriate DOM element.
	 *
	 *
	 * @param isDisabled The disabled status to set on the element
	 */
	setDisabledState(isDisabled: boolean): void {
		this._disabled = isDisabled;
		this.cdRef.markForCheck();
	}

	private _onChange = (_: any) => {};

	private _onTouched = () => {};
}
