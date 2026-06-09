import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';
import { QueryClient, QueryClientConfig } from '@tanstack/query-core';

/**
 * Injection token for the TanStack {@link QueryClient}.
 *
 * Provide it in your application root using {@link provideQueryClient}.
 *
 * @author Pavan Kumar Jadda
 * @since 22.0.0
 */
export const QUERY_CLIENT = new InjectionToken<QueryClient>('QueryClient');

/**
 * Registers a {@link QueryClient} with Angular's dependency injection system.
 *
 * Accepts either an existing {@link QueryClient} instance or a {@link QueryClientConfig}
 * object from which a new client will be created automatically.
 *
 * @param clientOrConfig - An existing `QueryClient` or a `QueryClientConfig` options object.
 *   Omit to create a client with default settings.
 * @returns `EnvironmentProviders` to be passed to `bootstrapApplication` or `provideRouter`.
 *
 * @example
 * ```ts
 * // main.ts
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     provideQueryClient({ defaultOptions: { queries: { staleTime: 30_000 } } }),
 *   ],
 * });
 * ```
 *
 * @author Pavan Kumar Jadda
 * @since 22.0.0
 */
export function provideQueryClient(clientOrConfig?: QueryClient | QueryClientConfig): EnvironmentProviders {
	const client = clientOrConfig instanceof QueryClient ? clientOrConfig : new QueryClient(clientOrConfig);
	return makeEnvironmentProviders([{ provide: QUERY_CLIENT, useValue: client }]);
}
