import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeBlock } from '../../shared/code-block.component';

const INSTALL_CODE = `# Install using npm or package manager of your choice
npm i @js-smart/ng-kit @angular/material @angular/cdk
`;

const USAGE_CODE = `import { Component, signal } from '@angular/core';
import { PrimaryButtonDirective } from '@js-smart/ng-kit';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'app-component',
	imports: [PrimaryButtonDirective, MatButtonModule],
	template: \`
		<button [disabled]="loading()" (click)="handleClick()" primaryButton mat-raised-button>
			{{ loading() ? 'Loading...' : 'Submit' }}
		</button>
	\`,
})
export class AppComponent {
	loading = signal(false);

	handleClick() {
		this.loading.set(true);
		setTimeout(() => this.loading.set(false), 3000);
	}
}`;

const CLEAN_INSTALL_CODE = `rm -rf node_modules package-lock.json
npm install`;

/**
 * Getting-started page covering how to install and set up @js-smart/ng-kit:
 * package-manager install commands, prerequisites, the compatibility matrix,
 * a usage example, and troubleshooting notes.
 */
@Component({
	selector: 'ng-kit-installation-page',
	imports: [CodeBlock],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<h1 class="page-title">Installation</h1>
		<p class="page-lead">
			How to install and set up <code>&#64;js-smart/ng-kit</code> in your Angular application, plus prerequisites, version
			compatibility, and troubleshooting tips.
		</p>

		<section class="page-section">
			<h2>Overview</h2>
			<p>Install <code>&#64;js-smart/ng-kit</code> using your preferred package manager.</p>
		</section>

		<code-block [code]="installCode" language="bash" />

		<section class="page-section">
			<h2>Prerequisites</h2>
			<p>The library requires:</p>
			<ul>
				<li><strong>Angular</strong>: Version 19 or later</li>
				<li><strong>RxJS</strong>: Version 7.x</li>
				<li><strong>Bootstrap</strong>: Version 5.x (if using)</li>
				<li><strong>Angular Material</strong>: Required for Material-based components</li>
			</ul>
		</section>

		<section class="page-section">
			<h2>Compatibility matrix</h2>
			<p>
				<strong>ng-kit</strong> follows Angular semantic versioning. Use the ng-kit version that matches your Angular version. Minor and
				patch versions within the same major version are compatible.
			</p>
			<table class="api-table">
				<thead>
					<tr>
						<th>Angular version</th>
						<th>Library version</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><code>21.x</code></td>
						<td><code>21.x</code></td>
						<td>Supported</td>
					</tr>
					<tr>
						<td><code>20.x</code></td>
						<td><code>20.x</code></td>
						<td>Supported</td>
					</tr>
					<tr>
						<td><code>19.x</code></td>
						<td><code>19.x</code></td>
						<td>Supported</td>
					</tr>
				</tbody>
			</table>
		</section>

		<section class="page-section">
			<h2>Usage example</h2>
			<p>
				<strong>ng-kit</strong> is fully modular and tree-shakable&mdash;import only the features you need. Here's how to use the
				<code>PrimaryButtonDirective</code> in a standalone component.
			</p>
		</section>

		<code-block [code]="usageCode" language="typescript" />

		<section class="page-section">
			<h2>Troubleshooting</h2>
			<p>If you encounter issues during installation or usage:</p>
			<ol>
				<li><strong>Version compatibility</strong>: Ensure your Angular version is 19 or later.</li>
				<li><strong>Peer dependencies</strong>: Check for peer dependency warnings during install and ensure all required packages are installed.</li>
				<li><strong>Clean install</strong>: Delete <code>node_modules</code> and lock files, then reinstall dependencies.</li>
				<li><strong>Bootstrap styles</strong>: Verify Bootstrap CSS is properly imported if components appear unstyled.</li>
				<li><strong>Angular Material</strong>: Ensure Angular Material is installed if using Material-based components.</li>
				<li><strong>TypeScript errors</strong>: Ensure you're using a compatible TypeScript version (check Angular requirements).</li>
				<li><strong>Update guide</strong>: Review the Angular Update Guide for breaking changes between versions.</li>
			</ol>
			<code-block [code]="cleanInstallCode" language="bash" />
		</section>

		<section class="page-section">
			<h2>Next steps</h2>
			<ul>
				<li>Explore the <strong>Components</strong> section for available UI components.</li>
				<li>Check out <strong>Directives</strong> for interactive directives.</li>
				<li>Review <strong>Utilities</strong> for helper functions and state management.</li>
				<li>See the <strong>Introduction</strong> for an overview of key features.</li>
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

		.code-block {
			margin: 0.5rem 0 0;
			padding: 1rem;
			overflow-x: auto;
			border-radius: 8px;
			background: rgba(0, 0, 0, 0.04);
			font-family: 'Roboto Mono', ui-monospace, monospace;
			font-size: 0.8125rem;
			line-height: 1.5;
		}

		code {
			font-family: 'Roboto Mono', ui-monospace, monospace;
			font-size: 0.85em;
		}
	`,
})
export class InstallationPage {
	protected readonly installCode = INSTALL_CODE;
	protected readonly usageCode = USAGE_CODE;
	protected readonly cleanInstallCode = CLEAN_INSTALL_CODE;
}
