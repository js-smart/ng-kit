---
name: signal-forms-composition
description: Use when building, composing, or MIGRATING Angular Signal Forms (stable in Angular 22; experimental in v21) — converting an existing reactive form (FormGroup/FormControl/Validators) to a signal form, building a section component over an object slice, a container over an array of complex rows, implementing custom FormValueControl inputs, or sharing validation schemas between a parent form and its child sections. Covers the reactive-to-signal migration mapping plus the composition patterns the official @angular/forms/signals guide omits.
---

## Overview

Angular Signal Forms (`@angular/forms/signals`) is a signal-based forms API, **stable as of Angular 22** (experimental in v21 — the API changed before stabilizing, so target v22+). A `form()` is built around a `signal()` model and exposes a typed `FieldTree<T>` whose nodes provide reactive `value`, `errors`, `touched`, `valid` signals. Validation is declared by a **schema function** that calls `required` / `pattern` / `validate` etc. against paths into the model.

The official guide covers leaf controls (one value per component). It is **light on composition** — when a form is split across multiple components (a section hosting several inputs over an object slice of the model, or a container over an array of rows). That gap is what this skill covers.

## Mental model

`form(model, schemaFn)` takes a `WritableSignal<TModel>` and a schema function, and returns a `FieldTree<TModel>`. Navigating the tree by property (`form.foo`) gives a sub-tree. Calling any node (`form()`, `form.foo()`) gives its `FieldState` snapshot with `value` / `errors` / `valid` / `touched` signals.

Three things to keep straight:

| Term | Type | Got by | Use for |
|---|---|---|---|
| **Model** | `WritableSignal<T>` | `signal(...)` / `model(...)` | The source data |
| **FieldTree<T>** | callable + sub-field proxies | `form(model, schemaFn)` | Navigate paths (`form.foo.bar`, `form.items[i]`) and pass to `[formField]` |
| **FieldState<T>** | `{ value, errors, valid, touched, … }` | calling the FieldTree (`form()`, `form.foo()`) | Reading state in templates / computeds |

**Sub-tree vs. state — the most common confusion:**

```ts
form.email          // FieldTree<string>  — pass to [formField]
form.email()        // FieldState<string> — read .value(), .errors(), .invalid()
form.email().value()      // string
form.email().errors()     // ValidationError[]
form().valid()            // boolean — top-level form validity
```

Sub-path access (`.email`) is a proxy on the FieldTree. Calling the tree (`()`) gives state. They are not interchangeable.

## Minimal form (the documented baseline)

```ts
import { Component, signal } from '@angular/core';
import { form, FormField, required, email } from '@angular/forms/signals';

@Component({
  imports: [FormField],
  template: `
    <input [formField]="form.email" />
    @if (form.email().invalid() && form.email().touched()) {
      @for (err of form.email().errors(); track err.kind) {
        <p>{{ err.message }}</p>
      }
    }
    <button [disabled]="form().invalid()">Save</button>
  `,
})
export class LoginComponent {
  private model = signal({ email: '', password: '' });
  protected form = form(this.model, p => {
    required(p.email, { message: 'Email is required' });
    email(p.email, { message: 'Enter a valid email address' });
    required(p.password, { message: 'Password is required' });
  });
}
```

`form` is a class field (not a signal). The template binds to its sub-paths directly.

## Migrating an existing reactive form

When converting a `FormGroup`/`FormControl`/`Validators` form, work in this order. Do one form at a time — the two systems interop via `compatForm` (see Gotchas).

1. **Define the model type + signal.** Read the shape off the `fb.group(...)`; each control becomes a property. `private model = signal<T>({...})`.
2. **Move validators into the schema function.** Each `Validators.*` becomes a rule call; each custom `ValidatorFn` becomes a `validate(...)`. Attach messages at the rule (`required(p.email, { message })`).
3. **Swap template bindings.** `[formGroup]` + `formControlName="x"` → `[formField]="form.x"`. Replace the `ReactiveFormsModule` import with `FormField`.
4. **Replace `valueChanges` subscriptions with `computed()`.** `this.form.controls.country.valueChanges.subscribe(...)` → `computed(() => regionsFor(this.form.country().value()))`. This kills the manual cleanup.
5. **Replace `hasError()` ladders with the `errors()` array.** Render `form.x().errors()` in the template; the messages come from step 2.
6. **Fix the submit guard + payload.** `if (this.form.invalid)` → `if (this.form().invalid())`; `this.form.getRawValue()` → `this.model()`.

### Reactive → signal mapping

