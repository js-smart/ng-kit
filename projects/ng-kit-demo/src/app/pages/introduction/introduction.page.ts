import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Getting-started introduction page. Prose migrated from the docs markdown:
 * what @js-smart/ng-kit is, its key features, and the catalog of available
 * components, directives, icons, and utilities.
 */
@Component({
	selector: 'ng-kit-introduction-page',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<h1 class="page-title">Introduction</h1>
		<p class="page-lead">
			<strong>&#64;js-smart/ng-kit</strong> is a comprehensive collection of reusable Angular components, directives, and utilities built with
			Angular Material and Bootstrap 5.x.
		</p>

		<section class="page-section">
			<h2>Overview</h2>
			<p>
				The library provides a rich set of UI components, powerful directives for common interactions, and utility functions for state
				management and other common tasks. Designed with modern Angular best practices, <code>&#64;js-smart/ng-kit</code> offers a flexible,
				type-safe, and well-documented solution for building Angular applications.
			</p>
		</section>

		<section class="page-section">
			<h2>Key features</h2>
				<ul class="feature-list">
					<li><strong>Low dependencies</strong> — only one third-party dependency (Bootstrap). Fewer dependencies reduce security risk, simplify updates, and prevent version conflicts.</li>
					<li><strong>Built for modern Angular</strong> — designed around Angular Signals and standalone components. Not a legacy port — built for the current and future state of Angular.</li>
					<li><strong>Modular &amp; tree-shakable</strong> — import only what you use; adding one utility or component doesn't pull in the rest of the library.</li>
					<li><strong>Flexible component architecture</strong> — most features ship as directives (recommended) for maximum flexibility, and as components (legacy) for backward compatibility.</li>
					<li><strong>Type-safe &amp; well-documented</strong> — full TypeScript support with comprehensive type definitions for great IDE support and compile-time safety.</li>
					<li><strong>Angular Material integration</strong> — integrates seamlessly with Angular Material for consistent styling and behaviour.</li>
					<li><strong>Comprehensive utilities</strong> — helpers for progress-state management, printing, and click throttling, all built with Angular Signals.</li>
				</ul>
			</section>

		<section class="page-section api">
			<h2>Available components and utilities</h2>
			<table class="api-table">
				<thead>
					<tr>
						<th>Category</th>
						<th>Name</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><strong>Components</strong></td>
						<td>
							<code>alert</code>, <code>buttons</code>, <code>autocomplete</code>, <code>confirm-dialog</code>,
							<code>host-platforms</code>, <code>snack-bar</code>, <code>spinner</code>, <code>timeline</code>
						</td>
					</tr>
					<tr>
						<td><strong>Directives</strong></td>
						<td><code>buttons</code>, <code>ngx-print</code>, <code>preventMultipleClicks</code></td>
					</tr>
					<tr>
						<td><strong>SVG Icons</strong></td>
						<td><code>EditSolidSvgComponent</code></td>
					</tr>
					<tr>
						<td><strong>Utilities</strong></td>
						<td><code>progress-util</code></td>
					</tr>
				</tbody>
			</table>
		</section>

		<section class="page-section">
			<h2>Issues &amp; feature requests</h2>
			<p>Found a bug or edge case? Have an idea for a new utility? We'd love to hear from you!</p>
			<ul>
				<li><strong>Report Issues</strong>: If you encounter any bugs or unexpected behavior, please open an issue on GitHub.</li>
				<li><strong>Feature Requests</strong>: Have a utility in mind that would benefit the community? Submit a feature request via GitHub Issues.</li>
			</ul>
		</section>
	`,
	styles: `
		:host {
			display: block;
		}

		.page-title {
			margin-block-end: 0.5rem;
		}

		.page-lead {
			color: var(--gallery-text-muted);
			margin-block-end: 2rem;
		}

		.page-section {
			margin-block: 2rem;
		}

		.feature-list {
			margin: 0;
			padding-inline-start: 1.25rem;
		}

		.feature-list li {
			margin-block-end: 0.6rem;
		}

		.readout {
			margin-top: 12px;
			color: var(--gallery-text-muted);
			font-size: 14px;
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
export class IntroductionPage {}
