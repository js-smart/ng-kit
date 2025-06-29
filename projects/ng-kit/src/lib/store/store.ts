import { computed, Injectable, signal } from '@angular/core';

/**
 * A core store class that can be used to store any object
 *
 * @author Pavan Kumar Jadda
 * @since 17.1.0
 */
@Injectable({
	providedIn: 'root',
})
export class Store<T extends object> {
	_data = signal<T | null>(null);

	// The data property is a computed property that returns the value of the _data signal
	data = computed(() => this._data());

	// Add initialization method
	initialize(initialData: T): void {
		this._data.set(initialData);
	}

	/**
	 * Update the data in the store with the new data
	 *
	 * @param newData The new data to be stored/updated
	 *
	 * @author Pavan Kumar Jadda
	 * @since 17.1.0
	 */
	update(newData: T): void {
		this._data.set(newData);
	}

	// Add clear method
	clear(): void {
		this._data.set(null);
	}

	// Add getter with null check
	getData(): T | null {
		return this._data();
	}
}
