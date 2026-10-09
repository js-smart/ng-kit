import { CSP_NONCE, DOCUMENT, inject } from '@angular/core';

const STYLE_ID = 'ng-kit-button-styles';

// Only the Bootstrap utilities the directives emit belong here; Angular Material keeps button shape and states.
// `.btn` is added by every button directive. The `ng-kit` layer lets unlayered CSS (Material, an app's own
// Bootstrap, app styles) win, so `.text-primary` needs `!important` to colour Material buttons, as Bootstrap's did.
const BUTTON_STYLES = `
@layer ng-kit {
	.btn.text-primary { color: var(--bs-primary, #0d6efd) !important; }
	.btn .pe-2 { box-sizing: border-box; padding-inline-end: .5rem; }
	:is(.btn, [editSvgIconButton]).gap-1 { gap: .25rem; }
	.btn .spinner-border {
		display: inline-block;
		inline-size: 1rem;
		block-size: 1rem;
		margin-inline-end: .5rem;
		border: .2em solid currentColor;
		border-inline-end-color: transparent;
		border-radius: 50%;
		animation: ng-kit-spin .75s linear infinite;
	}
	@keyframes ng-kit-spin { to { transform: rotate(360deg); } }
	@media (prefers-reduced-motion: reduce) {
		.btn .spinner-border { animation-duration: 1.5s; }
	}
}
`;

/** Installs the library's Bootstrap utility replacements once per document. */
export function ensureButtonStyles(): void {
	const document = inject(DOCUMENT);
	if (document.getElementById(STYLE_ID)) {
		return;
	}

	const style = document.createElement('style');
	style.id = STYLE_ID;
	const nonce = inject(CSP_NONCE, { optional: true });
	if (nonce) {
		style.nonce = nonce;
	}
	style.textContent = BUTTON_STYLES;
	document.head?.appendChild(style);
}
