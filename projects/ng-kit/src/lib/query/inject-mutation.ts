import { DestroyRef, effect, inject, Signal, signal, untracked } from '@angular/core';
import { MutateOptions, MutationObserver, MutationObserverOptions, MutationObserverResult } from '@tanstack/query-core';
import { QUERY_CLIENT } from './query-client.token';

/**
 * Return value from {@link injectMutation}.
 *
 * @template TData - The type of data returned by the mutation function
 * @template TError - The type of error thrown by the mutation function
 * @template TVariables - The type of variables passed to the mutation function
 * @template TContext - The type of context returned by `onMutate`
 */
export interface InjectMutationResult<TData, TError, TVariables, TContext> {
	/**
	 * Reactive mutation state.
	 */
	result: Signal<MutationObserverResult<TData, TError, TVariables, TContext>>;

	/**
	 * Triggers the mutation without returning a promise.
	 *
	 * Use `mutateAsync` when the caller needs to await success or handle errors directly.
	 *
	 * @param variables - Variables passed to the mutation function.
	 * @param options - Optional per-call mutation callbacks.
	 */
	mutate: (variables: TVariables, options?: MutateOptions<TData, TError, TVariables, TContext>) => void;

	/**
	 * Triggers the mutation and returns a promise for imperative async flows.
	 *
	 * @param variables - Variables passed to the mutation function.
	 * @param options - Optional per-call mutation callbacks.
	 * @returns Promise resolving with mutation data or rejecting with the mutation error.
	 */
	mutateAsync: (variables: TVariables, options?: MutateOptions<TData, TError, TVariables, TContext>) => Promise<TData>;

	/**
	 * Resets the mutation observer state.
	 */
	reset: () => void;
}

/**
 * Angular adapter for TanStack Query's MutationObserver.
 *
 * Creates a mutation and returns a reactive {@link Signal} alongside `mutate` and
 * `mutateAsync` functions. The signal updates whenever the mutation state changes
 * (idle, pending, success, error).
 *
 * The `optionsFn` is re-evaluated inside an `effect`, so any Angular signals read
 * inside it will automatically update the observer options when they change.
 *
 * @template TData - The type of data returned by the mutation function
 * @template TError - The type of error thrown by the mutation function (defaults to `Error`)
 * @template TVariables - The type of variables passed to the mutation function (defaults to `void`)
 * @template TContext - The type of context returned by `onMutate` for optimistic updates (defaults to `unknown`)
 *
 * @param optionsFn - A function returning {@link MutationObserverOptions}. May read Angular signals.
 * @returns An object containing:
 *   - `result` — a read-only {@link Signal} with the current {@link MutationObserverResult}
 *   - `mutate` — fire-and-forget trigger; does not return a Promise
 *   - `mutateAsync` — returns a `Promise<TData>` that resolves or rejects with the mutation outcome
 *
 * @example
 * ```ts
 * const mutation = injectMutation(() => ({
 *   mutationFn: (user: User) => saveUser(user),
 *   onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
 * }));
 *
 * mutation.mutate(newUser);
 * await mutation.mutateAsync(newUser);
 * ```
 *
 * @author Pavan Kumar Jadda
 * @since 22.0.0
 */
export function injectMutation<TData, TError = Error, TVariables = void, TContext = unknown>(
	optionsFn: () => MutationObserverOptions<TData, TError, TVariables, TContext>,
): InjectMutationResult<TData, TError, TVariables, TContext> {
	const client = inject(QUERY_CLIENT);
	const destroyRef = inject(DestroyRef);

	const observer = new MutationObserver<TData, TError, TVariables, TContext>(client, untracked(optionsFn));

	const result = signal<MutationObserverResult<TData, TError, TVariables, TContext>>(observer.getCurrentResult());

	const unsubscribe = observer.subscribe((newResult) => {
		result.set(newResult);
	});

	effect(() => {
		observer.setOptions(optionsFn());
	});

	destroyRef.onDestroy(unsubscribe);

	const mutateAsync = (
		variables: TVariables,
		options?: MutateOptions<TData, TError, TVariables, TContext>,
	): Promise<TData> => observer.mutate(variables, options);

	// Return both the reactive result AND a mutate function
	return {
		result,
		mutate: (variables, options) => {
			void mutateAsync(variables, options).catch(() => {
				// Errors are reflected through the mutation result signal.
			});
		},
		mutateAsync,
		reset: () => observer.reset(),
	};
}
