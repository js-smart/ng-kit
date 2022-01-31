import {
	AfterContentChecked,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild
} from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { FormGroup } from "@angular/forms";
import { map, startWith } from "rxjs/operators";
import { MatAutocompleteTrigger } from "@angular/material/autocomplete";
import { MatOptionSelectionChange } from "@angular/material/core";

/**
 * Reusable Auto Complete component that extends MatAutoComplete to show Clear icon and Arrow buttons
 *
 * @author Pavan Kumar Jadda
 * @since 12.0.0
 */
@Component({
	selector: "autocomplete, lib-autocomplete",
	templateUrl: "./autocomplete.component.html",
	styleUrls: ["./autocomplete.component.scss"],
	changeDetection: ChangeDetectionStrategy.Default
})
export class AutocompleteComponent implements OnInit, AfterContentChecked {
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
	@Input() classes = "";

	/**
	 * Attribute of the Object whose value would be shown when searching for data. Defaults to `ID`
	 */
	@Input() bindLabel = "";

	/**
	 * Attribute of the Object whose value would be used for search
	 */
	@Input() bindValue = "id";

	/**
	 * Function that maps an option's control value to its display value in the trigger.
	 */
	@Input() displayWith: ((value: any) => string) | null;

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
	arrowIconSubject = new BehaviorSubject("arrow_drop_down");

	/**
	 * Filtered options when user
	 */
	filteredOptions: Observable<any[] | undefined> | undefined;

	constructor(private cdRef: ChangeDetectorRef) {}

	/**
	 * Define autocomplete search filter on search text changes
	 *
	 * @author Pavan Kumar Jadda
	 * @since 12.0.0
	 */
	ngOnInit() {
		this.filteredOptions = this.inputFormGroup?.get("autocomplete")?.valueChanges.pipe(
			startWith(""),
			map((value) => (typeof value === "string" ? value : value !== null ? value[this.bindLabel] : "")),
			map(
				(propertyName) =>
					this.data?.filter((option) => {
						return typeof option === "string"
							? option?.toLowerCase().indexOf(propertyName.toLowerCase()) === 0
							: option[this.bindLabel]?.toLowerCase().indexOf(propertyName.toLowerCase()) === 0;
					}) ?? this.data?.slice()
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

	/**
	 * Display function that is used to show the values
	 *
	 * @author Pavan Kumar Jadda
	 * @since 12.0.0
	 */
	displayFn(object: any): string {
		if (typeof object === 'string') return object;
		return object && object[this.bindLabel] ? object[this.bindLabel] : '';
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
		console.log("$event.source.value:", $event.source.value);
		this.onSelectionChange.emit($event.source.value);
	}
}
