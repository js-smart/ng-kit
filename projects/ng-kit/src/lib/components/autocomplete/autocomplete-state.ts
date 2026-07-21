import {
  computed,
  linkedSignal,
  signal,
  untracked,
  type Signal,
  type WritableSignal,
} from '@angular/core';
import { defaultFilterOptions } from './create-filter-options';
import type {
  NgAutocompleteConfig,
  ChangeReason,
  CloseReason,
  HighlightChangeReason,
  InputChangeReason,
  OpenReason,
  OptionGroup,
  RenderedOption,
} from './autocomplete.types';

export interface NgAutocompleteStateEvents<T> {
  change?(value: T | readonly T[] | null, reason: ChangeReason, option?: T): void;
  inputChange?(value: string, reason: InputChangeReason): void;
  opened?(reason: OpenReason): void;
  closed?(reason: CloseReason): void;
  highlightChange?(option: T | null, reason: HighlightChangeReason): void;
  /** State has decided the input should lose focus (`blurOnSelect`). */
  requestBlur?(): void;
}

export interface NgAutocompleteStateDeps<T> {
  /** The full, unfiltered option list. */
  options: Signal<readonly T[]>;
  /** Two-way selected value. `T | null` when single, `T[]` when multiple. */
  value: WritableSignal<T | readonly T[] | null>;
  /** Two-way text in the box. Deliberately independent of `value`, as in MUI. */
  inputValue: WritableSignal<string>;
  /** Two-way open state (controllable from the host). */
  open: WritableSignal<boolean>;
  /** All behavioural flags, already resolved with defaults. */
  config: Signal<NgAutocompleteConfig<T>>;
  events?: NgAutocompleteStateEvents<T>;
}

/**
 * The whole combobox behaviour, with zero rendering opinions.
 *
 * Every piece of derived data is a `computed`, so filtering, grouping and
 * highlight bookkeeping all stay consistent without manual invalidation —
 * and unlike React you never need to memoise the value you pass in.
 */
export class NgAutocompleteState<T> {
  private readonly deps: NgAutocompleteStateDeps<T>;
  readonly inputValue: WritableSignal<string>;
  readonly value: WritableSignal<T | readonly T[] | null>;
  /** Two-way open state, delegated to the host's dep. */
  readonly open: WritableSignal<boolean>;

  constructor(deps: NgAutocompleteStateDeps<T>) {
    this.deps = deps;
    this.inputValue = deps.inputValue;
    this.value = deps.value;
    this.open = deps.open;
  }

  // ── raw state ────────────────────────────────────────────────────────────
  readonly focused = signal(false);
  /** Index of the focused chip in multiple mode, or -1 for the text input. */
  readonly focusedItemIndex = signal(-1);
  /** True from open until the first real keystroke. useAutocomplete:241 */
  readonly inputPristine = signal(true);

  /**
   * Touch-interaction tracking (useAutocomplete "compat" touch handling,
   * simplified — see `handleOptionTouchStart`/`notifyScroll`). MUI tracks a
   * synthetic compat mouse event that browsers fire after a real touch and
   * suppresses it; reproducing that exactly is impractical under jsdom, so
   * here we keep the two externally-observable behaviours it protects:
   * (1) a highlight set by touch, then invalidated by a scroll before the
   * user lifts their finger, must not be selected on a stray Enter, and
   * (2) `blurOnSelect: 'touch' | 'mouse'` resolves against how the option
   * was actually activated.
   */
  readonly isTouch = signal(false);
  /** Set once a touch-highlighted option's list has scrolled underneath it. */
  readonly touchScrolled = signal(false);

  readonly cfg = computed(() => this.deps.config());

  /** MUI `dirty` (useAutocomplete:1365-1366): freeSolo typed text OR a selected value. */
  readonly dirty = computed(() => {
    const c = this.cfg();
    if (c.freeSolo && this.deps.inputValue().length > 0) return true;
    return this.hasValue();
  });

  // ── derived: selection ───────────────────────────────────────────────────
  /** Current selection normalised to an array, whatever the mode. */
  readonly selectedValues = computed<readonly T[]>(() => {
    const v = this.deps.value();
    if (v == null) return [];
    return Array.isArray(v) ? (v as readonly T[]) : [v as T];
  });

  readonly hasValue = computed(() => this.selectedValues().length > 0);

  readonly clearVisible = computed(() => {
    const c = this.cfg();
    return !c.disableClearable && !c.disabled && !c.readOnly && this.dirty();
  });

