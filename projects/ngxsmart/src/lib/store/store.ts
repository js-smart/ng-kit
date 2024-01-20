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
	private _data = signal<T | undefined>(undefined);

	// The data property is a computed property that returns the value of the _data signal
	data = computed(() => this._data());

	/**
	 * Update the data in the store with the new data
	 *
	 * @param newData The new data to be stored/updated
	 *
	 * @author Pavan Kumar Jadda
	 * @since 17.1.0
	 */
	update(newData: T) {
		this._data.set(newData);
	}
}
