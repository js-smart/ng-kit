import { NgTemplateOutlet } from '@angular/common';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  Component,
  DestroyRef,
  ElementRef,
  TemplateRef,
  computed,
  contentChild,
  effect,
  forwardRef,
  inject,
  input,
  model,
  output,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import type { ConnectedPosition } from '@angular/cdk/overlay';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgAutocompleteState } from './autocomplete-state';
import { defaultFilterOptions } from './create-filter-options';
import {
  NgClearIconDef,
  NgEmptyDef,
  NgGroupHeaderDef,
  NgLoadingDef,
  NgOptionDef,
  NgPaperDef,
  NgPopupIconDef,
  NgValueDef,
} from './autocomplete-templates';
import {
  DEFAULT_CONFIG,
  type NgAutocompleteConfig,
  type ChangeReason,
  type CloseReason,
  type FilterOptionsFn,
  type HighlightChangeReason,
  type InputChangeReason,
  type NgAutocompleteAppearance,
  type NgAutocompleteSlotProps,
  type OpenReason,
  type RenderedOption,
} from './autocomplete.types';

let nextId = 0;

@Component({
  selector: 'autocomplete, lib-autocomplete',
  imports: [
    NgTemplateOutlet,
    OverlayModule,
    ScrollingModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true,
    },
  ],
  host: {
    class: 'ng-autocomplete',
    '[class.ng-disabled]': 'disabled()',
    '[class.ng-readonly]': 'readOnly()',
    '[class.ng-fullwidth]': 'fullWidth()',
    '[attr.data-size]': 'size()',
  },
  styleUrl: './autocomplete.component.scss',
  templateUrl: './autocomplete.component.html',
})
export class AutocompleteComponent<T> implements ControlValueAccessor {
  private readonly uid = nextId++;
  readonly id = input<string | null>(null);
  private base(): string {
    return this.id() ?? `ng-${this.uid}`;
  }
  get inputId(): string {
    return this.base();
  }
  get listboxId(): string {
    return `${this.base()}-listbox`;
  }
  optionId = (index: number): string => `${this.base()}-option-${index}`;

  // ── data ─────────────────────────────────────────────────────────────────
  readonly options = input.required<readonly T[]>();
  readonly value = model<T | readonly T[] | null>(null);
  readonly inputValue = model<string>('');
  readonly open = model<boolean>(false);

  // ── identity & labels ────────────────────────────────────────────────────
  readonly getOptionLabel = input<(option: T) => string>(
    DEFAULT_CONFIG.getOptionLabel as (option: T) => string,
  );
  readonly getOptionKey = input<(option: T) => string | number>(
    (option: T) => this.getOptionLabel()(option),
  );
  readonly getOptionDisabled = input<(option: T) => boolean>(() => false);
  readonly isOptionEqualToValue = input<(option: T, value: T) => boolean>(
    (a, b) => a === b,
  );
  readonly groupBy = input<((option: T) => string) | null>(null);
  readonly filterOptions = input<FilterOptionsFn<T>>(
    defaultFilterOptions as unknown as FilterOptionsFn<T>,
  );

  // ── modes ────────────────────────────────────────────────────────────────
  readonly multiple = input(false);
  readonly freeSolo = input(false);
  readonly disabled = model(false);
  readonly readOnly = input(false);
  readonly loading = input(false);
  readonly required = input(false);
  readonly invalid = input(false);

  // ── behaviour flags ──────────────────────────────────────────────────────
  readonly autoComplete = input(false);
  readonly autoHighlight = input(false);
  readonly autoSelect = input(false);
  readonly blurOnSelect = input<boolean | 'mouse' | 'touch'>(false);
  readonly clearOnBlur = input<boolean | undefined>(undefined); // default: !freeSolo
  readonly clearOnEscape = input(false);
  readonly disableClearable = input(false);
  readonly disableCloseOnSelect = input(false);
  readonly disabledItemsFocusable = input(false);
  readonly disableListWrap = input(false);
  readonly disablePortal = input(false);
  readonly filterSelectedOptions = input(false);
  readonly handleHomeEndKeys = input<boolean | undefined>(undefined); // default: !freeSolo
  readonly includeInputInList = input(false);
  readonly openOnFocus = input(false);
  readonly resetHighlightOnMouseLeave = input(false);
  readonly selectOnFocus = input<boolean | undefined>(undefined); // default: !freeSolo (useAutocomplete:125)
  readonly fixedOptions = input<readonly T[]>([]);

