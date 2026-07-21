/**
 * Type surface for the Angular signal-based Autocomplete.
 * Mirrors MUI's `useAutocomplete` / `<Autocomplete />` API.
 */

export interface FilterOptionsState<T> {
  readonly inputValue: string;
  readonly getOptionLabel: (option: T) => string;
}

export type FilterOptionsFn<T> = (
  options: readonly T[],
  state: FilterOptionsState<T>,
) => T[];

/** Why the selected value changed. */
export type ChangeReason =
  | 'createOption'
  | 'selectOption'
  | 'removeOption'
  | 'clear'
  | 'blur';

/** Why the text in the box changed. */
export type InputChangeReason =
  | 'input'
  | 'reset'
  | 'clear'
  | 'blur'
  | 'selectOption'
  | 'removeOption';

export type CloseReason =
  | 'toggleInput'
  | 'escape'
  | 'selectOption'
  | 'removeOption'
  | 'blur';

export type OpenReason = 'toggleInput' | 'focus' | 'input' | 'keyboard';

/** Visual style of the field. */
export type NgAutocompleteAppearance = 'fill' | 'outline';

export type HighlightChangeReason = 'keyboard' | 'mouse' | 'auto' | 'touch';

export interface NgAutocompleteChange<T> {
  readonly value: T | readonly T[] | null;
  readonly reason: ChangeReason;
  readonly option?: T;
}

export interface NgAutocompleteInputChange {
  readonly value: string;
  readonly reason: InputChangeReason;
}

/** A group header plus the flat indices of the options beneath it. */
export interface OptionGroup<T> {
  readonly key: number;
  readonly group: string;
  readonly options: readonly RenderedOption<T>[];
}

/**
 * An option paired with its index in the *flat* filtered list.
 * The flat index is what `highlightedIndex` and `aria-activedescendant` refer to,
 * so grouping never desynchronises keyboard navigation.
 */
export interface RenderedOption<T> {
  readonly option: T;
  readonly index: number;
  readonly key: string | number;
  readonly label: string;
  readonly disabled: boolean;
  readonly selected: boolean;
}

/**
 * Every behavioural flag MUI exposes. The component resolves its `input()`
 * signals into one of these and hands it to the headless state as a computed.
 */
export interface NgAutocompleteConfig<T> {
  // identity & labels
  getOptionLabel: (option: T) => string;
  getOptionKey: (option: T) => string | number;
  getOptionDisabled: (option: T) => boolean;
  isOptionEqualToValue: (option: T, value: T) => boolean;
  groupBy: ((option: T) => string) | null;
  filterOptions: FilterOptionsFn<T>;

  // modes
  multiple: boolean;
  freeSolo: boolean;
  disabled: boolean;
  readOnly: boolean;
  loading: boolean;

  // behaviour flags (all default to MUI's defaults)
  autoComplete: boolean;
  autoHighlight: boolean;
  autoSelect: boolean;
  blurOnSelect: boolean | 'mouse' | 'touch';
  clearOnBlur: boolean;
  clearOnEscape: boolean;
  disableClearable: boolean;
  disableCloseOnSelect: boolean;
  disabledItemsFocusable: boolean;
  disableListWrap: boolean;
  filterSelectedOptions: boolean;
  handleHomeEndKeys: boolean;
  includeInputInList: boolean;
  openOnFocus: boolean;
  resetHighlightOnMouseLeave: boolean;
  selectOnFocus: boolean;

  /** Options that cannot be removed while `multiple` is on. */
  fixedOptions: readonly T[];

  /**
   * Single-select + a projected `ngValue` template + a selected value: render
   * one chip in place of the text mirror (MUI's single-value custom render).
   */
  singleChip: boolean;
}

/** Arbitrary `class` + attribute pass-through for one slot element. */
export type NgSlotProp = { class?: string } & Record<string, string | number | boolean>;

/**
 * Per-element `class`/attribute overrides, mirroring MUI's `slotProps`.
 * `class` is merged into the element's class list; every other key is
 * applied as an attribute (e.g. `data-*`, `aria-*`).
 */
export interface NgAutocompleteSlotProps {
  root?: NgSlotProp;
  input?: NgSlotProp;
  listbox?: NgSlotProp;
  paper?: NgSlotProp;
  clearIndicator?: NgSlotProp;
  popupIndicator?: NgSlotProp;
}

export const DEFAULT_CONFIG: NgAutocompleteConfig<unknown> = {
  getOptionLabel: (option: unknown) => {
    if (typeof option === 'string') return option;
    const label = (option as { label?: unknown } | null)?.label;
    if (typeof label === 'string') return label;
    return label != null ? String(label) : option != null ? String(option) : '';
  },
  getOptionKey: (option: unknown) => DEFAULT_CONFIG.getOptionLabel(option),
  getOptionDisabled: () => false,
  isOptionEqualToValue: (a: unknown, b: unknown) => a === b,
  groupBy: null,
  filterOptions: null as unknown as FilterOptionsFn<unknown>, // filled by the state
  multiple: false,
  freeSolo: false,
  disabled: false,
  readOnly: false,
  loading: false,
  autoComplete: false,
  autoHighlight: false,
  autoSelect: false,
  blurOnSelect: false,
  clearOnBlur: false, // MUI: !freeSolo — resolved at runtime
  clearOnEscape: false,
  disableClearable: false,
  disableCloseOnSelect: false,
  disabledItemsFocusable: false,
  disableListWrap: false,
  filterSelectedOptions: false,
  handleHomeEndKeys: false, // MUI: !freeSolo — resolved at runtime
  includeInputInList: false,
  openOnFocus: false,
  resetHighlightOnMouseLeave: false,
  selectOnFocus: false,
  fixedOptions: [],
  singleChip: false,
};
