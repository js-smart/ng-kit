import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DemoCard } from '../../shared/demo-card.component';
import { QueryDemoComponent } from '../../query-demo/query-demo.component';

const PROVIDE_CODE = `import { bootstrapApplication } from '@angular/platform-browser';
import { provideQueryClient } from '@js-smart/ng-kit';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
	providers: [
		provideQueryClient({
			defaultOptions: { queries: { staleTime: 30_000 } },
		}),
	],
});`;

const QUERY_CODE = `import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { injectQuery } from '@js-smart/ng-kit';

@Component({
	selector: 'app-post',
	template: \`
		@if (post().isPending) {
			<p>Loading…</p>
		} @else if (post().isError) {
			<p>Error: {{ post().error?.message }}</p>
		} @else {
			<h3>{{ post().data?.title }}</h3>
		}
	\`,
})
export class PostComponent {
	private http = inject(HttpClient);
	postId = signal(1);

	// Reading postId() inside the options function makes the query reactive:
	// changing the signal re-runs the query, and cached IDs resolve instantly.
	post = injectQuery(() => ({
		queryKey: ['post', this.postId()],
		queryFn: () => firstValueFrom(this.http.get(\`/api/posts/\${this.postId()}\`)),
		staleTime: 30_000,
	}));
}`;

const MUTATION_CODE = `import { injectMutation } from '@js-smart/ng-kit';

createPost = injectMutation<Post, Error, Partial<Post>>(() => ({
	mutationFn: (data) => firstValueFrom(this.http.post<Post>('/api/posts', data)),
}));

// Fire-and-forget — state is reflected through createPost.result()
this.createPost.mutate({ title: 'Hello', userId: 1 });

// Imperative flow — await success / catch errors
await this.createPost.mutateAsync({ title: 'Hello', userId: 1 });`;

/**
 * Gallery page for the TanStack Query Angular adapter. Documents
 * provideQueryClient, injectQuery, and injectMutation, and embeds the live
 * query demo.
 */
