import { computed, signal, type WritableSignal } from '@angular/core';
import { NgAutocompleteState } from './autocomplete-state';
import { DEFAULT_CONFIG, type NgAutocompleteConfig } from './autocomplete.types';
import { defaultFilterOptions } from './create-filter-options';

function makeState(cfg: Partial<NgAutocompleteConfig<string>> = {}, opts: {
  options?: string[];
  value?: string | readonly string[] | null;
  inputValue?: string;
} = {}) {
  const options = signal<readonly string[]>(opts.options ?? ['Alpha', 'Beta', 'Gamma']);
  const value = signal<string | readonly string[] | null>(opts.value ?? null);
  const inputValue = signal<string>(opts.inputValue ?? '');
  const open = signal<boolean>(false);
  const config = signal<NgAutocompleteConfig<string>>({
    ...(DEFAULT_CONFIG as unknown as NgAutocompleteConfig<string>),
    filterOptions: defaultFilterOptions as never,
    ...cfg,
  });
  const state = new NgAutocompleteState<string>({ options, value, inputValue, open, config });
  return { state, options, value, inputValue, open, config };
}

describe('NgAutocompleteState — dirty & clearVisible (B2)', () => {
  it('is not dirty and hides clear when empty', () => {
    const { state } = makeState();
    expect(state.dirty()).toBe(false);
    expect(state.clearVisible()).toBe(false);
  });

  it('is dirty and shows clear when a value is selected', () => {
    const { state } = makeState({}, { value: 'Alpha' });
    expect(state.dirty()).toBe(true);
    expect(state.clearVisible()).toBe(true);
  });

  it('is dirty from freeSolo typed text even with no value (B2)', () => {
    const { state } = makeState({ freeSolo: true }, { inputValue: 'typed' });
    expect(state.dirty()).toBe(true);
    expect(state.clearVisible()).toBe(true);
  });

  it('hides clear when disableClearable / disabled / readOnly', () => {
    expect(makeState({ disableClearable: true }, { value: 'Alpha' }).state.clearVisible()).toBe(false);
    expect(makeState({ disabled: true }, { value: 'Alpha' }).state.clearVisible()).toBe(false);
    expect(makeState({ readOnly: true }, { value: 'Alpha' }).state.clearVisible()).toBe(false);
  });
});

describe('NgAutocompleteState — autoSelect blur gating (B4/B7)', () => {
  it('does NOT auto-select a mouse-highlighted option on blur', () => {
    const changes: string[] = [];
    const { state } = makeState({ autoSelect: true }, { inputValue: '' });
    (state as any).deps.events = { change: (v: string) => changes.push(v as string) };
    state.openPopup('input');
    state.setHighlight(0, 'mouse');
    state.handleBlur();
    expect(changes).toEqual([]); // mouse highlight is incidental
  });

  it('auto-selects a keyboard-highlighted option on blur', () => {
    const changes: unknown[] = [];
    const { state, value } = makeState({ autoSelect: true }, { inputValue: '' });
    (state as any).deps.events = { change: (v: unknown) => changes.push(v) };
    state.openPopup('input');
    state.setHighlight(0, 'keyboard');
    state.handleBlur();
    expect(value()).toBe('Alpha');
  });

  it('does not emit highlightChange for programmatic (auto) highlight (B7)', () => {
    const reasons: string[] = [];
    const { state } = makeState({ autoHighlight: true });
    (state as any).deps.events = { highlightChange: (_o: unknown, r: string) => reasons.push(r) };
    state.openPopup('input');
    state.moveHighlight('reset');
    expect(reasons).not.toContain('auto');
  });
});

