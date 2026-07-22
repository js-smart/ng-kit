import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeBlock } from '../../shared/code-block.component';

const OVERVIEW_CODE = `<!-- Directive (preferred) -->
<button ariaLabel="Submit" (click)="onSubmit()" primaryButton>Submit</button>

<!-- Component -->
<primary-button ariaLabel="Submit" (click)="onSubmit()">Submit</primary-button>`;

/**
 * Buttons introduction: the landing page for the Buttons group. Explains the
 * shared BaseButtonDirective, the directive-vs-component approaches, and the
 * common API every ng-kit button inherits. Individual buttons each have their
 * own page under `buttons/`.
 */
@Component({
	selector: 'ng-kit-buttons-intro-page',
	imports: [CodeBlock],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<article class="doc-article">
			<header class="doc-header">
				<h1 class="doc-title">Buttons</h1>
				<p class="doc-lead">
					Custom button components built on top of Angular Material buttons. ng-kit adds ready-made button types — primary, success, edit,
					delete, export and more — each with additional styling, icons and loading state on top of the shared
					<code>BaseButtonDirective</code>. Pick a button from the navigation to see its live demo and source.
				</p>
			</header>

			<p>
				A <code>BaseButtonDirective</code> provides common functionality and styling for all button types; every ng-kit button extends
				this base. Buttons can be consumed in two ways:
			</p>
			<ul>
				<li><strong>Directives (preferred)</strong> — apply button styling and behaviour to any existing HTML element for cleaner markup and more flexibility.</li>
				<li><strong>Components (legacy)</strong> — dedicated Angular components that wrap Angular Material buttons. Still supported, but the directive approach is preferred for new implementations.</li>
			</ul>
			<p>The two styles are interchangeable:</p>
			<code-block [code]="overviewCode" language="html" />

			<h2 class="doc-api-heading">API</h2>
			<p>
				All buttons share the inputs and outputs of the base button. Directive selectors are attribute-based
				(e.g. <code>primaryButton</code>); component selectors are elements (e.g. <code>&lt;primary-button&gt;</code>).
			</p>

			<h3>Common inputs</h3>
			<table class="api-table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Type</th>
						<th>Default</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><code>label</code></td>
						<td><code>string</code></td>
						<td><code>'Save'</code></td>
						<td>Text shown on the button (per-button defaults vary)</td>
					</tr>
					<tr>
						<td><code>icon</code></td>
						<td><code>string</code></td>
						<td>per button</td>
						<td>Material icon name rendered before the label</td>
					</tr>
					<tr>
						<td><code>showIcon</code></td>
						<td><code>boolean</code></td>
						<td><code>true</code></td>
						<td>Whether the leading icon is rendered</td>
					</tr>
					<tr>
						<td><code>disabled</code></td>
						<td><code>boolean</code></td>
						<td><code>false</code></td>
						<td>Disables the button</td>
					</tr>
					<tr>
						<td><code>loading</code></td>
						<td><code>boolean</code></td>
						<td><code>false</code></td>
						<td>Shows a spinner and the loading label; disables the button</td>
					</tr>
					<tr>
						<td><code>loadingLabel</code></td>
						<td><code>string</code></td>
						<td><code>'Saving...'</code></td>
						<td>Text shown while <code>loading</code> is true</td>
					</tr>
					<tr>
						<td><code>type</code></td>
						<td><code>'button' | 'submit'</code></td>
						<td><code>'button'</code></td>
						<td>Native button type</td>
					</tr>
				</tbody>
			</table>
			<p class="api-note">
				The base <em>directive</em> exposes <code>icon</code>, <code>label</code>, <code>loading</code> and
				<code>loadingLabel</code>. Component buttons additionally provide <code>style</code>, <code>classes</code> and
				<code>dataCy</code> inputs.
			</p>

			<h3>Outputs</h3>
			<table class="api-table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Payload</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><code>onClick</code></td>
						<td><code>MouseEvent</code></td>
						<td>Button was clicked</td>
					</tr>
					<tr>
						<td><code>onFocus</code> / <code>onBlur</code></td>
						<td><code>FocusEvent</code></td>
						<td>Button gained / lost focus</td>
					</tr>
					<tr>
						<td><code>onKeyDown</code> / <code>onKeyUp</code></td>
						<td><code>KeyboardEvent</code></td>
						<td>Key pressed / released while focused</td>
					</tr>
				</tbody>
			</table>
		</article>
	`,
	styles: `
		:host {
			display: block;
		}

		.doc-header {
			margin-block-end: 1.5rem;
		}

		.doc-title {
			margin-block-end: 0.5rem;
		}

		.doc-lead {
			color: var(--gallery-text-muted);
		}

		.doc-api-heading {
			margin-block-start: 3.5rem;
			padding-block-start: 1.5rem;
			border-block-start: 2px solid var(--gallery-border);
		}

		h3 {
			margin-block: 1.75rem 0.5rem;
		}

		.api-table {
			width: 100%;
			border-collapse: collapse;
			font-size: 0.875rem;
		}

		.api-table th,
		.api-table td {
			text-align: left;
			padding: 0.5rem 0.75rem;
			border-block-end: 1px solid var(--gallery-border);
			vertical-align: top;
		}

		.api-note {
			margin-block-start: 0.75rem;
			color: var(--gallery-text-muted);
		}

		code {
			font-family: 'Roboto Mono', ui-monospace, monospace;
			font-size: 0.85em;
		}
	`,
})
export class ButtonsIntroPage {
	protected readonly overviewCode = OVERVIEW_CODE;
}