  // ── presentation ─────────────────────────────────────────────────────────
  readonly label = input<string | null>(null);
  readonly ariaLabel = input<string | null>(null);
  readonly placeholder = input<string | null>(null);
  readonly size = input<'small' | 'medium'>('medium');
  readonly limitTags = input<number>(-1);
  readonly showCheckboxes = input(false);
  readonly noOptionsText = input('No options');
  readonly loadingText = input('Loading…');
  readonly virtualize = input(false);
  readonly itemSize = input(40);
  readonly maxVisibleItems = input(8);
  readonly forcePopupIcon = input<boolean | 'auto'>('auto');
  readonly openText = input('Open');
  readonly closeText = input('Close');
  readonly clearText = input('Clear');
  readonly getLimitTagsText = input<(more: number) => string>((more) => `+${more}`);
  readonly fullWidth = input(false);
  readonly appearance = input<NgAutocompleteAppearance>('fill');

  /** Per-element class/attribute pass-through, mirroring MUI's `slotProps`. */
  readonly slotProps = input<NgAutocompleteSlotProps>({});

  private slotClass(key: keyof NgAutocompleteSlotProps): string {
    return this.slotProps()[key]?.class ?? '';
  }
  private slotAttrs(key: keyof NgAutocompleteSlotProps): Record<string, string | number | boolean> {
    const { class: _class, ...rest } = this.slotProps()[key] ?? {};
    return rest;
  }

  // ── outputs ──────────────────────────────────────────────────────────────
  readonly valueChanged = output<{ value: T | readonly T[] | null; reason: ChangeReason; option?: T }>();
  readonly inputChanged = output<{ value: string; reason: InputChangeReason }>();
  readonly opened = output<OpenReason>();
  readonly closed = output<CloseReason>();
  readonly highlightChanged = output<{ option: T | null; reason: HighlightChangeReason }>();

  // ── content templates ────────────────────────────────────────────────────
  readonly optionTpl = contentChild(NgOptionDef<T>);
  readonly groupTpl = contentChild(NgGroupHeaderDef);
  readonly valueTpl = contentChild(NgValueDef<T>);
  readonly emptyTpl = contentChild(NgEmptyDef);
  readonly loadingTpl = contentChild(NgLoadingDef);
  readonly popupIconTpl = contentChild(NgPopupIconDef);
  readonly clearIconTpl = contentChild(NgClearIconDef);
  readonly paperTpl = contentChild(NgPaperDef);

  private readonly inputEl = viewChild<ElementRef<HTMLInputElement>>('inputEl');
  private readonly listEl = viewChild<ElementRef<HTMLElement>>('listEl');
  private readonly viewport = viewChild(CdkVirtualScrollViewport);
  protected readonly listboxRef = viewChild<TemplateRef<unknown>>('listbox');
  private readonly host = inject(ElementRef<HTMLElement>);

  protected readonly overlayPositions: ConnectedPosition[] = [
    { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 0 },
    { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: 0 },
  ];

  // ── the headless core ────────────────────────────────────────────────────
  private readonly config = computed<NgAutocompleteConfig<T>>(() => ({
    getOptionLabel: this.getOptionLabel(),
    getOptionKey: this.getOptionKey(),
    getOptionDisabled: this.getOptionDisabled(),
    isOptionEqualToValue: this.isOptionEqualToValue(),
    groupBy: this.groupBy(),
    filterOptions: this.filterOptions(),
    multiple: this.multiple(),
    freeSolo: this.freeSolo(),
    disabled: this.disabled(),
    readOnly: this.readOnly(),
    loading: this.loading(),
    autoComplete: this.autoComplete(),
    autoHighlight: this.autoHighlight(),
    autoSelect: this.autoSelect(),
    blurOnSelect: this.blurOnSelect(),
    clearOnBlur: this.clearOnBlur() ?? !this.freeSolo(),
    clearOnEscape: this.clearOnEscape(),
    disableClearable: this.disableClearable(),
    disableCloseOnSelect: this.disableCloseOnSelect(),
    disabledItemsFocusable: this.disabledItemsFocusable(),
    disableListWrap: this.disableListWrap(),
    filterSelectedOptions: this.filterSelectedOptions(),
    handleHomeEndKeys: this.handleHomeEndKeys() ?? !this.freeSolo(),
    includeInputInList: this.includeInputInList(),
    openOnFocus: this.openOnFocus(),
    resetHighlightOnMouseLeave: this.resetHighlightOnMouseLeave(),
    selectOnFocus: this.selectOnFocus() ?? !this.freeSolo(),
    fixedOptions: this.fixedOptions(),
    singleChip: !this.multiple() && !!this.valueTpl(),
  }));

