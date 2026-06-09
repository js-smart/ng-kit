import { DestroyRef, effect, inject, Signal, signal, untracked } from '@angular/core';
import { QueryKey, QueryObserver, QueryObserverOptions, QueryObserverResult } from '@tanstack/query-core';
import { QUERY_CLIENT } from './query-client.token';

/**
 * Angular adapter for TanStack Query's QueryObserver.
 *
 * Subscribes to a query and returns a reactive {@link Signal} that updates whenever
 * the query state changes (loading, success, error, refetch, etc.).
 *
 * The `optionsFn` is re-evaluated inside an `effect`, so any Angular signals read
 * inside it (e.g. a signal-based `queryKey`) will automatically trigger a re-fetch
 * when they change.
 *
 * @template TQueryFnData - The type of data returned by the query function
 * @template TError - The type of error thrown by the query function (defaults to `Error`)
 * @template TData - The type of data returned after optional `select` transformation
 * @template TQueryData - The type of data stored in the query cache
 * @template TQueryKey - The type of the query key
 *
 * @param optionsFn - A function returning {@link QueryObserverOptions}. May read Angular signals.
 * @returns A read-only {@link Signal} containing the current {@link QueryObserverResult}
 *
 * @example
 * ```ts
 * const id = signal(1);
 * const query = injectQuery(() => ({
 *   queryKey: ['user', id()],
 *   queryFn: () => fetchUser(id()),
 * }));
 * ```
 *
 * @author Pavan Kumar Jadda
 * @since 22.0.0
 */
export function injectQuery<
	TQueryFnData = unknown,
	TError = Error,
	TData = TQueryFnData,
	TQueryData = TQueryFnData,
	TQueryKey extends QueryKey = QueryKey,
>(
	optionsFn: () => QueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>,
): Signal<QueryObserverResult<TData, TError>> {
	const client = inject(QUERY_CLIENT);
	const destroyRef = inject(DestroyRef);

	// Create the observer with initial options
	const observer = new QueryObserver<TQueryFnData, TError, TData, TQueryData, TQueryKey>(client, untracked(optionsFn));

	// Store query result in a signal (observer defaults options in its constructor)
	const result = signal<QueryObserverResult<TData, TError>>(observer.getCurrentResult());

	// Subscribe to observer — pushes new state into the signal
	const unsubscribe = observer.subscribe((newResult) => {
		result.set(newResult);
	});

	// Re-run options when signals inside optionsFn() change (e.g. a signal-based queryKey)
	effect(() => {
		observer.setOptions(optionsFn());
	});

	// Clean up when the injection context is destroyed
	destroyRef.onDestroy(unsubscribe);

	return result;
}
