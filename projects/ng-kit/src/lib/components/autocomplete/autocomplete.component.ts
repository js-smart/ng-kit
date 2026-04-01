import { NgClass } from '@angular/common';
import { Component, computed, ElementRef, forwardRef, input, output, signal, viewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldAppearance, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * Reusable Auto Complete component that extends MatAutoComplete to show Clear icon and Arrow buttons
 *
 * @author Pavan Kumar Jadda
 * @since 12.0.0
 */
@Component({
	selector: 'autocomplete, lib-autocomplete',
	imports: [
		NgClass,
		ReactiveFormsModule,
		MatAutocompleteModule,
		MatInputModule,
		MatFormFieldModule,
		MatIconModule,
		MatButtonModule,
		MatProgressSpinnerModule,
	],
	templateUrl: './autocomplete.component.html',
	styleUrls: ['./autocomplete.component.css'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => AutocompleteComponent),
			multi: true,
		},
	],
})
export class AutocompleteComponent<T = string> implements ControlValueAccessor {
	/** Gets reference to the MatAutocompleteTrigger to programmatically open/close the panel */
	autocompleteTrigger = viewChild.required(MatAutocompleteTrigger);

	/** Gets reference to the input element for re-focusing after clear */
	inputElement = viewChild.required<ElementRef<HTMLInputElement>>('inputEl');

	/** Label of the autocomplete form field */
	label = input('Select Value');

	/** Placeholder text displayed inside the input when empty */
	placeholder = input('');

	/** Appearance of the form field. Defaults to `outline` */
	appearance = input<MatFormFieldAppearance>('outline');

	/** List of CSS classes to apply to the form field */
	classes = input('');

	/** List of options to display in the dropdown */
	options = input<T[]>([]);

	/**
	 * Function that maps an option to its display string.
	 * Used for rendering options in the dropdown and showing the selected value in the input.
	 * Defaults to `String(value)` which works for primitive string options.
	 */
	displayWith = input<(value: T) => string>((value: T) => String(value));

	/** Whether the autocomplete is in a loading state. Shows a spinner instead of options */
	loading = input(false);

	/** Text displayed when the autocomplete is in a loading state. Defaults to 'Loading...' */
	loadingText = input('Loading...');

	/** Text displayed when no options match the filter input. Defaults to 'No values found' */
	noOptionsText = input('No values found');

	/** Emits the selected value when an option is picked from the dropdown */
	selectionChange = output<T>();

	/** Internal form control for the autocomplete input */
	control = new FormControl('');

	/** Signal that tracks whether the autocomplete panel is currently open */
	isExpanded = signal(false);

	/** Signal that tracks the current filter text typed by the user */
	filterText = signal('');

	/**
	 * Computed signal that filters options based on the current filter text.
	 * Uses the `displayWith` function to extract searchable text from each option.
	 * Returns all options when filter text is empty.
	 */
	filteredOptions = computed(() => {
		const filterValue = this.filterText().toLowerCase();
		const displayFn = this.displayWith();
		return this.options().filter((option) => displayFn(option).toLowerCase().includes(filterValue));
	});

	/**
	 * Display function passed to mat-autocomplete's [displayWith] to render the
	 * selected value in the input field. Returns empty string for null/undefined values.
	 */
	displayFn = (value: T): string => {
		if (value == null) {
			return '';
		}
		return this.displayWith()(value);
	};

	/**
	 * Writes a new value to the internal control. Called by the parent form
	 * when the form control value is set programmatically.
	 */
	writeValue(value: T | null): void {
		this.control.setValue((value as any) ?? '', { emitEvent: false });
	}

	/**
	 * Registers a callback function that is called when the control's value
	 * changes in the UI (option selected or input cleared).
	 */
	registerOnChange(fn: (value: T | null) => void): void {
		this.onChange = fn;
	}

	/**
	 * Registers a callback function that is called when the control is
	 * first interacted with (blur or selection).
	 */
	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	/**
	 * Sets the disabled state of the internal control. Called by the parent form
	 * when `control.disable()` or `control.enable()` is invoked.
	 */
	setDisabledState(isDisabled: boolean): void {
		if (isDisabled) {
			this.control.disable();
		} else {
			this.control.enable();
		}
	}

	/** Updates the filter text signal as the user types in the input */
	onInput(event: Event): void {
		const value = (event.target as HTMLInputElement).value;
		this.filterText.set(value);
	}

	/**
	 * Clears the input value, resets the filter, notifies the parent form,
	 * and re-focuses the input element.
	 */
	clearInput(event: Event): void {
		this.control.setValue('');
		this.filterText.set('');
		this.onChange(null);
		this.onTouched();
		event.stopPropagation();
		this.inputElement().nativeElement.focus();
	}

	/** Opens the autocomplete panel programmatically */
	openPanel(): void {
		this.autocompleteTrigger().openPanel();
	}

	/**
	 * Handles option selection from the dropdown. Resets the filter text,
	 * notifies the parent form of the new value, and emits the selectionChange output.
	 */
	onOptionSelected(value: T): void {
		this.filterText.set('');
		this.onChange(value);
		this.onTouched();
		this.selectionChange.emit(value);
	}

	/** Callback function registered by the parent form to propagate value changes */
	private onChange: (value: T | null) => void = (_: T | null) => {
		/* noop */
	};

	/** Callback function registered by the parent form to propagate touched state */
	private onTouched: () => void = () => {
		/* noop */
	};
}