  readonly state = new NgAutocompleteState<T>({
    options: this.options,
    value: this.value,
    inputValue: this.inputValue,
    open: this.open,
    config: this.config,
    events: {
      change: (value, reason, option) => {
        this.onChangeFn(value);
        this.valueChanged.emit({ value, reason, option });
      },
      inputChange: (value, reason) => this.inputChanged.emit({ value, reason }),
      opened: (reason) => this.opened.emit(reason),
      closed: (reason) => this.closed.emit(reason),
      highlightChange: (option, reason) => this.highlightChanged.emit({ option, reason }),
      requestBlur: () => this.inputEl()?.nativeElement.blur(),
    },
  });

  // ── derived view data ────────────────────────────────────────────────────
  protected readonly activeDescendant = computed(() => {
    const i = this.state.highlightedIndex();
    return this.state.open() && i >= 0 ? this.optionId(i) : null;
  });

  // Autocomplete:557
  protected readonly hasPopupIcon = computed(
    () => (!this.freeSolo() || this.forcePopupIcon() === true) && this.forcePopupIcon() !== false,
  );

  /** Single mode + a projected `ngValue` template + a value -> render a chip, not text. */
  protected readonly showSingleChip = computed(
    () => !this.multiple() && !!this.valueTpl() && this.state.hasValue(),
  );

  private readonly valueContexts = computed(() =>
    this.state.selectedValues().map((item, index) => ({
      key: this.getOptionKey()(item),
      context: {
        $implicit: item,
        index,
        label: this.getOptionLabel()(item),
        disabled: this.disabled(),
        fixed: this.state.isFixed(item),
        focused: this.state.focusedItemIndex() === index,
        remove: () => this.state.removeValueAt(index),
      },
    })),
  );

  protected readonly visibleValues = computed(() => {
    const all = this.valueContexts();
    const limit = this.limitTags();
    if (limit < 0 || this.state.focused()) return all;
    return all.slice(0, limit);
  });

  protected readonly hiddenCount = computed(
    () => this.valueContexts().length - this.visibleValues().length,
  );

  protected readonly viewportHeight = computed(() =>
    Math.min(this.state.flatOptions().length, this.maxVisibleItems()) * this.itemSize(),
  );

  protected readonly fieldWidth = signal<number | null>(null);

