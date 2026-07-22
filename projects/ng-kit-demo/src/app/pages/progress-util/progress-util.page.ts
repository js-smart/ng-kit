import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DemoCard } from '../../shared/demo-card.component';
import { DocPage } from '../../shared/doc-page.component';
import { ProgressStateDemoComponent } from '../../progress-state-demo/progress-state-demo.component';
import { buildDemoConfig } from '../../shared/build-demo-config';

const BASIC_CODE = `import { Component } from '@angular/core';
import { initializeState, markLoading, markSuccess, markError } from '@js-smart/ng-kit';

@Component({
	selector: 'app-save-lifecycle',
	template: \`
		<button (click)="saveData()" [disabled]="progressState().isLoading">
			{{ progressState().isLoading ? 'Saving...' : 'Save' }}
		</button>

		@if (progressState().isSuccess) {
			<div class="success">Success! {{ progressState().message }}</div>
		}

		@if (progressState().isError) {
			<div class="error">Error: {{ progressState().message }}</div>
		}
	\`,
})
export class SaveLifecycleComponent {
	progressState = initializeState();

	saveData() {
		markLoading(this.progressState);

		// Simulate API call
		setTimeout(() => {
			markSuccess(this.progressState, 'Data saved successfully');
		}, 2000);
	}
}`;

/** StackBlitz config for the Save-button-lifecycle card — class matches PascalCase(componentName). */
const saveLifecycleConfig = buildDemoConfig({
	title: 'Save button lifecycle',
	componentName: 'save-lifecycle',
	code: BASIC_CODE,
});

/**
 * Gallery page for the progress-util helpers: initializeState, markLoading,
 * markSuccess, markError, and the ProgressState shape. Mirrors the reference
 * autocomplete page structure.
 */
@Component({
	selector: 'ng-kit-progress-util-page',
	imports: [DemoCard, DocPage, ProgressStateDemoComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<doc-page title="Progress Util">
			<p docLead>
				A signal-based helper for tracking the lifecycle of asynchronous operations. <code>initializeState</code> returns a
				<code>WritableSignal&lt;ProgressState&gt;</code>, and <code>markLoading</code>, <code>markSuccess</code>, and
				<code>markError</code> drive it through loading, success, and error transitions so your UI updates reactively.
			</p>

			<div docOverview>
				<p>
					<code>progress-util</code> manages progress states in Angular applications using Angular Signals. It offers a simple,
					type-safe way to track the loading, success, and error states of asynchronous work, making it a good fit for form
					submissions, API calls, data loading, and user feedback.
				</p>
				<p>
					The utility uses a <code>WritableSignal</code> for reactive state management, so the UI updates automatically when the
					progress state changes. Import the functions from <code>&#64;js-smart/ng-kit</code>, initialize a state with
					<code>initializeState()</code>, and call the helpers to move through the lifecycle:
				</p>
				<ul>
					<li><code>markLoading(state)</code> — an operation is in progress.</li>
					<li><code>markSuccess(state, message?)</code> — the operation completed successfully.</li>
					<li><code>markError(state, message?)</code> — the operation failed.</li>
				</ul>
				<p>
					The state follows a predictable flow: <em>Initial → Loading → Success/Error</em>, and can return to loading for a new
					operation. It works seamlessly with Angular change detection and the OnPush strategy.
				</p>
			</div>

			<div docExamples>
				<demo-card
					title="Save button lifecycle"
					anchorId="save-button-lifecycle"
					description="A save button that transitions through loading, success, then error using the progress-util helpers."
					[props]="['initializeState', 'markLoading', 'markSuccess', 'markError']"
					[code]="basicCode"
					[stackblitz]="saveLifecycleConfig">
					<app-progress-state-demo />
				</demo-card>
			</div>

			<div docApi>
				<h3>Functions</h3>
				<table class="api-table">
					<thead>
						<tr>
							<th>Function</th>
							<th>Parameters</th>
							<th>Returns</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>initializeState</code></td>
							<td>—</td>
							<td><code>WritableSignal&lt;ProgressState&gt;</code></td>
							<td>Initializes and returns a new progress state signal with default values</td>
						</tr>
						<tr>
							<td><code>markLoading</code></td>
							<td><code>state: WritableSignal&lt;ProgressState&gt;</code></td>
							<td><code>void</code></td>
							<td>Updates the state to loading, clearing success and error flags</td>
						</tr>
						<tr>
							<td><code>markSuccess</code></td>
							<td><code>state: WritableSignal&lt;ProgressState&gt;</code>, <code>message?: string</code></td>
							<td><code>void</code></td>
							<td>Updates the state to success with an optional success message</td>
						</tr>
						<tr>
							<td><code>markError</code></td>
							<td><code>state: WritableSignal&lt;ProgressState&gt;</code>, <code>message?: string</code></td>
							<td><code>void</code></td>
							<td>Updates the state to error with an optional error message</td>
						</tr>
					</tbody>
				</table>

				<h3>ProgressState</h3>
				<table class="api-table">
					<thead>
						<tr>
							<th>Property</th>
							<th>Type</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>isLoading</code></td>
							<td><code>boolean</code></td>
							<td><code>true</code> when an operation is in progress, <code>false</code> otherwise</td>
						</tr>
						<tr>
							<td><code>isSuccess</code></td>
							<td><code>boolean</code></td>
							<td><code>true</code> when the last operation completed successfully</td>
						</tr>
						<tr>
							<td><code>isError</code></td>
							<td><code>boolean</code></td>
							<td><code>true</code> when the last operation failed</td>
						</tr>
						<tr>
							<td><code>isComplete</code></td>
							<td><code>boolean</code> (optional)</td>
							<td><code>true</code> when the operation has completed (success or error)</td>
						</tr>
						<tr>
							<td><code>message</code></td>
							<td><code>string</code></td>
							<td>User-friendly message describing the current state or outcome</td>
						</tr>
					</tbody>
				</table>
				<p class="api-note">
					The initial state is <code>{{ '{' }} isLoading: false, isSuccess: false, isError: false, isComplete: false, message: '' {{ '}' }}</code>.
					Reset for a new operation by calling <code>markLoading()</code> again.
				</p>
			</div>
		</doc-page>
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

		.readout {
			margin-top: 12px;
			color: var(--gallery-text-muted);
			font-size: 14px;
		}
	`,
})
export class ProgressUtilPage {
	protected readonly basicCode = BASIC_CODE;
	protected readonly saveLifecycleConfig = saveLifecycleConfig;
}
