import { Injectable, signal } from '@angular/core';

/**
 * Gallery-wide demo settings. Currently a global Material form-field appearance
 * (fill / outline) that the Autocomplete examples respect via a toggle.
 */
@Injectable({ providedIn: 'root' })
export class DemoSettings {
	readonly appearance = signal<'fill' | 'outline'>('outline');
}