| Reactive forms | Signal forms |
|---|---|
| `fb.group({ email: [''] })` | `signal({ email: '' })` + `form(model, schema)` |
| `fb.nonNullable.group(...)` | a non-null `signal({...})` (model is plain TS) |
| `new FormControl<T>(initial)` | a typed field on the model object |
| `new FormArray([...])` | an array field + `applyEach` in the schema |
| `Validators.required` | `required(path, { message })` |
| `Validators.email` | `email(path, { message })` |
| `Validators.pattern(re)` | `pattern(path, re, { message })` |
| `Validators.min / max` | `min(path, n)` / `max(path, n)` |
| `Validators.minLength / maxLength` | `minLength(path, n)` / `maxLength(path, n)` |
| custom `ValidatorFn` | `validate(path, ctx => error \| null)` |
| group / cross-field validator | `validate(p, ...)` on the parent path |
| async validator | `validateAsync` / `validateHttp` |
| `formControlName="x"` | `[formField]="form.x"` |
| `form.controls.x.value` | `form.x().value()` |
| `form.controls.x.invalid` / `.touched` | `form.x().invalid()` / `.touched()` |
| `form.invalid` | `form().invalid()` |
| `form.valueChanges.subscribe(...)` | read in a `computed()` — no subscription |
| `patchValue / setValue` | `model.set(...)` / `model.update(...)` |
| `getRawValue()` | `model()` |
| `control.disable()` | `disabled(path, when?)` in the schema |
| `ControlValueAccessor` | `FormValueControl<T>` (or `FormCheckboxControl`) |

### Custom control migration — `ControlValueAccessor` → `FormValueControl`

Drop the `NG_VALUE_ACCESSOR` provider and the `writeValue` / `registerOnChange` / `registerOnTouched` trio. A custom input becomes "expose a `value` model":

```ts
// before — full CVA ritual (providers + 3 callbacks) … deleted
// after
@Component({ selector: 'app-rating' })
export class RatingComponent implements FormValueControl<number> {
  value = model<number>(0);          // the only required member
  touched = model<boolean>(false);   // optional
  disabled = input<boolean>(false);  // optional — auto-bound
}
```

Used the same way: `<app-rating [formField]="form.score" />`. See the leaf-control role below for the full optional-input list.

### Incremental migration with `compatForm`

`@angular/forms/signals/compat` lets a signal-forms model embed an existing reactive `FormGroup`/`FormControl`, so you can convert one field or section at a time. Reach for it only when you must keep a legacy control (e.g. a third-party widget that only speaks `ControlValueAccessor`); for new fields, go straight to native signal forms.

## Schema rules — quick reference

All rules attach to a `SchemaPath`. They take an options object `{ message, when }`.

| Rule | Notes |
|---|---|
| `required(path, opts?)` | empty `''` / null / NaN / false triggers. Empty `[]` is **not** caught — see Gotchas. |
| `email(path, opts?)` | standard email pattern |
| `pattern(path, regex, opts?)` | regex match |
| `min(path, n)` / `max(path, n)` | numeric bounds |
| `minLength(path, n)` / `maxLength(path, n)` | string/array length |
| `validate(path, ctx => result)` | custom sync validator — return `null`, an error, or an array of errors |
| `validateTree(path, ctx => result)` | validator for a whole sub-tree (errors carry their own `field`) |
| `validateAsync` / `validateHttp` | async checks |
| `disabled(path, when?)` / `readonly(path, when?)` / `hidden(path, when?)` | UI-state metadata, auto-reacted to by inputs |

### `when` predicates (cross-field)

`required` and friends accept `when: (ctx) => boolean`. `ctx.valueOf(otherPath)` reads other fields reactively:

```ts
required(p.shippingAddress, {
  when: ({ valueOf }) => valueOf(p.deliveryMethod) !== 'pickup',
  message: 'Address is required for delivery',
});
```

Go through `valueOf` — don't read the model signal directly inside `when`, or the framework won't track the dependency.

### Cross-field / tree-level validators

```ts
validate(p, ({ value }) => {
  const v = value();
  return v.password !== v.passwordConfirm
    ? { kind: 'passwordMismatch', message: 'Passwords do not match' }
    : null;
});
```

`validate` attaches an error to the path it's called on. `validateTree` lets you attach errors to *any* field within a sub-tree (each error specifies its `field`).

## The four composition roles

Every multi-component form decomposes into these four roles, plus a shared factory that ties them together. They nest arbitrarily.

| Role | Declares | Template binds |
|---|---|---|
| **Leaf control** | `value = model<T>()` | nothing — the parent binds it via `[formField]` |
| **Section** (object slice) | `value = model<T>()` + local `form(this.value, applyRules)` | `[formField]="form.subPath"` for inner inputs |
| **Array container** | `value = model<T[]>()` + thin `form(this.value)` (array-level rules only; never per-item) | `[formField]="form[i]"` per row |
| **Parent** | `form(model, p => applyRules(p.section))` / `applyEach(p.list, applyRules)` | `[formField]="form.section"` / `="form.list"` |
| **Shared factory** | `function applyRules<K extends PathKind>(p: SchemaPathTree<T, K>): void` | called from both section and parent |