  // ── derived: option list ─────────────────────────────────────────────────
  /**
   * The text actually used for filtering. In single-select, once a value is
   * chosen and the box shows its label, MUI stops filtering so reopening the
   * popup shows the whole list again.
   */
  private readonly filterQuery = computed(() => {
    const c = this.cfg();
    const input = this.deps.inputValue();
    if (c.multiple) return input;
    const selected = this.selectedValues()[0];
    const isSelectedLabel = selected !== undefined && input === c.getOptionLabel(selected);
    if (isSelectedLabel && this.inputPristine()) return '';
    return input;
  });

  private readonly filtered = computed<readonly T[]>(() => {
    const c = this.cfg();
    const filter = c.filterOptions ?? (defaultFilterOptions as never);
    const source = c.filterSelectedOptions
      ? this.deps
          .options()
          .filter((o) => !this.selectedValues().some((v) => c.isOptionEqualToValue(o, v)))
      : this.deps.options();

    return filter(source, {
      inputValue: this.filterQuery(),
      getOptionLabel: c.getOptionLabel,
    });
  });

  /** Flat list — the single source of truth for indices and `aria-activedescendant`. */
  readonly flatOptions = computed<readonly RenderedOption<T>[]>(() => {
    const c = this.cfg();
    return this.filtered().map((option, index) => ({
      option,
      index,
      key: c.getOptionKey(option),
      label: c.getOptionLabel(option),
      disabled: c.getOptionDisabled(option),
      selected: this.selectedValues().some((v) => c.isOptionEqualToValue(option, v)),
    }));
  });

  /** Grouped view. Options must already be sorted by the group key, same as MUI. */
  readonly groups = computed<readonly OptionGroup<T>[]>(() => {
    const groupBy = this.cfg().groupBy;
    if (!groupBy) return [];
    const out: OptionGroup<T>[] = [];
    for (const item of this.flatOptions()) {
      const group = groupBy(item.option);
      const last = out.at(-1);
      if (last && last.group === group) {
        (last.options as RenderedOption<T>[]).push(item);
      } else {
        out.push({ key: item.index, group, options: [item] });
      }
    }
    return out;
  });

  readonly isEmpty = computed(() => this.flatOptions().length === 0);

  /** Whether the listbox should actually be on screen. */
  readonly listboxVisible = computed(() => {
    const c = this.cfg();
    if (!this.open() || c.disabled) return false;
    if (c.readOnly) return false;
    if (!this.isEmpty()) return true;
    return c.loading || !c.freeSolo; // show "no options" unless free solo
  });

  // ── derived: highlight ───────────────────────────────────────────────────
  /**
   * Resets whenever the filtered list changes, but keeps pointing at the same
   * option when that option survived the change. `linkedSignal` gives us the
   * previous value for free — no effect, no manual sync.
   */
  readonly highlightedIndex = linkedSignal<readonly RenderedOption<T>[], number>({
    source: () => this.flatOptions(),
    computation: (options, previous) => {
      if (options.length === 0) return -1;
      const c = untracked(() => this.cfg());
      const prevOption = previous?.source?.[previous.value];
      if (prevOption) {
        const stillThere = options.findIndex((o) =>
          c.isOptionEqualToValue(o.option, prevOption.option),
        );
        if (stillThere !== -1) return stillThere;
      }
      if (c.autoHighlight) return this.firstEnabled(options, c);
      return -1;
    },
  });

  readonly highlightedOption = computed<RenderedOption<T> | null>(
    () => this.flatOptions()[this.highlightedIndex()] ?? null,
  );

  /**
   * Inline completion text for `autoComplete` — the highlighted label when it
   * extends what the user typed. The component writes it into the DOM input
   * and selects the appended part.
   */
  readonly inlineCompletion = computed<string | null>(() => {
    const c = this.cfg();
    if (!c.autoComplete || !this.open()) return null;
    const highlighted = this.highlightedOption();
    const typed = this.deps.inputValue();
    if (!highlighted || !typed) return null;
    const label = highlighted.label;
    return label.toLowerCase().startsWith(typed.toLowerCase()) && label !== typed
      ? label
      : null;
  });

  // ── open / close ─────────────────────────────────────────────────────────
  openPopup(reason: OpenReason): void {
    const c = this.cfg();
    if (this.open() || c.disabled || c.readOnly) return;
    this.open.set(true);
    this.inputPristine.set(true);
    this.deps.events?.opened?.(reason);
  }

  closePopup(reason: CloseReason): void {
    if (!this.open()) return;
    this.open.set(false);
    this.deps.events?.closed?.(reason);
  }

