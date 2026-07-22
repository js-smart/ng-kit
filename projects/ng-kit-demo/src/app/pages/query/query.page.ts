import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocPage } from '../../shared/doc-page.component';
import { DemoCard } from '../../shared/demo-card.component';
import { QueryDemoComponent } from '../../query-demo/query-demo.component';
import { buildDemoConfig } from '../../shared/build-demo-config';

/**
 * Full StackBlitz `app.config.ts` for every Query example. The generic
 * `additionalProviders` path inlines provider expressions but does NOT emit the
 * corresponding import statements, so `provideHttpClient()` / `provideQueryClient()`
 * would be referenced without imports. Overriding the whole file via
 * `additionalFiles` keeps the launched project compilable and mirrors the app's
 * own root providers (an HTTP client plus a QueryClient with a 30s staleTime).
 */
const QUERY_APP_CONFIG = `import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideQueryClient } from '@js-smart/ng-kit';
import {
	PreloadAllModules,
	provideRouter,
	withComponentInputBinding,
	withInMemoryScrolling,
	withPreloading,
	withRouterConfig,
} from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(
			routes,
			withComponentInputBinding(),
			withInMemoryScrolling(),
			withPreloading(PreloadAllModules),
			withRouterConfig({ onSameUrlNavigation: 'reload' }),
		),
		provideHttpClient(),
		provideQueryClient({
			defaultOptions: { queries: { staleTime: 30_000 } },
		}),
	],
};
`;

/** Extra StackBlitz files shared by every Query example (correct app.config). */
const QUERY_STACKBLITZ_FILES = { 'src/app/app.config.ts': QUERY_APP_CONFIG };

const SETUP_CODE = `import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { injectQuery } from '@js-smart/ng-kit';

// Register the QueryClient once at the application root, e.g. in app.config.ts:
//
//   export const appConfig: ApplicationConfig = {
//     providers: [
//       provideHttpClient(),
//       provideQueryClient({ defaultOptions: { queries: { staleTime: 30_000 } } }),
//     ],
//   };
//
// Once provided, any component can call injectQuery / injectMutation.

interface Post {
	id: number;
	title: string;
}

@Component({
	selector: 'app-query-setup',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: \`
		@if (post().isPending) {
			<p>Connecting to the query client…</p>
		} @else if (post().isError) {
			<p>Error: {{ post().error?.message }}</p>
		} @else {
			<p>QueryClient is wired — first post: {{ post().data?.title }}</p>
		}
	\`,
})
export class QuerySetupComponent {
	private http = inject(HttpClient);

	// Resolves as soon as the provided QueryClient serves the request.
	post = injectQuery<Post>(() => ({
		queryKey: ['setup-check'],
		queryFn: () => firstValueFrom(this.http.get<Post>('https://jsonplaceholder.typicode.com/posts/1')),
		staleTime: 30_000,
	}));
}`;

const REACTIVE_QUERY_CODE = `import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { injectMutation, injectQuery } from '@js-smart/ng-kit';

interface Post {
	id: number;
	userId: number;
	title: string;
	body: string;
}

@Component({
	selector: 'app-reactive-query',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: \`
		<div class="ids">
			@for (id of postIds; track id) {
				<button type="button" (click)="postId.set(id)">Post {{ id }}</button>
			}
		</div>

		@if (post().isPending) {
			<p>Loading…</p>
		} @else if (post().isError) {
			<p>Error: {{ post().error?.message }}</p>
		} @else {
			<h3>{{ post().data?.title }}</h3>
			<p>{{ post().data?.body }}</p>
		}

		<button type="button" (click)="submitPost()">Create post</button>
		@if (createPost.result().isSuccess) {
			<p>Created post #{{ createPost.result().data?.id }}</p>
		}
	\`,
})
export class ReactiveQueryComponent {
	private http = inject(HttpClient);

	readonly postIds = [1, 2, 3, 4, 5];
	postId = signal(1);

	// Reading postId() inside the options function makes the query reactive:
	// changing the signal re-runs the query, and cached IDs resolve instantly
	// from cache (subject to staleTime).
	post = injectQuery<Post>(() => ({
		queryKey: ['post', this.postId()],
		queryFn: () =>
			firstValueFrom(this.http.get<Post>(\`https://jsonplaceholder.typicode.com/posts/\${this.postId()}\`)),
		staleTime: 30_000,
	}));

	createPost = injectMutation<Post, Error, Partial<Post>>(() => ({
		mutationFn: (data) => firstValueFrom(this.http.post<Post>('https://jsonplaceholder.typicode.com/posts', data)),
	}));

	submitPost(): void {
		this.createPost.mutate({ title: 'Hello', body: 'Created from ng-kit query demo', userId: 1 });
	}
}`;

