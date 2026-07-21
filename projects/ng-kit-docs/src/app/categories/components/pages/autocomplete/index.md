
Accessible, signal-based autocomplete/combobox composed with Angular Material (`mat-form-field`, `matInput`, `mat-chips`). The field chrome is Material; the behaviour (filtering, grouping, keyboard navigation, ARIA, single/multiple/free-solo selection) is driven by a headless signal state machine with an API that mirrors MUI's `useAutocomplete`. Implements `ControlValueAccessor`, so it plugs into reactive forms.

## Usage

{{ NgDocActions.demo("AutocompleteOpenInStackblitzComponent", { container: false }) }}

Import and use `AutocompleteComponent` in your standalone component:

```typescript
import { Component } from '@angular/core';
import { AutocompleteComponent } from '@js-smart/ng-kit';

@Component({
  selector: 'app-autocomplete-demo',
  imports: [AutocompleteComponent],
  template: `
    <autocomplete
      label="Search"
      placeholder="Type to search..."
      appearance="fill"
      [options]="options"
      [getOptionLabel]="displayFn"
      (valueChanged)="onSelected($event)"
    ></autocomplete>
  `
})
export class AutocompleteDemoComponent {
  options = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Cherry' }
  ];

  displayFn = (option: { id: number; name: string }): string => option?.name ?? '';

  onSelected(event: { value: unknown; reason: string; option?: unknown }) {
    // event.value is the selected option (or array when [multiple]); event.reason explains why it changed
  }
}
```

> `getOptionLabel` replaces the previous `displayWith` input, and selection is now reported through the `valueChanged` output (`{ value, reason, option }`) instead of `selectionChange`. The old `classes` input has been removed — pass per-element classes/attributes through `slotProps` instead.

---

## Loading State

Show a spinner and message while data is being fetched asynchronously:

```typescript
@Component({
  selector: 'app-loading-demo',
  imports: [AutocompleteComponent],
  template: `
    <autocomplete
      [options]="cities()"
      [loading]="isLoading()"
      [getOptionLabel]="displayFn"
      loadingText="Fetching cities..."
      label="City"
      placeholder="Select City"
    ></autocomplete>
  `
})
export class LoadingDemoComponent {
  isLoading = signal(true);
  cities = signal<{ id: number; name: string }[]>([]);

  displayFn = (option: { id: number; name: string }): string => option?.name ?? '';

  constructor() {
    setTimeout(() => {
      this.cities.set([
        { id: 1, name: 'New York' },
        { id: 2, name: 'Boston' },
      ]);
      this.isLoading.set(false);
    }, 3000);
  }
}
```

---

## Disabled State

Disable the autocomplete via reactive forms:

```typescript
@Component({
  selector: 'app-disabled-demo',
  imports: [AutocompleteComponent, ReactiveFormsModule],
  template: `
    <form [formGroup]="form">
      <autocomplete
        [options]="options"
        [getOptionLabel]="displayFn"
        formControlName="city"
        label="City"
      ></autocomplete>
    </form>
    <button (click)="toggleDisabled()">
      {% raw %}{{ form.get('city')?.disabled ? 'Enable' : 'Disable' }}{% endraw %}
    </button>
  `
})
export class DisabledDemoComponent {
  options = [
    { id: 1, name: 'New York' },
    { id: 2, name: 'Boston' },
  ];

  displayFn = (option: { id: number; name: string }): string => option?.name ?? '';

  form = this.fb.group({
    city: new FormControl({ value: this.options[0], disabled: true }),
  });

  constructor(private fb: FormBuilder) {}

  toggleDisabled(): void {
    const control = this.form.get('city');
    control?.disabled ? control.enable() : control?.disable();
  }
}
```

---

## Multiple Selection

Set `[multiple]="true"` to render selected values as removable Material chips. Use `limitTags` to collapse overflow:

```html
<autocomplete
  [options]="options"
  [getOptionLabel]="displayFn"
  [multiple]="true"
  [limitTags]="2"
  label="Cities"
></autocomplete>
```

---

## No Options Text

Customize the message shown when no options match the user's input (defaults to `No options`):

```html
<autocomplete
  [options]="options"
  noOptionsText="No results found"
  label="Search"
></autocomplete>
```

---

## Custom Rendering

Project templates to override any slot. Each directive receives a typed context:

```html
<autocomplete [options]="options" [getOptionLabel]="displayFn">
  <!-- Custom option row; context: $implicit (option), option, highlighted, selected, query -->
  <span *ngOption="let item; highlighted as hl">{{ item.name }}</span>

  <!-- Others: *ngGroupHeader, *ngValue, *ngEmpty, *ngLoading, *ngPopupIcon, *ngClearIcon, *ngPaper -->
  <span *ngEmpty>Nothing here</span>
</autocomplete>
```

---

## API Reference

### Selectors
- `autocomplete`
- `lib-autocomplete`

