import { effect, Injectable, signal } from '@angular/core';

/** Gallery colour scheme: follow the OS, or force light / dark. */
export type ThemeMode = 'system' | 'light' | 'dark';

const THEME_STORAGE_KEY = 'ng-kit-demo-theme';

/**
 * Gallery-wide demo settings: the Material form-field appearance (fill / outline)
 * that the Autocomplete examples respect, and the colour-scheme (theme) that
 * drives the Material 3 `light-dark()` system colours via the `color-scheme`
 * CSS property on the document element.
 */
@Injectable({ providedIn: 'root' })
export class DemoSettings {
	readonly appearance = signal<'fill' | 'outline'>('fill');

	/** Active theme mode; persisted to localStorage and applied to <html>. */
	readonly theme = signal<ThemeMode>(readStoredTheme());

	constructor() {
		// Apply the chosen scheme to <html> so Material's light-dark() colours flip.
		effect(() => {
			const mode = this.theme();
			const root = document.documentElement;
			// 'system' clears the override so `color-scheme: light dark` follows the OS.
			root.style.colorScheme = mode === 'system' ? '' : mode;
			try {
				localStorage.setItem(THEME_STORAGE_KEY, mode);
			} catch {
				// Storage unavailable (private mode / SSR) — the scheme still applies.
			}
		});
	}

	/** Cycle system → light → dark → system, for the toolbar toggle. */
	cycleTheme(): void {
		this.theme.update((mode) => (mode === 'system' ? 'light' : mode === 'light' ? 'dark' : 'system'));
	}
}

function readStoredTheme(): ThemeMode {
	try {
		const stored = localStorage.getItem(THEME_STORAGE_KEY);
		if (stored === 'light' || stored === 'dark' || stored === 'system') {
			return stored;
		}
	} catch {
		// Ignore — fall back to following the OS.
	}
	return 'system';
}
