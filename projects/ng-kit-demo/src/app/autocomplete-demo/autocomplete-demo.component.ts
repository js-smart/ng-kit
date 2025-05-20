import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteComponent } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-autocomplete-demo',
	imports: [AutocompleteComponent, ReactiveFormsModule],
	templateUrl: './autocomplete-demo.component.html',
	styles: [],
})
export class AutocompleteDemoComponent {
	cities: City[] = [
		{ id: 1001, location: 'New York', state: 'NY' },
		{ id: 1002, location: 'Boston', state: 'MA' },
		{ id: 1001, location: 'Washington DC', state: 'DC' },
	];
	names = ['John', 'Steve', 'Ryan', 'Mary'];

	genericFormGroup = this.fb.group({
		autocomplete: new FormControl<City | undefined>(undefined),
	});

	stringInputFormGroup = this.fb.group({
		autocomplete: [''],
	});

	constructor(private fb: FormBuilder) {}

	displayWith(object: any): string {
		if (typeof object === 'string') {
			return object;
		}
		return object && object['location'] ? object['location'] : '';
	}
}

export interface City {
	id: number;
	location: string;
	state: string;
}