const MUTATION_CODE = `import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { injectMutation } from '@js-smart/ng-kit';

interface Post {
	id: number;
	userId: number;
	title: string;
	body: string;
}

@Component({
	selector: 'app-mutation-example',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: \`
		<input [value]="title()" (input)="title.set($any($event.target).value)" />

		<button type="button" (click)="submit()">mutate</button>
		<button type="button" (click)="submitAsync()">mutateAsync</button>
		<button type="button" (click)="createPost.reset()">reset</button>

		@if (createPost.result().isPending) {
			<p>Saving…</p>
		} @else if (createPost.result().isError) {
			<p>Error: {{ createPost.result().error?.message }}</p>
		} @else if (createPost.result().isSuccess) {
			<p>Created post #{{ createPost.result().data?.id }}</p>
		}
	\`,
})
export class MutationExampleComponent {
	private http = inject(HttpClient);

	title = signal('Hello');

	createPost = injectMutation<Post, Error, Partial<Post>>(() => ({
		mutationFn: (data) => firstValueFrom(this.http.post<Post>('https://jsonplaceholder.typicode.com/posts', data)),
	}));

	// Fire-and-forget — state is reflected through createPost.result()
	submit(): void {
		this.createPost.mutate({ title: this.title(), userId: 1 });
	}

	// Imperative flow — await success / catch errors
	async submitAsync(): Promise<void> {
		await this.createPost.mutateAsync({ title: this.title(), userId: 1 });
	}
}`;

/** StackBlitz config — QuerySetupComponent from componentName 'query-setup'. */
const setupConfig = buildDemoConfig({
	title: 'Setup',
	componentName: 'query-setup',
	code: SETUP_CODE,
	requiredImports: [],
	additionalFiles: QUERY_STACKBLITZ_FILES,
});

/** StackBlitz config — ReactiveQueryComponent from componentName 'reactive-query'. */
const reactiveQueryConfig = buildDemoConfig({
	title: 'injectQuery — reactive queryKey & caching',
	componentName: 'reactive-query',
	code: REACTIVE_QUERY_CODE,
	requiredImports: [],
	additionalFiles: QUERY_STACKBLITZ_FILES,
});

/** StackBlitz config — MutationExampleComponent from componentName 'mutation-example'. */
const mutationConfig = buildDemoConfig({
	title: 'injectMutation — mutate & mutateAsync',
	componentName: 'mutation-example',
	code: MUTATION_CODE,
	requiredImports: [],
	additionalFiles: QUERY_STACKBLITZ_FILES,
});

/**
 * Gallery page for the TanStack Query Angular adapter. Documents
 * provideQueryClient, injectQuery, and injectMutation, and embeds the live
 * query demo.
 */
@Component({
	selector: 'ng-kit-query-page',
	imports: [DocPage, DemoCard, QueryDemoComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<doc-page title="TanStack Query">
			<p docLead>
				A thin Angular adapter for <a href="https://tanstack.com/query" rel="noopener">TanStack Query</a>. Wrap the framework-agnostic
				<code>QueryObserver</code> and <code>MutationObserver</code> in signals so query and mutation state flows through Angular's
				reactivity — no <code>RxJS</code> subscriptions to manage, no manual change detection.
			</p>

			<div docOverview>
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
			</div>

			<div docApi>
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
			</div>

			<div docExamples>
				<demo-card
					title="Setup"
					anchorId="setup"
					description="Provide a QueryClient at the application root before using injectQuery or injectMutation."
					[props]="['provideQueryClient']"
					[code]="setupCode"
					[stackblitz]="setupConfig" />

				<demo-card
					title="injectQuery — reactive queryKey &amp; caching"
					anchorId="reactive-query"
					description="A signal-based queryKey re-fetches on change; switching back to a cached post ID is instant. injectMutation creates a post via mutate and mutateAsync."
					[props]="['injectQuery', 'injectMutation', 'mutate', 'mutateAsync']"
					[code]="reactiveQueryCode"
					[stackblitz]="reactiveQueryConfig">
					<ng-kit-query-demo />
				</demo-card>

				<demo-card
					title="injectMutation — mutate &amp; mutateAsync"
					anchorId="mutation"
					description="Fire-and-forget writes with mutate, or await the outcome with mutateAsync."
					[props]="['mutationFn', 'mutate', 'mutateAsync', 'reset']"
					[code]="mutationCode"
					[stackblitz]="mutationConfig" />
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
			color: rgba(0, 0, 0, 0.7);
			margin-block-end: 2rem;
		}

		.page-section {
			margin-block: 2rem;
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
	protected readonly setupCode = SETUP_CODE;
	protected readonly reactiveQueryCode = REACTIVE_QUERY_CODE;
	protected readonly mutationCode = MUTATION_CODE;

	protected readonly setupConfig = setupConfig;
	protected readonly reactiveQueryConfig = reactiveQueryConfig;
	protected readonly mutationConfig = mutationConfig;
}
