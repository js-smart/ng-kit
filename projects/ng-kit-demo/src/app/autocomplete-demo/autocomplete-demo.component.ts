import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteComponent } from '@js-smart/ng-kit';

@Component({
	selector: 'ng-kit-autocomplete-demo',
	imports: [AutocompleteComponent, ReactiveFormsModule],
	templateUrl: './autocomplete-demo.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteDemoComponent {
	cities: City[] = [
		{ id: 1001, location: 'New York', state: 'NY' },
		{ id: 1002, location: 'Boston', state: 'MA' },
		{ id: 1003, location: 'Washington DC', state: 'DC' },
		{ id: 1004, location: 'Los Angeles', state: 'CA' },
		{ id: 1005, location: 'Chicago', state: 'IL' },
		{ id: 1006, location: 'Houston', state: 'TX' },
		{ id: 1007, location: 'Miami', state: 'FL' },
		{ id: 1008, location: 'Seattle', state: 'WA' },
		{ id: 1009, location: 'San Francisco', state: 'CA' },
		{ id: 1010, location: 'Austin', state: 'TX' },
		{ id: 1011, location: 'San Diego', state: 'CA' },
		{ id: 1012, location: 'San Antonio', state: 'TX' },
		{ id: 1013, location: 'San Jose', state: 'CA' },
		{ id: 1014, location: 'San Luis Obispo', state: 'CA' },
		{ id: 1015, location: 'San Rafael', state: 'CA' },
	];

	genericFormGroup = this.fb.group({
		autocomplete: new FormControl<City | undefined>(undefined),
	});

	stringFormGroup = this.fb.group({
		autocomplete: new FormControl<string | undefined>(undefined),
	});

	loadingFormGroup = this.fb.group({
		autocomplete: new FormControl<City | undefined>(undefined),
	});

	disabledFormGroup = this.fb.group({
		autocomplete: new FormControl<City | undefined>({ value: this.cities[0], disabled: true }),
	});

	isLoading = signal(true);
	loadingCities = signal<City[]>([]);

	constructor(private fb: FormBuilder) {
		// Simulate async data loading
		setTimeout(() => {
			this.loadingCities.set(this.cities);
			this.isLoading.set(false);
		}, 3000);
	}

	displayWith = (item: City) => item?.location ?? '';

	toggleDisabled(): void {
		const control = this.disabledFormGroup.get('autocomplete');
		if (control?.disabled) {
			control.enable();
		} else {
			control?.disable();
		}
	}
}

export interface City {
	id: number;
	location: string;
	state: string;
}