## The shared schema factory (build this first)

When a slice's rules must exist in two scopes — the section's local form *and* the parent's form — write them once in a factory generic over `PathKind`:

```ts
// address-rules.ts
import { PathKind, required, pattern, SchemaPathTree } from '@angular/forms/signals';

interface Address { street: string; city: string; zip: string; }

export function applyAddressRules<K extends PathKind>(a: SchemaPathTree<Address, K>): void {
  required(a.street, { message: 'Street is required' });
  required(a.city, { message: 'City is required' });
  pattern(a.zip, /^\d{5}$/, { message: 'ZIP must be 5 digits' });
}
```

**`<K extends PathKind>` is load-bearing.** The same body has to run under `applyEach` (PathKind.Item) and under `form()` / `apply` (PathKind.Root or Child). Sub-path access (`a.street`) is identical across path kinds, so one generic body covers every call site. Hard-code the kind and the factory only works in one place.

## Role: Leaf control — `FormValueControl<T>`

A component that edits exactly one value. The framework auto-binds `value` (and any optional state inputs) when used with `[formField]`.

```ts
import { Component, model, input } from '@angular/core';
import { FormValueControl, ValidationError } from '@angular/forms/signals';

@Component({ selector: 'app-tag-input', template: `…` })
export class TagInputComponent implements FormValueControl<string> {
  value = model<string>('');                        // required by the interface
  errors = input<readonly ValidationError[]>([]);   // optional, auto-bound
  disabled = input<boolean>(false);                 // optional, auto-bound
  touched = model<boolean>(false);                  // optional — write to mark touched
}
```

```html
<app-tag-input [formField]="form.primaryTag" />
```

Only `value` is required. Optional inputs (`errors`, `disabled`, `readonly`, `invalid`, `touched`, `min`, `max`, `minLength`, `maxLength`, `pattern`) auto-bind if declared. For boolean checkbox-style components, implement `FormCheckboxControl` and expose `checked` instead of `value`.

## Role: Section — a child hosting several inputs over an object slice

**This is the part the official docs skip.** The pattern, in five beats:

1. The section implements `FormValueControl<T>` — declares **only** `value = model<T>()`.
2. It builds its **own local form** from `value`, applying the shared factory.
3. Its template binds inner inputs to its *local* `form.subPath`.
4. The parent has its own form and re-applies the **same factory** to its own sub-path.
5. Parent's `form().valid()` gates Save; the section's local form drives per-input UX inside it.

```ts
// address-section.component.ts
@Component({
  selector: 'app-address-section',
  imports: [FormField],
  template: `
    <input [formField]="form.street" />
    <input [formField]="form.city" />
    <input [formField]="form.zip" />
  `,
})
export class AddressSectionComponent implements FormValueControl<Address> {
  value = model<Address>({ street: '', city: '', zip: '' });
  protected form = form(this.value, applyAddressRules);
}
```

```ts
// checkout-form.component.ts — the parent
@Component({
  imports: [FormField, AddressSectionComponent],
  template: `
    <app-address-section [formField]="form.shipping" />
    <button [disabled]="form().invalid()">Place order</button>
  `,
})
export class CheckoutFormComponent {
  private model = signal<Checkout>({ shipping: { street: '', city: '', zip: '' } });
  protected form = form(this.model, c => {
    applyAddressRules(c.shipping);   // same factory, parent scope
  });
}
```

`[formField]="form.shipping"` **syncs `value` between the parent's `form.shipping` field and the section's `value` model** — two views over the same data. Both forms validate it independently. The rules being "applied twice" is intentional: two independent forms each validate what they're responsible for, and the factory keeps the *code* to one line per scope so nothing drifts.

## Role: Array container + row

For a list of complex rows, split responsibility across three levels:

- The **row** owns the per-item schema (each row gets its own UX).
- The **container** is a *thin* `FieldTree` whose only job is indexing rows — **no** per-item rules.
- The **grandparent** re-applies the per-item schema via `applyEach`, so its `form().valid()` gates Save.

```ts
// shared per-item factory
export function applyLineItemRules<K extends PathKind>(item: SchemaPathTree<LineItem, K>): void {
  required(item.sku, { message: 'SKU required' });
  min(item.qty, 1, { message: 'Qty must be at least 1' });
}
```

