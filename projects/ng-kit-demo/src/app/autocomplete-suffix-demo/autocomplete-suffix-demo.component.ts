import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AutocompleteSuffixDirective } from '@js-smart/ng-kit';

/**
 * Demo for {@link AutocompleteSuffixDirective}: single directive on the input
 * that adds clear + dropdown toggle icons without an anchor or suffix component.
 */
@Component({
	selector: 'ng-kit-autocomplete-suffix-demo',
	imports: [ReactiveFormsModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule, AutocompleteSuffixDirective],
	templateUrl: './autocomplete-suffix-demo.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteSuffixDemoComponent {
	readonly cities: City[] = [
		{ id: 1001, location: 'New York', state: 'NY' },
		{ id: 1002, location: 'Boston', state: 'MA' },
		{ id: 1003, location: 'Washington DC', state: 'DC' },
		{ id: 1004, location: 'Los Angeles', state: 'CA' },
		{ id: 1005, location: 'Chicago', state: 'IL' },
		{ id: 1006, location: 'Houston', state: 'TX' },
		{ id: 1007, location: 'Miami', state: 'FL' },
		{ id: 1008, location: 'Seattle', state: 'WA' },
		{ id: 1009, location: 'San Francisco', state: 'CA' },
		{ id: 1010, location: 'San Diego', state: 'CA' },
		{ id: 1011, location: 'San Jose', state: 'CA' },
		{ id: 1012, location: 'San Antonio', state: 'TX' },
	];

	readonly stringOptions = ['New York', 'Boston', 'Washington DC'];

	readonly objectForm = this.fb.group({
		city: new FormControl<City | null>(null),
	});

	readonly stringForm = this.fb.group({
		city: new FormControl<string | null>(null),
	});

	constructor(private fb: FormBuilder) {}

	displayWith = (item: City | null) => item?.location ?? '';
}

export interface City {
	id: number;
	location: string;
	state: string;
}