@Component({
	selector: 'ng-kit-query-page',
	imports: [DemoCard, QueryDemoComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<h1 class="page-title">TanStack Query</h1>
		<p class="page-lead">
			A thin Angular adapter for <a href="https://tanstack.com/query" rel="noopener">TanStack Query</a>. Wrap the framework-agnostic
			<code>QueryObserver</code> and <code>MutationObserver</code> in signals so query and mutation state flows through Angular's
			reactivity — no <code>RxJS</code> subscriptions to manage, no manual change detection.
		</p>

		<section class="page-section">
			<h2>Overview</h2>
			<p>
				The adapter exposes three primitives. Register a <code>QueryClient</code> once with <code>provideQueryClient()</code>, then call
				<code>injectQuery()</code> to read cached server state and <code>injectMutation()</code> to write it. Both return signals, so
				templates can read <code>query().data</code>, <code>query().isPending</code>, and <code>query().isError</code> directly.
			</p>
			<p>
				Each accepts an <em>options function</em> that is re-evaluated inside an Angular <code>effect</code>. Any signal read inside that
				function becomes a dependency: reading a signal-based <code>queryKey</code> makes the query re-fetch automatically when the signal
				changes, while previously loaded keys resolve instantly from cache (subject to <code>staleTime</code>).
			</p>
			<ul>
				<li><code>provideQueryClient()</code> — registers a <code>QueryClient</code> (or config) with Angular DI.</li>
				<li><code>injectQuery()</code> — subscribes to a query and returns a reactive result signal.</li>
				<li><code>injectMutation()</code> — creates a mutation with <code>mutate</code>, <code>mutateAsync</code>, and <code>reset</code>.</li>
			</ul>
			<p>
				Both hooks must run in an injection context (a component field initializer or inside <code>inject()</code>), and clean up their
				observer subscriptions automatically via <code>DestroyRef</code>.
			</p>
		</section>

		<demo-card
			title="Setup"
			description="Provide a QueryClient at the application root before using injectQuery or injectMutation."
			[props]="['provideQueryClient']"
			[code]="provideCode" />

		<demo-card
			title="injectQuery — reactive queryKey &amp; caching"
			description="A signal-based queryKey re-fetches on change; switching back to a cached post ID is instant. injectMutation creates a post via mutate and mutateAsync."
			[props]="['injectQuery', 'injectMutation', 'mutate', 'mutateAsync']"
			[code]="queryCode">
			<ng-kit-query-demo />
		</demo-card>

		<demo-card
			title="injectMutation — mutate &amp; mutateAsync"
			description="Fire-and-forget writes with mutate, or await the outcome with mutateAsync."
			[props]="['mutationFn', 'mutate', 'mutateAsync', 'reset']"
			[code]="mutationCode" />

		<section class="page-section api">
			<h2>API reference</h2>
			<h3>Exports</h3>
			<p><code>provideQueryClient</code>, <code>injectQuery</code>, <code>injectMutation</code>, <code>QUERY_CLIENT</code></p>

			<h3>provideQueryClient(clientOrConfig?)</h3>
			<table class="api-table">
				<thead>
					<tr>
						<th>Parameter</th>
						<th>Type</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><code>clientOrConfig</code></td>
						<td><code>QueryClient | QueryClientConfig</code> (optional)</td>
						<td>An existing client or a config to build one. Omit for defaults.</td>
					</tr>
					<tr>
						<td><em>returns</em></td>
						<td><code>EnvironmentProviders</code></td>
						<td>Pass to <code>bootstrapApplication</code> or a route's providers.</td>
					</tr>
				</tbody>
			</table>

			<h3>injectQuery(optionsFn)</h3>
			<table class="api-table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Type</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><code>optionsFn</code></td>
						<td><code>() =&gt; QueryObserverOptions</code></td>
						<td>Returns query options; may read signals (e.g. a reactive <code>queryKey</code>).</td>
					</tr>
					<tr>
						<td><em>returns</em></td>
						<td><code>Signal&lt;QueryObserverResult&gt;</code></td>
						<td>Reactive result: <code>data</code>, <code>isPending</code>, <code>isError</code>, <code>error</code>, etc.</td>
					</tr>
				</tbody>
			</table>

			<h3>injectMutation(optionsFn)</h3>
			<table class="api-table">
				<thead>
					<tr>
						<th>Member</th>
						<th>Type</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><code>result</code></td>
						<td><code>Signal&lt;MutationObserverResult&gt;</code></td>
						<td>Reactive mutation state (idle, pending, success, error).</td>
					</tr>
					<tr>
						<td><code>mutate</code></td>
						<td><code>(variables, options?) =&gt; void</code></td>
						<td>Fire-and-forget trigger; outcome is reflected through <code>result</code>.</td>
					</tr>
					<tr>
						<td><code>mutateAsync</code></td>
						<td><code>(variables, options?) =&gt; Promise&lt;TData&gt;</code></td>
						<td>Triggers and returns a promise that resolves or rejects with the outcome.</td>
					</tr>
					<tr>
						<td><code>reset</code></td>
						<td><code>() =&gt; void</code></td>
						<td>Resets the mutation observer back to idle.</td>
					</tr>
				</tbody>
			</table>

			<p class="api-note">
				Both hooks must run in an injection context and require a <code>QUERY_CLIENT</code> to be provided via
				<code>provideQueryClient()</code>. Generic parameters mirror TanStack Query: <code>injectQuery&lt;TQueryFnData, TError, TData&gt;</code>
				and <code>injectMutation&lt;TData, TError, TVariables, TContext&gt;</code>.
			</p>
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
			max-width: 70ch;
			color: rgba(0, 0, 0, 0.7);
			margin-block-end: 2rem;
		}

		.page-section {
			margin-block: 2rem;
			max-width: 70ch;
		}

		.readout {
			margin-top: 12px;
			color: rgba(0, 0, 0, 0.6);
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
			border-block-end: 1px solid rgba(0, 0, 0, 0.12);
			vertical-align: top;
		}

		.api-note {
			margin-block-start: 0.75rem;
			color: rgba(0, 0, 0, 0.7);
		}

		code {
			font-family: 'Roboto Mono', ui-monospace, monospace;
			font-size: 0.85em;
		}
	`,
})
export class QueryPage {
	protected readonly provideCode = PROVIDE_CODE;
	protected readonly queryCode = QUERY_CODE;
	protected readonly mutationCode = MUTATION_CODE;
}