  togglePopup(): void {
    if (this.open()) this.closePopup('toggleInput');
    else this.openPopup('toggleInput');
  }

  // ── highlight movement ───────────────────────────────────────────────────
  /** Last highlight cause; null = programmatic (autoHighlight / value sync). useAutocomplete:174 */
  readonly highlightReason = signal<HighlightChangeReason | null>(null);

  setHighlight(index: number, reason: HighlightChangeReason | null): void {
    this.highlightedIndex.set(index);
    this.highlightReason.set(reason);
    // useAutocomplete:461 — only user interactions notify.
    if (reason === 'mouse' || reason === 'keyboard' || reason === 'touch') {
      this.deps.events?.highlightChange?.(this.flatOptions()[index]?.option ?? null, reason);
    }
  }

  /** A finger touched down on an option row: highlight it as a touch highlight. */
  handleOptionTouchStart(index: number): void {
    this.touchScrolled.set(false);
    this.setHighlight(index, 'touch');
    this.isTouch.set(true);
  }

  /** The listbox scrolled — any touch-highlight in flight is now stale. */
  notifyScroll(): void {
    if (this.isTouch()) this.touchScrolled.set(true);
  }

  /**
   * `diff` is a step (±1, ±5) or a landmark. Honours `disableListWrap`,
   * `includeInputInList` and `disabledItemsFocusable`.
   */
  moveHighlight(diff: number | 'start' | 'end' | 'reset'): void {
    if (!this.open()) this.openPopup('keyboard');
    const options = this.flatOptions();
    const c = this.cfg();
    if (options.length === 0) return;

    if (diff === 'reset') {
      this.setHighlight(c.autoHighlight ? this.firstEnabled(options, c) : -1, null);
      return;
    }
    if (diff === 'start') {
      this.setHighlight(this.firstEnabled(options, c), 'keyboard');
      return;
    }
    if (diff === 'end') {
      this.setHighlight(this.lastEnabled(options, c), 'keyboard');
      return;
    }

    const min = c.includeInputInList ? -1 : 0;
    const max = options.length - 1;
    const current = this.highlightedIndex();
    let next = current + diff;

    if (next > max) next = c.disableListWrap ? max : min;
    else if (next < min) next = c.disableListWrap ? min : max;

    // Skip disabled entries in the direction of travel.
    const step = diff > 0 ? 1 : -1;
    let guard = options.length + 1;
    while (
      guard-- > 0 &&
      next >= 0 &&
      options[next]?.disabled &&
      !c.disabledItemsFocusable
    ) {
      next += step;
      if (next > max) next = c.disableListWrap ? current : min;
      else if (next < min) next = c.disableListWrap ? current : max;
    }
    this.setHighlight(next, 'keyboard');
  }

  private firstEnabled(options: readonly RenderedOption<T>[], c: NgAutocompleteConfig<T>): number {
    if (c.disabledItemsFocusable) return options.length ? 0 : -1;
    const i = options.findIndex((o) => !o.disabled);
    return i;
  }

  private lastEnabled(options: readonly RenderedOption<T>[], c: NgAutocompleteConfig<T>): number {
    if (c.disabledItemsFocusable) return options.length - 1;
    for (let i = options.length - 1; i >= 0; i--) if (!options[i].disabled) return i;
    return -1;
  }

  // ── value mutation ───────────────────────────────────────────────────────
  isSelected(option: T): boolean {
    const c = this.cfg();
    return this.selectedValues().some((v) => c.isOptionEqualToValue(option, v));
  }

  isFixed(option: T): boolean {
    const c = this.cfg();
    return c.fixedOptions.some((v) => c.isOptionEqualToValue(option, v));
  }

  selectOption(option: T, reason: ChangeReason = 'selectOption'): void {
    const c = this.cfg();
    if (c.disabled || c.readOnly) return;
    if (c.getOptionDisabled(option) && reason !== 'createOption') return;

    if (c.multiple) {
      const current = [...this.selectedValues()];
      const at = current.findIndex((v) => c.isOptionEqualToValue(option, v));
      if (at === -1) {
        current.push(option);
        this.commit(current, reason, option);
      } else if (!this.isFixed(current[at])) {
        current.splice(at, 1);
        this.commit(current, 'removeOption', option);
      }
      this.setInputValue('', 'selectOption');
    } else {
      this.commit(option, reason, option);
      this.setInputValue(c.getOptionLabel(option), 'selectOption');
    }

    if (!c.disableCloseOnSelect) this.closePopup('selectOption');

    const blur = c.blurOnSelect;
    if (blur === true || (blur === 'touch' && this.isTouch()) || (blur === 'mouse' && !this.isTouch())) {
      this.deps.events?.requestBlur?.();
    }
    this.isTouch.set(false);
  }