```ts
// row component — owns the per-item schema
export class LineItemRowComponent implements FormValueControl<LineItem> {
  value = model<LineItem>({ id: '', sku: '', qty: 0 });
  protected form = form(this.value, applyLineItemRules);
}
```

```ts
// container — thin typed FieldTree, NO per-item schema
@Component({
  imports: [FormField, LineItemRowComponent],
  template: `
    @for (item of value(); track item.id; let i = $index) {
      <app-line-item-row [formField]="form[i]" />
    }
    <button (click)="add()">+ Add row</button>
  `,
})
export class LineItemListComponent implements FormValueControl<LineItem[]> {
  value = model<LineItem[]>([]);
  protected form = form(this.value);   // thin — rows + grandparent own the rules

  add() { this.value.update(items => [...items, blankRow()]); }
}
```

```ts
// grandparent — re-applies per-item rules so its form().valid() gates save
protected form = form(this.model, p => applyEach(p.lineItems, applyLineItemRules));
// template: <app-line-item-list [formField]="form.lineItems" />
```

**Why the container stays thin:** if it also applied `applyLineItemRules`, the same validators would run three times on every keystroke (row + container + grandparent). Rules on the **array itself** (e.g. `minLength` to require one row) belong *only* on the container, because no row owns them:

```ts
protected form = form(this.value, p => minLength(p, 1, { message: 'Add at least one row' }));
```

## Reading state in templates / computeds

```ts
form().valid()              // top-level validity
form.email().invalid()     // sub-field invalid
form.email().errors()      // sub-field errors
form.email().touched()     // user has blurred it
form.items().value()       // current array

protected hasErrors = computed(() => form().errors().length > 0);
```

## Gotchas

- **`required()` doesn't recognise empty arrays.** Its emptiness check covers `'' / false / null / NaN`. For `T[]` paths, add `validate(path, ({ value }) => value().length === 0 ? {…} : null)` alongside it.
- **Calling vs. sub-path.** `form.email` (FieldTree) is what you pass to `[formField]`. `form.email()` (FieldState) is for reading. Not interchangeable.
- **`when` reactivity.** Read dependencies via `ctx.valueOf(path)`, not the model signal directly, so the framework tracks them.
- **Model identity matters.** `form(model, …)` binds to the *signal instance*. Reassigning (`this.model = signal(newData)`) leaves the FieldTree pointing at the old one. Mutate via `.set` / `.update`.
- **`AbstractControl` interop.** Use `compatForm` (from `@angular/forms/signals/compat`) to embed a reactive-forms `FormGroup`/`FormControl` inside a signal-form model. Don't reach for it unless you have an existing reactive control to keep.

## Common mistakes

| Mistake | Why it's wrong | Fix |
|---|---|---|
| Section declares **both** `formField = input.required<FieldTree<T>>()` *and* `value = model<T>()` | Triggers passthrough mode — `value` becomes dead weight or you get two sync paths over the same data | Drop the input. Only declare `value`; build a local `form(this.value, …)`. |
| `inject(FORM_FIELD)` inside a section to grab the parent's tree | The `FormValueControl` contract doesn't expose the tree by design; couples you to directive internals | Build the section's own local form from `value`. |
| `[formField]="form().subPath"` (parens before sub-path) | `form()` is state, not the tree | `[formField]="form.subPath"` — no parens. |
| Skipping the parent's schema; relying on the section's local form alone | Parent's `form().valid()` never sees the rules — save gate breaks | Re-apply the shared factory in the parent. |
| Skipping the section's local form; relying on the parent's alone | Inner inputs lose `required`/`errors`/`disabled` state — UX breaks | The section needs its own local form. |
| Factory hard-coded to one `PathKind` | Can't be used in both `applyEach` (Item) and `form()` / `apply` (Root) | Make it generic: `<K extends PathKind>`. |
| Inline schema duplicated verbatim in parent and section | Adding a rule in one place silently won't propagate | One factory, called from both. |
| Array container re-applies the row's per-item rules | Same validators run 3× per keystroke | Thin container `form(this.value)`; only array-level rules go here. |
| `effect()` mirroring a form value into another signal | Re-derives state imperatively; the form's signals are already the source | `computed(() => form.field().value())`. |

## Red flags — stop if you catch yourself doing any of these

- Declaring `formField = input.required<FieldTree<T>>()` on a component that also implements `FormValueControl<T>`.
- Calling `inject(FORM_FIELD)` inside a section component.
- Writing `[formField]="form().subPath"` (state-then-sub).
- Reassigning the model signal (`this.model = signal(newData)`) instead of `.set` / `.update`.
- Re-implementing value sync with `(valueChange)` emitters instead of `[formField]`.

Each breaks one of the four composition roles. Go back to the role table.
