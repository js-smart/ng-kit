import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, ElementRef, forwardRef, inject, input, OnChanges, OnInit, output, signal, SimpleChanges, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AutocompleteOption = Record<string, any>;

/**
 * Reusable Auto Complete component that extends MatAutoComplete to show Clear icon and Arrow buttons
 *
 * @author Pavan Kumar Jadda
 * @since 12.0.0
 */
@Component({
	selector: 'autocomplete, lib-autocomplete',
	imports: [AsyncPipe, ReactiveFormsModule, MatFormFieldModule, MatAutocompleteModule, MatInputModule, MatButtonModule, MatIconModule],
	templateUrl: './autocomplete.component.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => AutocompleteComponent),
			multi: true,
		},
	],
})
export class AutocompleteComponent implements OnInit, OnChanges, ControlValueAccessor {
	/**
	 * Gets reference inputAutoComplete HTML attribute
	 */
	@ViewChild('inputAutoComplete') inputAutoComplete!: ElementRef;

	private destroyRef = inject(DestroyRef);

	/**
	 * Internal form control for the autocomplete
	 */
	control = new FormControl<string | AutocompleteOption | null>('');

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
	appearance = input<'fill' | 'outline'>('fill');

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
	displayWith = input<((value: string | AutocompleteOption) => string) | null>(null);

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
	data = input<(string | AutocompleteOption)[]>();

	/**
	 * Emit selected value on selection changes
	 */
	onSelectionChange = output<string | AutocompleteOption>();

	/**
	 * Signal that tracks the current arrow icon state
	 */
	arrowIcon = signal('arrow_drop_down');

	/**
	 * Filtered options when user types
	 */
	filteredOptions: Observable<(string | AutocompleteOption)[] | undefined> | undefined;

	/**
	 * Writes a new value to the control
	 */
	writeValue(value: string | AutocompleteOption): void {
		this.control.setValue(value, { emitEvent: false });
	}

	/**
	 * Registers a callback function that is called when the control's value changes
	 */
	registerOnChange(fn: (value: string | AutocompleteOption | null) => void): void {
		this.onChange = fn;
		this.control.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => fn(value));
	}

	/**
	 * Registers a callback function that is called when the control is touched
	 */
	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	/**
	 * Sets the disabled state of the control
	 */
	setDisabledState(isDisabled: boolean): void {
		if (isDisabled) {
			this.control.disable();
		} else {
			this.control.enable();
		}
	}

	/**
	 * Initializes the filtered options observable pipeline
	 */
	ngOnInit(): void {
		this.filteredOptions = this.control.valueChanges.pipe(
			startWith(''),
			map((value) => (typeof value === 'string' ? value : '')),
			map((propertyName) => {
				if (!propertyName) {
					return this.data()?.slice();
				}
				// If the value exactly matches an existing option, show all options
				const isSelectedValue = this.data()?.some((option) => typeof option === 'string' && option === propertyName);
				if (isSelectedValue) {
					return this.data()?.slice();
				}
				return (
					this.data()?.filter((option) => {
						return typeof option === 'string'
							? option?.toLowerCase().includes(propertyName.toLowerCase())
							: (option[this.bindLabel()] as string)?.toLowerCase().includes(propertyName.toLowerCase());
					}) ?? this.data()?.slice()
				);
			}),
		);
	}

	/**
	 * Binds the displayFn to the component context on input changes
	 */
	ngOnChanges(_changes: SimpleChanges): void {
		this.displayFn = this.displayFn.bind(this);
	}

	/**
	 * Clears the input value, resets the control, and re-focuses the input
	 */
	clearInput(evt: Event): void {
		evt.stopPropagation();
		this.control.reset();
		this.onChange(null);
		this.inputAutoComplete?.nativeElement.focus();
	}

	/**
	 * Toggles the autocomplete panel open or closed
	 */
	openOrClosePanel(evt: Event, trigger: MatAutocompleteTrigger): void {
		evt.stopPropagation();
		if (trigger.panelOpen) {
			trigger.closePanel();
		} else {
			trigger.openPanel();
		}
	}

	/**
	 * Returns the display value for the given option. Uses custom displayWith function if provided,
	 * otherwise falls back to the bindLabel property or the string value itself.
	 */
	displayFn(object: string | AutocompleteOption): string {
		const customDisplayWith = this.displayWith();
		if (customDisplayWith) {
			return customDisplayWith(object);
		}
		if (typeof object === 'string') {
			return object;
		}
		return object?.[this.bindLabel()] ? (object[this.bindLabel()] as string) : '';
	}

	/**
	 * Emits the selected value and notifies the parent form of the selection change
	 */
	emitSelectedValue($event: MatOptionSelectionChange): void {
		this.onSelectionChange.emit($event.source.value);
		this.onChange($event.source.value);
		this.onTouched();
	}

	/**
	 * Updates the arrow icon to point up when the panel opens
	 */
	onPanelOpened(): void {
		this.arrowIcon.set('arrow_drop_up');
	}

	/**
	 * Updates the arrow icon to point down when the panel closes
	 */
	onPanelClosed(): void {
		this.arrowIcon.set('arrow_drop_down');
	}

	private onChange: (value: string | AutocompleteOption | null) => void = () => {};
	private onTouched: () => void = () => {};
}
