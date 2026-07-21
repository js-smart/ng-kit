---
name: migrate-to-signals
description: Migrate Angular Observable consumption to signals — replace `| async` pipes and read-only `.subscribe()` calls with `toSignal()`, `store.selectSignal()`, and `computed()`. Apply when a component exposes an Observable only to read it in the template/component, or when asked to remove async pipes / adopt signals.
---

# Migrate to signals

Convert Observable-based *state reading* to signals so templates read plain values and Angular handles cleanup automatically. This targets values you only **consume** (template `| async`, read-only subscriptions, derived state) — not genuine event/stream pipelines, which stay as RxJS.

## When to apply

- A field is `someThing$ = <observable>` and is only used via `| async` in the template.
- A `.subscribe()` exists purely to copy an emitted value into a field for reading.
- A `combineLatest`/`map` chain produces a value that's only read (not a stream of events).
- The user asks to "remove async pipes", "use signals", or "migrate to toSignal".

Do **not** convert: event streams (clicks, websockets, action effects), HTTP *mutations*, or pipelines with side effects. For those see the `take-until-destroyed` skill.

## Tools

| Source | Use |
|---|---|
| NgRx selector | `this.store.selectSignal(selector)` (purpose-built; no `toSignal` needed) |
| Any other Observable (HTTP, router, form `valueChanges`) | `toSignal(obs$, { initialValue })` from `@angular/core/rxjs-interop` |
| Derived value from other signals | `computed(() => ...)` |
| Local mutable state | `signal(initial)` |

## The initial-value rule (critical)

A signal always has a value, so `toSignal()` must know what to return before the first emission:

- Pass `{ initialValue: X }` when there's a sensible default → signal type is `T`.
- Omit it → signal type is `T | undefined`, and the value is `undefined` until first emission. Guard with `@if` in the template.

**ALWAYS pass an `initialValue` (e.g. `{ initialValue: null }`) when the source is `this.store.select(...)`.** A store selector and the resulting signal do not emit at the same time, so omitting `initialValue` causes a runtime error in the browser. `initialValue` is optional only for non-store Observables.

Prefer `this.store.selectSignal(selector)` for NgRx selectors in the first place — it needs no initial value and avoids this trap entirely.

## Migration recipe

1. Identify the `xxx$` field consumed only by `| async` (or a read-only subscription).
2. Replace it:
   - NgRx selector → `xxx = this.store.selectSignal(selectXxx);`
   - Other Observable → `xxx = toSignal(theObs$, { initialValue: ... });` (add initialValue if a default exists).
3. Update the template: read the signal by **calling** it.
   - `*ngIf="xxx$ | async as xxx"` → `@if (xxx(); as xxx) { ... }`
   - `{{ xxx$ | async }}` → `{{ xxx() }}`
4. Delete leftovers: the `| async` pipes, redundant `*ngIf` unwrapping, the read-only subscription, and any `ngOnDestroy` that only existed to clean it up.
5. Replace derived `combineLatest`/`map` chains with `computed(() => ...)` reading the new signals.
6. Fix imports: add `toSignal` (from `@angular/core/rxjs-interop`), `computed`/`signal` (from `@angular/core`); drop now-unused RxJS operators and `AsyncPipe`.

## Before

```typescript
@Component({ /* ... */ })
export class ProfileComponent {
    private readonly store = inject(Store);

    user$ = this.store.select(selectUser);
    fullName$ = this.user$.pipe(map(u => `${u.firstName} ${u.lastName}`));
}
```
```html
<div *ngIf="user$ | async as user">{{ fullName$ | async }}</div>
```

## After

```typescript
@Component({ /* ... */ })
export class ProfileComponent {
    private readonly store = inject(Store);

    user = this.store.selectSignal(selectUser);
    fullName = computed(() => {
        const u = this.user();
        return u ? `${u.firstName} ${u.lastName}` : '';
    });
}
```
```html
@if (user(); as user) {
  <div>{{ fullName() }}</div>
}
```

## Anti-patterns to flag and fix

- Reading a signal without calling it in the template (`{{ user }}` instead of `{{ user() }}`).
- `toSignal(this.store.select(...))` with no `initialValue` — causes a runtime browser error (selector and signal don't emit together). Add `{ initialValue: null }` or switch to `store.selectSignal(...)`.
- `toSignal()` with no `initialValue` whose result is used as if always defined (must guard or provide a default).
- Calling `toSignal()` inside a method/`ngOnInit` (it needs an injection context — declare it as a field).
- Keeping a `.subscribe()` + field assignment just to read a value (replace with the signal directly).
- Using `toSignal(store.select(...))` for a plain selector where `store.selectSignal(...)` is clearer.
- Converting a genuine event/side-effect stream to a signal (leave it as RxJS; manage with `takeUntilDestroyed`).
