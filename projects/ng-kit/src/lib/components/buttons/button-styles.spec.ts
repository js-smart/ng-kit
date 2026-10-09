/// <reference types="vitest/globals" />
import { CSP_NONCE, DOCUMENT, Injector, runInInjectionContext } from '@angular/core';
import { ensureButtonStyles } from './button-styles';

describe('ensureButtonStyles', () => {
	it('installs the directive-scoped stylesheet once and applies the configured CSP nonce', () => {
		const document = window.document;
		document.getElementById('ng-kit-button-styles')?.remove();
		const injector = Injector.create({
			providers: [
				{ provide: DOCUMENT, useValue: document },
				{ provide: CSP_NONCE, useValue: 'test-nonce' },
			],
		});

		runInInjectionContext(injector, ensureButtonStyles);
		runInInjectionContext(injector, ensureButtonStyles);

		const styles = document.querySelectorAll('#ng-kit-button-styles');
		expect(styles).toHaveLength(1);
		expect((styles[0] as HTMLStyleElement).nonce).toBe('test-nonce');
		expect(styles[0].textContent).toContain('.btn .spinner-border');
		styles[0].remove();
	});
});