  removeValueAt(index: number): void {
    const c = this.cfg();
    if (c.disabled || c.readOnly) return;
    const current = [...this.selectedValues()];
    const removed = current[index];
    if (removed === undefined || this.isFixed(removed)) return;
    current.splice(index, 1);
    this.commit(current, 'removeOption', removed);
    this.focusedItemIndex.set(-1);
  }

  clear(): void {
    const c = this.cfg();
    if (c.disabled || c.readOnly) return;
    // Fixed options survive a clear.
    const next = c.multiple ? [...c.fixedOptions] : null;
    this.commit(next, 'clear');
    this.setInputValue('', 'clear');
    this.focusedItemIndex.set(-1);
  }

  private commit(next: T | readonly T[] | null, reason: ChangeReason, option?: T): void {
    this.deps.value.set(next);
    this.deps.events?.change?.(next, reason, option);
  }

  // ── input handling ───────────────────────────────────────────────────────
  setInputValue(text: string, reason: InputChangeReason): void {
    if (untracked(this.deps.inputValue) === text && reason !== 'input') return;
    this.deps.inputValue.set(text);
    this.deps.events?.inputChange?.(text, reason);
  }

  handleInput(text: string): void {
    const c = this.cfg();
    const changed = untracked(this.deps.inputValue) !== text;
    this.setInputValue(text, 'input');
    if (text === '') {
      if (!c.multiple && !c.disableClearable && !c.freeSolo) {
        this.commit(null, 'clear');
      }
    } else {
      this.openPopup('input');
    }
    this.focusedItemIndex.set(-1);
    if (changed) this.inputPristine.set(false);
  }

  /** Push the input text back in sync with the current selection. */
  resetInputValue(reason: InputChangeReason = 'reset'): void {
    const c = this.cfg();
    if (c.multiple) {
      this.setInputValue('', reason);
      return;
    }
    const selected = this.selectedValues()[0];
    this.setInputValue(selected === undefined ? '' : c.getOptionLabel(selected), reason);
  }

  // ── focus / blur ─────────────────────────────────────────────────────────
  /** Set when the whole browser window (not just this control) lost focus. */
  private readonly windowLostFocus = signal(false);
  /** VoiceOver re-dispatches a synthetic Backspace right after a chip delete; ignore one. */
  private ignoreNextBackspace = false;

  /** Call from a `window` `blur` listener. Suppresses the next `openOnFocus`. */
  noteWindowBlur(): void {
    this.windowLostFocus.set(true);
  }

  handleFocus(): void {
    const c = this.cfg();
    this.focused.set(true);
    // A focus that immediately follows the whole window losing and regaining
    // focus (e.g. alt-tabbing back) is not a user-initiated focus of this
    // control, so it must not trigger `openOnFocus`. useAutocomplete's
    // `handleFocus` skips its open-on-focus branch under the same condition.
    if (this.windowLostFocus()) {
      this.windowLostFocus.set(false);
      return;
    }
    if (c.openOnFocus) this.openPopup('focus');
  }

  handleBlur(): void {
    const c = this.cfg();
    this.focused.set(false);
    this.focusedItemIndex.set(-1);

    if (
      c.autoSelect &&
      this.highlightedIndex() >= 0 &&
      this.open() &&
      this.highlightReason() !== 'mouse' &&
      this.highlightReason() !== 'touch'
    ) {
      const highlighted = this.highlightedOption();
      if (highlighted) this.selectOption(highlighted.option, 'blur');
    } else if (c.autoSelect && c.freeSolo && this.deps.inputValue() !== '') {
      this.createFreeSoloValue('blur');
    } else if (c.clearOnBlur) {
      this.resetInputValue('blur');
    }
    this.closePopup('blur');
  }

  private createFreeSoloValue(reason: ChangeReason = 'createOption'): void {
    const c = this.cfg();
    const text = this.deps.inputValue();
    if (!text) return;
    const created = text as unknown as T;
    if (c.multiple) {
      this.commit([...this.selectedValues(), created], reason, created);
      this.setInputValue('', 'selectOption');
    } else {
      this.commit(created, reason, created);
    }
  }

