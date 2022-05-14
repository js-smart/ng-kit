import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteComponent } from '@ngxsmart/ngxsmart';

@Component({
	selector: 'ngxsmart-autocomplete-demo',
	standalone: true,
	imports: [AutocompleteComponent, ReactiveFormsModule],
	template: `
		<h1 style="display: flex; justify-content: center; align-items: center;margin-top: 50px">
			Generic Auto Complete (Works with Objects and Strings)
		</h1>
		<div style="display: flex; justify-content: center; align-items: center; ">
			<form [formGroup]="genericFormGroup">
				<autocomplete
					[data]="cities"
					[inputFormGroup]="genericFormGroup"
					[required]="true"
					[displayWith]="displayFn"
					bindLabel="location"
					bindValue="id"
					label="City"
					placeHolder="Select City">
				</autocomplete>
			</form>
		</div>
		<div style="display: flex; justify-content: center; align-items: center; margin-top: 20px">
			<p>Selected Option Is:</p>
			<h2>{{ genericFormGroup.get('autocomplete')?.value?.location ?? '' }}</h2>
		</div>
		<hr />

		<hr />

		<h2 style="display: flex; justify-content: center; align-items: center;margin-top: 50px">Auto Complete (Works with Strings)</h2>
		<div style="display: flex; justify-content: center; align-items: center; ">
			<form [formGroup]="stringInputFormGroup">
				<autocomplete [data]="names" [inputFormGroup]="stringInputFormGroup" [required]="true" label="City" placeHolder="Select City">
				</autocomplete>
			</form>
		</div>
		<div style="display: flex; justify-content: center; align-items: center; margin-top: 20px">
			<p>Selected Option Is:</p>
			<h2>{{ stringInputFormGroup.get('autocomplete')?.value ?? '' }}</h2>
		</div>
	`,
	styles: [],
})
export class AutocompleteDemoComponent implements OnInit {
	cities: City[] = [
		{ id: 1001, location: 'New York' },
		{ id: 1002, location: 'Boston' },
		{ id: 1001, location: 'Washington DC' },
	];
	names = ['John', 'Steve', 'Ryan', 'Mary'];

	genericFormGroup = this.fb.group({
		autocomplete: new FormControl<City | undefined>(undefined),
	});

	stringInputFormGroup = this.fb.group({
		autocomplete: [''],
	});

	constructor(private fb: FormBuilder) {}

	ngOnInit(): void {}

	displayFn(object: any): string {
		if (typeof object === 'string') return object;
		return object && object['location'] ? object['location'] : '';
	}
}

export interface City {
	id: number;
	location: string;
}
