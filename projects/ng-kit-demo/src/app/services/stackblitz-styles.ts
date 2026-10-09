/**
 * Styles for StackBlitz demos.
 * Core tokens/utilities stay aligned with ng-kit-demo:
 * - projects/ng-kit-demo/src/styles.scss
 * - projects/ng-kit-demo/src/assets/app-variables.scss
 * - projects/ng-kit-demo/src/assets/app-buttons.scss
 * - projects/ng-kit-demo/src/assets/app-mat-snack-bar.scss
 *
 * Plus a StackBlitz-only `.demo-shell` layout that centers demos.
 */

export const STACKBLITZ_STYLES_SCSS = `@import 'bootstrap/dist/css/bootstrap.css';
@import '@angular/material/prebuilt-themes/indigo-pink.css';
@import 'assets/app-variables';
@import 'assets/app-buttons';
@import 'assets/app-mat-snack-bar';

html,
body {
	height: 100%;
}

body {
	margin: 0;
	font-family: Roboto, 'Helvetica Neue', sans-serif;
	background-color: var(--background-color);
	color: #1f2937;
}

.demo-shell {
	display: flex;
	flex-direction: column;
	align-items: center;
	box-sizing: border-box;
	min-height: 100vh;
	padding: 2.5rem 1.5rem;
}

.demo-shell > *:not(router-outlet) {
	width: 100%;
	max-width: 48rem;
	text-align: center;
}

.demo-shell h1,
.demo-shell h2 {
	margin: 1.75rem 0 0.85rem;
	font-weight: 500;
	letter-spacing: 0.01em;
}

.demo-shell h1:first-child,
.demo-shell h2:first-child {
	margin-top: 0;
}

.demo-shell p {
	margin: 1rem 0 0;
}

.demo-shell button,
.demo-shell a,
.demo-shell .mat-mdc-button-base {
	margin: 0.25rem;
}

.demo-shell .row {
	text-align: left;
}

.demo-shell hr {
	margin: 2rem 0;
	opacity: 0.15;
}

.center_div {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	flex-wrap: wrap;
}

// Places item in the middle of the box
.app-flex-center {
	display: flex;
	align-items: center;
}

// Places item in the center of the box
.app-flex-justify-center {
	display: flex;
	justify-content: center;
}

// Places item in the left of the box
.app-flex-justify-left {
	display: flex;
	justify-content: flex-start;
}

// Places item in the right of the box
.app-flex-justify-right {
	display: flex;
	justify-content: flex-end;
}

// Places items at the start of the item
.app-flex-align-items-start {
	display: flex;
	align-items: flex-start;
}

// Places items at the start of the item
.app-flex-align-items-center {
	display: flex;
	align-items: center;
}

// Add padding to strong HTML tag
strong {
	padding-left: 5px;
	padding-right: 5px;
}

//Primary color text
.primary-color-text {
	color: var(--primary-color);
}
`;

export const STACKBLITZ_APP_VARIABLES_SCSS = `:root {
	--primary-color: #153d77;
	--secondary-color: #6c757d;
	--white-color: #fff;
	--success-color: #198754;
	--delete-color: #dc3545;
	--background-color: #f2f2f2;
}
`;

export const STACKBLITZ_APP_BUTTONS_SCSS = `@import 'app-variables.scss';

.primary-button,
.primary-button:hover,
.primary-button:active,
.primary-button:visited {
	color: white !important;
	background-color: var(--primary-color) !important;
}

.secondary-button,
.secondary-button:hover,
.secondary-button:active,
.secondary-button:visited {
	color: white !important;
	background-color: var(--secondary-color) !important;
}

/* Adds CSS for Success Button class */
.success-button,
.success-button:hover,
.success-button:active,
.success-button:visited {
	color: white !important;
	background-color: var(--success-color) !important;
}

/* Adds CSS for Delete Button class */
.delete-button,
.delete-button:hover,
.delete-button:active,
.success-button:visited {
	color: white !important;
	background-color: var(--delete-color) !important;
}
`;

export const STACKBLITZ_APP_MAT_SNACK_BAR_SCSS = `/* Success Snack Bar Styles */
.success-snackbar {
	--mdc-snackbar-container-color: var(--success-color) !important;
	--mat-mdc-snack-bar-button-color: var(--white-color) !important;
}

.success-snackbar .mdc-snackbar__surface {
	background-color: var(--success-color) !important;
	color: white !important;
}

.success-snackbar .mat-mdc-snack-bar-action {
	color: var(--white-color) !important;
}

/* Error Snack Bar Styles */
.error-snackbar {
	--mdc-snackbar-container-color: var(--delete-color) !important;
	--mat-mdc-snack-bar-button-color: var(--white-color) !important;
}

.error-snackbar .mdc-snackbar__surface {
	background-color: var(--delete-color) !important;
	color: white !important;
}

.error-snackbar .mat-mdc-snack-bar-action {
	color: var(--white-color) !important;
}
`;