### Key Inputs
| Name                 | Type                              | Default        | Description                                                                 |
|----------------------|-----------------------------------|----------------|-----------------------------------------------------------------------------|
| `options`            | `readonly T[]` (required)         | —              | Options to display in the dropdown                                          |
| `value`              | `T \| T[] \| null` (model)        | `null`         | Two-way selected value (`T[]` when `multiple`)                              |
| `inputValue`         | `string` (model)                  | `''`           | Two-way text in the input                                                   |
| `open`               | `boolean` (model)                 | `false`        | Two-way popup open state                                                    |
| `getOptionLabel`     | `(option: T) => string`           | label/`String` | Maps an option to its display string                                        |
| `getOptionDisabled`  | `(option: T) => boolean`          | `() => false`  | Marks individual options as disabled                                        |
| `isOptionEqualToValue` | `(a: T, b: T) => boolean`        | `===`          | Equality used to match values against options                              |
| `groupBy`            | `((option: T) => string) \| null` | `null`         | Group options under sticky headers                                          |
| `filterOptions`      | `FilterOptionsFn<T>`              | default filter | Custom filtering (see `createFilterOptions`)                               |
| `multiple`           | `boolean`                         | `false`        | Render selected values as removable chips                                   |
| `freeSolo`           | `boolean`                         | `false`        | Allow arbitrary typed values                                               |
| `loading`            | `boolean`                         | `false`        | Show a loading indicator instead of options                                |
| `label` / `placeholder` | `string \| null`               | `null`         | Field label / input placeholder                                            |
| `appearance`         | `'fill' \| 'outline'`             | `'fill'`       | Material form-field appearance                                             |
| `size`               | `'small' \| 'medium'`             | `'medium'`     | Field density                                                              |
| `limitTags`          | `number`                          | `-1`           | Max chips shown before collapsing (multiple)                              |
| `loadingText`        | `string`                          | `'Loading…'`   | Text shown while `loading`                                                 |
| `noOptionsText`      | `string`                          | `'No options'` | Text shown when nothing matches                                            |
| `clearText` / `openText` / `closeText` | `string`        | `'Clear'` / `'Open'` / `'Close'` | `aria-label`s for the clear and toggle buttons        |
| `virtualize`         | `boolean`                         | `false`        | Virtual-scroll the option list (CDK)                                       |
| `slotProps`          | `NgAutocompleteSlotProps`         | `{}`           | Per-element `class`/attribute pass-through                                 |

Additional behaviour flags mirror MUI: `autoComplete`, `autoHighlight`, `autoSelect`, `blurOnSelect`, `clearOnBlur`, `clearOnEscape`, `disableClearable`, `disableCloseOnSelect`, `disableListWrap`, `disablePortal`, `filterSelectedOptions`, `handleHomeEndKeys`, `includeInputInList`, `openOnFocus`, `selectOnFocus`, `fixedOptions`, `showCheckboxes`, `forcePopupIcon`, `fullWidth`, and more — see the exported types.

### Outputs
| Name                | Payload                                            | Description                                  |
|---------------------|----------------------------------------------------|----------------------------------------------|
| `valueChanged`      | `{ value; reason; option? }`                       | Selected value changed                       |
| `inputChanged`      | `{ value: string; reason }`                        | Input text changed                           |
| `opened`            | `OpenReason`                                        | Popup opened                                 |
| `closed`            | `CloseReason`                                       | Popup closed                                 |
| `highlightChanged`  | `{ option: T \| null; reason }`                    | Highlighted option changed                   |

### Content template directives
`*ngOption`, `*ngGroupHeader`, `*ngValue`, `*ngEmpty`, `*ngLoading`, `*ngPopupIcon`, `*ngClearIcon`, `*ngPaper` — project a template to customize each slot.

### Helpers & state
`createFilterOptions`, `defaultFilterOptions`, `passThroughFilter` build a `filterOptions` function; `NgAutocompleteState` is the headless state machine used internally and can be reused for fully custom UIs.

---

## Notes
- Composed with Angular Material (`mat-form-field`, `matInput`, `mat-chips`, `mat-icon-button`) — requires `@angular/material`, `@angular/cdk`, and `@angular/forms` as peer dependencies.
- State is signal-based; `value`, `inputValue`, and `open` are two-way `model()` signals.
- Implements `ControlValueAccessor`, so `[disabled]`/`disable()`/`enable()` work through a `FormControl` rather than a `disabled` input.
- Default clear and dropdown icons are inline SVG — no icon-font dependency.
- Tree-shakable: only imported features are included in your bundle.

---

## Accessibility
Implements the WAI-ARIA combobox pattern with `role="combobox"`/`listbox`/`option`, `aria-activedescendant`, and full keyboard support (arrows, Home/End, PageUp/Down, Enter, Escape, Backspace for chips). Clear and toggle buttons expose `aria-label`s (`clearText`/`openText`/`closeText`). When disabled, the clear affordance leaves the accessibility tree and the dropdown toggle is disabled.

---

## Troubleshooting
1. Ensure your Angular version is 22 or higher, and that `@angular/material`, `@angular/cdk`, and `@angular/forms` are installed.
2. Check for peer dependency warnings during install.
3. If the field does not render, verify an Angular Material theme is loaded in your app.
4. If the dropdown appears in the wrong place, ensure Angular CDK overlay styles (`@angular/cdk/overlay-prebuilt.css` or a Material theme) are included.
