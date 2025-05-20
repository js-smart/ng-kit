import { AsyncPipe } from '@angular/common';
import {
	AfterContentChecked,
	ChangeDetectorRef,
	Component,
	ElementRef,
	forwardRef,
	Input,
	input,
	OnChanges,
	OnInit,
	Optional,
	output,
	SimpleChanges,
	ViewChild,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { TypeOfPipe } from '../../pipes/type-of.pipe';

/**
 * Reusable Auto Complete component that extends MatAutoComplete to show Clear icon and Arrow buttons
 *
 * @author Pavan Kumar Jadda
 * @since 12.0.0
 */
@Component({
	selector: 'autocomplete, lib-autocomplete',
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
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => AutocompleteComponent),
			multi: true,
		},
	],
})
export class AutocompleteComponent implements OnInit, OnChanges, AfterContentChecked, ControlValueAccessor {
	/**
	 * Gets reference inputAutoComplete HTML attribute
	 */
	@ViewChild('inputAutoComplete') inputAutoComplete!: ElementRef;

	/**
	 * Internal form control for the autocomplete
	 */
	control = new FormControl('');

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
	 * Specifies if the autocomplete is disabled. Default is not required.
	 */
	disabled = input(false);

	/**
	 * List of Objects that need to be bind and searched for
	 */
	data = input<string[] | any[]>();

	/**
	 * Emit selected value on selection changes
	 */
	onSelectionChange = output<any>();

	/**
	 * BehaviorSubject that shows the current active arrow icon
	 */
	arrowIconSubject = new BehaviorSubject('arrow_drop_down');

	/**
	 * Filtered options when user types
	 */
	filteredOptions: Observable<any[] | undefined> | undefined;
	private value: any;

	constructor(private cdRef: ChangeDetectorRef) {}

	writeValue(value: any): void {
		this.value = value;
		this.control.setValue(value, { emitEvent: false });
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
		// Forward value changes from internal control to parent form
		this.control.valueChanges.subscribe((value) => fn(value));
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		isDisabled ? this.control.disable() : this.control.enable();
	}

	ngAfterContentChecked(): void {
		this.cdRef.detectChanges();
	}

	ngOnInit() {
		this.filteredOptions = this.control.valueChanges.pipe(
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

	clearInput(evt: any): void {
		evt.stopPropagation();
		this.control.reset();
		this.onChange(null);
		this.inputAutoComplete?.nativeElement.focus();
	}

	openOrClosePanel(evt: any, trigger: MatAutocompleteTrigger): void {
		evt.stopPropagation();
		if (trigger.panelOpen) {
			trigger.closePanel();
		} else {
			trigger.openPanel();
		}
	}

	displayFn(object: any): string {
		if (this.displayWith !== undefined && this.displayWith !== null && typeof this.displayWith === 'function') {
			this.displayFn = this.displayWith.bind(this);
			return this.displayWith(object);
		} else {
			if (typeof object === 'string') {
				return object;
			}
			return object && object[this.bindLabel()] ? object[this.bindLabel()] : '';
		}
	}

	emitSelectedValue($event: MatOptionSelectionChange) {
		this.onSelectionChange.emit($event.source.value);
		this.onChange($event.source.value);
		this.onTouched();
	}

	// ControlValueAccessor implementation
	private onChange: (value: any) => void = () => {};

	private onTouched: () => void = () => {};
}
