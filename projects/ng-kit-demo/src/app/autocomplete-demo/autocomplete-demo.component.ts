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
	];

	genericFormGroup = this.fb.group({
		autocomplete: new FormControl<City | undefined>(undefined),
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

	displayWith(object: string | Record<string, unknown>): string {
		if (typeof object === 'string') {
			return object;
		}
		return object && object['location'] ? (object['location'] as string) : '';
	}

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
