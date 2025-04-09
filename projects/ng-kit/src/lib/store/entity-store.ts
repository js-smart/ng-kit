import { computed, Injectable, signal } from '@angular/core';
import { IdType } from '../types/id-type';

/**
 * A core entity store class that stores a list of objects. This has list of methods to perform CRUD operations on the list of objects.
 *
 * @author Pavan Kumar Jadda
 * @since 17.1.0
 */
@Injectable({
	providedIn: 'root',
})
export class EntityStore<T extends IdType> {
	_data = signal<T[]>([]);

	// The data property is a computed property that returns the value of the _data signal
	data = computed(() => this._data());

	/**
	 * Find an item in the store by id
	 *
	 * @param id The id of the item to be found
	 *
	 * @returns The item if found, undefined otherwise
	 *
	 * @author Pavan Kumar Jadda
	 * @since 17.1.0
	 */
	findById(id: number) {
		return this._data().find((item) => item.id === id);
	}

	/**
	 * Set the list of items in the store with the new data
	 *
	 * @param data The new list of items to be stored
	 *
	 * @author Pavan Kumar Jadda
	 * @since 17.1.0
	 */
	setData(data: T[]) {
		this._data.set(data);
	}

	/**
	 * Update an item in the store. If the item does not exist in new list, add it. Otherwise, update it.
	 *
	 * @param data The item to added or updated
	 *
	 * @author Pavan Kumar Jadda
	 * @since 17.1.0
	 */
	upsert(data: T) {
		this._data.update((currentData) => {
			const dataMap = new Map(currentData.map((item) => [item.id, item]));
			dataMap.set(data.id, data);
			return Array.from(dataMap.values());
		});
	}

	/**
	 * Update or insert the given list of items in the store
	 *
	 * @param newData The list of items to be updated or inserted
	 *
	 * @author Pavan Kumar Jadda
	 * @since 17.1.0
	 */
	upsertMulti(newData: T[]) {
		this._data.update((currentData) => {
			const dataMap = new Map(currentData.map((item) => [item.id, item]));
			newData.forEach((newItem: T) => dataMap.set(newItem.id, newItem));
			return Array.from(dataMap.values());
		});
	}

	/**
	 * Remove an item from the store
	 *
	 * @param id The id of the item to be removed
	 *
	 * @author Pavan Kumar Jadda
	 * @since 17.1.0
	 */
	remove(id: number) {
		this._data.update((currentData) => currentData.filter((item) => item.id !== id));
	}
}