describe('NgAutocompleteState — Enter freeSolo vs highlighted (B5)', () => {
  it('commits typed freeSolo text over a programmatic (autoHighlight) highlight', () => {
    // Options that MATCH the typed prefix, so autoHighlight produces a real
    // programmatic highlight at index 0 ('Alpha'). The B5 decision must still
    // commit the typed text 'Alp' — a naive "select highlighted on Enter"
    // implementation would instead commit 'Alpha', so this genuinely goes RED
    // without the programmatic-highlight guard.
    const { state, value } = makeState(
      { freeSolo: true, autoHighlight: true },
      { options: ['Alpha', 'Alpine'] },
    );
    state.openPopup('input');
    state.handleInput('Alp');
    // Precondition: there IS a highlighted option, and it was set programmatically.
    expect(state.highlightedIndex()).toBe(0);
    expect(state.highlightReason()).toBeNull();
    const consumed = state.handleKeyDown(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(consumed).toBe(true);
    expect(value()).toBe('Alp'); // typed text, NOT the highlighted 'Alpha'
  });

  it('selects the highlighted option when the user arrowed to it (keyboard)', () => {
    const { state, value } = makeState({ freeSolo: true });
    state.openPopup('input');
    state.handleInput('A');
    state.moveHighlight(1);              // keyboard highlight -> 'Alpha'
    state.handleKeyDown(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(value()).toBe('Alpha');
  });
});

describe('NgAutocompleteState — nav keys open popup (B8)', () => {
  it('PageDown opens the popup when closed', () => {
    const { state } = makeState();
    expect(state.open()).toBe(false);
    state.handleKeyDown(new KeyboardEvent('keydown', { key: 'PageDown' }));
    expect(state.open()).toBe(true);
  });
});

describe('NgAutocompleteState — single-select chip mode (B6)', () => {
  it('Backspace on empty input clears the value via removeOption when singleChip', () => {
    const { state, value } = makeState({ singleChip: true }, { value: 'Alpha', inputValue: '' });
    const consumed = state.handleKeyDown(new KeyboardEvent('keydown', { key: 'Backspace' }));
    expect(consumed).toBe(true);
    expect(value()).toBeNull();
  });

  it('does nothing on Backspace when not in singleChip mode (single, no valueTpl)', () => {
    const { state, value } = makeState({ singleChip: false }, { value: 'Alpha', inputValue: '' });
    const consumed = state.handleKeyDown(new KeyboardEvent('keydown', { key: 'Backspace' }));
    expect(consumed).toBe(false);
    expect(value()).toBe('Alpha');
  });

  it('ArrowLeft focuses the single chip', () => {
    const { state } = makeState({ singleChip: true }, { value: 'Alpha', inputValue: '' });
    expect(state.focusedItemIndex()).toBe(-1);
    const consumed = state.handleKeyDown(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    expect(consumed).toBe(true);
    expect(state.focusedItemIndex()).toBe(0);
  });
});

describe('NgAutocompleteState — touch semantics (B9)', () => {
  it('does not select a stale highlight on Enter after a touch-scroll', () => {
    const { state, value } = makeState({}, { inputValue: 'A' });
    state.openPopup('input');
    state.handleOptionTouchStart(0); // touch highlight on 'Alpha'
    state.notifyScroll();            // user scrolled -> stale
    const consumed = state.handleKeyDown(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(value()).toBeNull();
    expect(consumed).toBe(true); // closes without selecting
  });

  it('does NOT call requestBlur on a touch selection when blurOnSelect is "mouse"', () => {
    let blurred = false;
    const { state } = makeState({ blurOnSelect: 'mouse' }, { inputValue: 'A' });
    (state as any).deps.events = { requestBlur: () => { blurred = true; } };
    state.openPopup('input');
    state.handleOptionTouchStart(0);
    state.selectOption('Alpha', 'selectOption');
    expect(blurred).toBe(false);
  });

  it('calls requestBlur on a touch selection when blurOnSelect is "touch"', () => {
    let blurred = false;
    const { state } = makeState({ blurOnSelect: 'touch' }, { inputValue: 'A' });
    (state as any).deps.events = { requestBlur: () => { blurred = true; } };
    state.openPopup('input');
    state.handleOptionTouchStart(0);
    state.selectOption('Alpha', 'selectOption');
    expect(blurred).toBe(true);
  });

  it('calls requestBlur on a non-touch (mouse/keyboard) selection when blurOnSelect is "mouse"', () => {
    let blurred = false;
    const { state } = makeState({ blurOnSelect: 'mouse' }, { inputValue: 'A' });
    (state as any).deps.events = { requestBlur: () => { blurred = true; } };
    state.openPopup('input');
    state.selectOption('Alpha', 'selectOption');
    expect(blurred).toBe(true);
  });
});

describe('NgAutocompleteState — window blur reopen guard (B10)', () => {
  it('does not reopen via openOnFocus on the focus that follows a window blur', () => {
    const { state } = makeState({ openOnFocus: true });
    state.noteWindowBlur();
    state.handleFocus();
    expect(state.open()).toBe(false);
    // subsequent focus behaves normally
    state.handleBlur();
    state.handleFocus();
    expect(state.open()).toBe(true);
  });
});

describe('NgAutocompleteState — VoiceOver synthetic Backspace guard (B10)', () => {
  it('ignores a synthetic Backspace that immediately follows a chip removal by index', () => {
    const { state, value } = makeState(
      { multiple: true },
      { value: ['Alpha', 'Beta'], inputValue: '' },
    );
    state.focusedItemIndex.set(0);
    // Removing a chip by focused index (VoiceOver's own delete gesture).
    const first = state.handleKeyDown(new KeyboardEvent('keydown', { key: 'Backspace' }));
    expect(first).toBe(true);
    expect(value()).toEqual(['Beta']);
    // VoiceOver then re-dispatches a synthetic Backspace on the now-empty,
    // unfocused-item input; without the guard this would delete 'Beta' too.
    const synthetic = state.handleKeyDown(new KeyboardEvent('keydown', { key: 'Backspace' }));
    expect(synthetic).toBe(false);
    expect(value()).toEqual(['Beta']);
    // A real, later Backspace should behave normally again.
    const later = state.handleKeyDown(new KeyboardEvent('keydown', { key: 'Backspace' }));
    expect(later).toBe(true);
    expect(value()).toEqual([]);
  });
});

describe('DEFAULT_CONFIG.getOptionLabel (B11)', () => {
  it('returns option.label when present', () => {
    expect(DEFAULT_CONFIG.getOptionLabel({ label: 'X' })).toBe('X');
  });
  it('coerces the whole option via String() when no label (useAutocomplete:106,133)', () => {
    expect(DEFAULT_CONFIG.getOptionLabel(42 as unknown)).toBe('42');
    expect(DEFAULT_CONFIG.getOptionLabel('str')).toBe('str');
  });
});