  // ── keyboard ─────────────────────────────────────────────────────────────
  /**
   * Full WAI-ARIA combobox key handling. Returns `true` when the event was
   * consumed, so the caller can `preventDefault()`.
   */
  handleKeyDown(event: KeyboardEvent): boolean {
    const c = this.cfg();
    if (c.disabled) return false;

    switch (event.key) {
      case 'ArrowDown':
        if (c.readOnly) return false;
        if (!this.open()) this.openPopup('keyboard');
        else this.moveHighlight(1);
        return true;

      case 'ArrowUp':
        if (c.readOnly) return false;
        if (!this.open()) {
          this.openPopup('keyboard');
          this.moveHighlight('end');
        } else {
          this.moveHighlight(-1);
        }
        return true;

      case 'PageDown':
        if (!this.open()) this.openPopup('keyboard');
        this.moveHighlight(5);
        return true;

      case 'PageUp':
        if (!this.open()) this.openPopup('keyboard');
        this.moveHighlight(-5);
        return true;

      case 'Home':
        if (!this.open() || !c.handleHomeEndKeys) return false;
        this.moveHighlight('start');
        return true;

      case 'End':
        if (!this.open() || !c.handleHomeEndKeys) return false;
        this.moveHighlight('end');
        return true;

      case 'Enter': {
        if (c.readOnly) return false;
        if (this.open() && this.touchScrolled()) {
          this.closePopup('escape');
          return true;
        }
        const idx = this.highlightedIndex();
        const highlighted = this.highlightedOption();
        const inputValueIsSelectedValue =
          !c.multiple && this.selectedValues()[0] !== undefined &&
          this.deps.inputValue() === c.getOptionLabel(this.selectedValues()[0]);

        const hasProgrammaticHighlight = this.open() && idx !== -1 && this.highlightReason() === null;
        const shouldSelectHighlighted = !c.freeSolo || this.inputPristine() || !hasProgrammaticHighlight;

        if (idx !== -1 && this.open() && shouldSelectHighlighted && highlighted && !highlighted.disabled) {
          this.selectOption(highlighted.option, 'selectOption');
          return true;
        }
        if (c.freeSolo && this.deps.inputValue() !== '' && !inputValueIsSelectedValue) {
          this.createFreeSoloValue('createOption');
          if (!c.disableCloseOnSelect) this.closePopup('selectOption');
          return true;
        }
        return false;
      }

      case 'Escape':
        if (this.open()) {
          this.closePopup('escape');
          return true;
        }
        if (c.clearOnEscape && this.hasValue()) {
          this.clear();
          return true;
        }
        if (!c.multiple && !c.freeSolo) {
          this.resetInputValue();
          return true;
        }
        return false;

      case 'Backspace':
      case 'Delete': {
        if (c.readOnly) return false;
        // VoiceOver re-dispatches a synthetic Backspace immediately after its
        // own chip-delete gesture; without this guard it would delete a
        // second chip the user never asked to remove. useAutocomplete:1092.
        if (event.key === 'Backspace' && this.ignoreNextBackspace) {
          this.ignoreNextBackspace = false;
          return false;
        }
        if (!c.multiple) {
          // Single-select chip mode: empty input + a value -> clear it.
          if (c.singleChip && this.deps.inputValue() === '' && this.hasValue()) {
            this.commit(null, 'removeOption', this.selectedValues()[0]);
            return true;
          }
          return false;
        }
        const focusedItem = this.focusedItemIndex();
        if (focusedItem !== -1) {
          this.removeValueAt(focusedItem);
          this.ignoreNextBackspace = true;
          queueMicrotask(() => { this.ignoreNextBackspace = false; });
          return true;
        }
        if (this.deps.inputValue() === '' && event.key === 'Backspace') {
          const values = this.selectedValues();
          for (let i = values.length - 1; i >= 0; i--) {
            if (!this.isFixed(values[i])) {
              this.removeValueAt(i);
              return true;
            }
          }
        }
        return false;
      }

      case 'ArrowLeft':
        if (this.deps.inputValue() !== '') return false;
        if (c.multiple) {
          this.moveItemFocus(-1);
          return true;
        }
        if (c.singleChip && this.hasValue()) {
          this.focusedItemIndex.set(0);
          return true;
        }
        return false;

      case 'ArrowRight':
        if (!c.multiple || this.focusedItemIndex() === -1) return false;
        this.moveItemFocus(1);
        return true;

      default:
        return false;
    }
  }

  private moveItemFocus(step: number): void {
    const count = this.selectedValues().length;
    if (count === 0) return;
    const current = this.focusedItemIndex();
    let next: number;
    if (current === -1) next = step < 0 ? count - 1 : -1;
    else next = current + step;
    if (next >= count) next = -1; // back to the text input
    if (next < -1) next = -1;
    this.focusedItemIndex.set(next);
  }
}