  constructor() {
    // Window losing focus (e.g. alt-tab) is not a user-initiated focus of
    // this control; note it so the next `focus` event skips `openOnFocus`.
    const onWindowBlur = () => this.state.noteWindowBlur();
    window.addEventListener('blur', onWindowBlur);
    inject(DestroyRef).onDestroy(() => window.removeEventListener('blur', onWindowBlur));

    // Apply `slotProps` class/attribute pass-through to the input and host root.
    // (listbox/paper/indicator classes bind directly in their templates.)
    effect(() => {
      const targets: Array<[keyof NgAutocompleteSlotProps, HTMLElement | null | undefined]> = [
        ['input', this.inputEl()?.nativeElement],
        ['root', this.host.nativeElement],
      ];
      for (const [key, el] of targets) {
        if (!el) continue;
        for (const [name, val] of Object.entries(this.slotAttrs(key))) {
          el.setAttribute(name, String(val));
        }
        const cls = this.slotClass(key);
        if (cls) el.classList.add(...cls.split(/\s+/).filter(Boolean));
      }
    });

    // Keep the text box in sync when the value is changed from the outside
    // (patchValue, another component, a reset).
    effect(() => {
      const selected = this.state.selectedValues();
      untracked(() => {
        if (this.state.focused()) return;
        if (this.multiple()) return;
        if (this.showSingleChip()) return;
        const current = this.inputValue();
        const expected = selected[0] === undefined ? '' : this.getOptionLabel()(selected[0]);
        if (current !== expected && !this.freeSolo()) {
          this.state.setInputValue(expected, 'reset');
        }
      });
    });

    // Scroll the highlighted option into view — plain list or virtual.
    effect(() => {
      const index = this.state.highlightedIndex();
      if (index < 0 || !this.state.open()) return;
      const viewport = this.viewport();
      if (viewport) {
        const range = viewport.getRenderedRange();
        if (index < range.start || index >= range.end) viewport.scrollToIndex(index, 'smooth');
        return;
      }
      const list = this.listEl()?.nativeElement;
      queueMicrotask(() => {
        const option = list?.querySelector(`[data-index="${index}"]`) as HTMLElement | null;
        option?.scrollIntoView?.({ block: 'nearest' });
      });
    });

    // Inline completion (`autoComplete`): write the full label into the input
    // and select the part the user has not typed yet.
    effect(() => {
      const completion = this.state.inlineCompletion();
      const el = this.inputEl()?.nativeElement;
      if (!el || completion == null) return;
      const typedLength = untracked(this.inputValue).length;
      queueMicrotask(() => {
        el.value = completion;
        el.setSelectionRange(typedLength, completion.length);
      });
    });

    // Track the field width so the overlay matches it.
    effect(() => {
      if (!this.state.open()) return;
      const field = this.host.nativeElement.querySelector('.ng-field') as HTMLElement | null;
      if (field) this.fieldWidth.set(field.getBoundingClientRect().width);
    });
  }

  // ── event handlers ───────────────────────────────────────────────────────
  protected onInput(event: Event): void {
    this.state.handleInput((event.target as HTMLInputElement).value);
  }

  protected onFocus(): void {
    this.state.handleFocus();
    const selectOnFocus = this.selectOnFocus() ?? !this.freeSolo();
    if (selectOnFocus) {
      queueMicrotask(() => this.inputEl()?.nativeElement.select());
    }
  }

  protected onBlur(): void {
    this.state.handleBlur();
    this.onTouchedFn();
  }

  protected onKeyDown(event: KeyboardEvent): void {
    if (this.state.handleKeyDown(event)) event.preventDefault();
  }

  protected onFieldMouseDown(event: MouseEvent): void {
    if ((event.target as HTMLElement).closest('button')) return;
    if (event.target !== this.inputEl()?.nativeElement) {
      event.preventDefault();
      this.focusInput();
    }
    if (!this.state.open() && !this.readOnly()) this.state.openPopup('toggleInput');
  }

  protected onOptionHover(item: RenderedOption<T>): void {
    if (item.disabled && !this.disabledItemsFocusable()) return;
    if (this.state.highlightedIndex() !== item.index) {
      this.state.setHighlight(item.index, 'mouse');
    }
  }

  protected onListMouseLeave(): void {
    if (this.resetHighlightOnMouseLeave()) this.state.moveHighlight('reset');
  }

  protected onOptionClick(item: RenderedOption<T>, event: MouseEvent): void {
    event.preventDefault();
    if (item.disabled) return;
    // `selectOption` now owns the blurOnSelect decision (touch/mouse resolved
    // against `state.isTouch`) and fires `requestBlur` synchronously when a
    // blur is due, which re-enters `onBlur()` -> `state.handleBlur()` before
    // `selectOption` returns. So `state.focused()` already reflects whether
    // that happened, and re-focusing here only when it did NOT keeps a plain
    // click's "stay focused" behaviour without fighting an intentional blur.
    this.state.selectOption(item.option, 'selectOption');
    this.state.isTouch.set(false);
    if (this.state.focused()) this.focusInput();
  }

  protected onOutsideClick(event: MouseEvent): void {
    if (this.host.nativeElement.contains(event.target as Node)) return;
    this.state.closePopup('blur');
  }

  protected trackOption = (_: number, item: RenderedOption<T>) => item.key;

  focusInput(): void {
    this.inputEl()?.nativeElement.focus();
  }

  // ── ControlValueAccessor ─────────────────────────────────────────────────
  private onChangeFn: (value: unknown) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(value: T | readonly T[] | null): void {
    this.value.set(value ?? (this.multiple() ? [] : null));
    this.state.resetInputValue('reset');
  }
  registerOnChange(fn: (value: unknown) => void): void {
    this.onChangeFn = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
