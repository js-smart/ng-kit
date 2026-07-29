/**
 * Shared Autocomplete API metadata — the single source of truth for the full
 * API reference on the {@link AutocompleteIntroPage} and the focused,
 * per-example "this example demonstrates" tables on the example pages.
 *
 * A close adaptation of MUI's Autocomplete docs (https://mui.com/material-ui/
 * react-autocomplete/); this component is a 1:1 Angular port of MUI's
 * useAutocomplete/Autocomplete.
 */

export interface AutocompleteInput {
	readonly name: string;
	readonly type: string;
	readonly default: string;
	readonly description: string;
}

export interface AutocompleteOutput {
	readonly name: string;
	readonly payload: string;
	readonly description: string;
}

export interface AutocompleteTemplate {
	readonly name: string;
	readonly mui: string;
	readonly purpose: string;
}

export interface AutocompleteFilterOption {
	readonly name: string;
	readonly type: string;
	readonly default: string;
	readonly description: string;
}

export const AUTOCOMPLETE_INPUTS: readonly AutocompleteInput[] = [
	{ name: 'options', type: 'readonly T[]', default: '— (required)', description: 'The list of options shown in the panel.' },
	{ name: 'value', type: 'T | T[] | null', default: 'null', description: 'Two-way selected value (model). An array when multiple.' },
	{ name: 'inputValue', type: 'string', default: "''", description: 'Two-way text shown in the box (model); independent of value.' },
	{ name: 'open', type: 'boolean', default: 'false', description: 'Two-way popup open state (model).' },
	{ name: 'getOptionLabel', type: '(option: T) => string', default: 'option.label ?? String(option)', description: 'Maps an option to its display string.' },
	{ name: 'getOptionKey', type: '(option: T) => string | number', default: 'getOptionLabel', description: 'Stable key for an option (trackBy).' },
	{ name: 'getOptionDisabled', type: '(option: T) => boolean', default: '() => false', description: 'Marks individual options as disabled.' },
	{ name: 'isOptionEqualToValue', type: '(a: T, b: T) => boolean', default: '===', description: 'Equality used to match a value against an option.' },
	{ name: 'groupBy', type: '((option: T) => string) | null', default: 'null', description: 'Groups options under headers; options must be pre-sorted by key.' },
	{ name: 'filterOptions', type: 'FilterOptionsFn<T>', default: 'createFilterOptions()', description: 'Custom filtering function. Pass passThroughFilter for server-side search.' },
	{ name: 'multiple', type: 'boolean', default: 'false', description: 'Allow selecting several values, rendered as chips.' },
	{ name: 'freeSolo', type: 'boolean', default: 'false', description: 'Allow arbitrary values not bound to the options.' },
	{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the control (also set via reactive-forms).' },
	{ name: 'readOnly', type: 'boolean', default: 'false', description: 'Make the control read-only.' },
	{ name: 'loading', type: 'boolean', default: 'false', description: 'Show a loading indicator and loadingText.' },
	{ name: 'required', type: 'boolean', default: 'false', description: 'Marks the control required (aria-required).' },
	{ name: 'invalid', type: 'boolean', default: 'false', description: 'Marks the control invalid (aria-invalid).' },
	{ name: 'autoComplete', type: 'boolean', default: 'false', description: 'Inline-complete the highlighted label after the cursor.' },
	{ name: 'autoHighlight', type: 'boolean', default: 'false', description: 'Automatically highlight the first option.' },
	{ name: 'autoSelect', type: 'boolean', default: 'false', description: 'Select the highlighted option on blur.' },
	{ name: 'blurOnSelect', type: "boolean | 'mouse' | 'touch'", default: 'false', description: 'Blur the input after selecting.' },
	{ name: 'clearOnBlur', type: 'boolean', default: '!freeSolo', description: 'Clear the input text on blur when there is no value.' },
	{ name: 'clearOnEscape', type: 'boolean', default: 'false', description: 'Clear the value when Escape is pressed.' },
	{ name: 'disableClearable', type: 'boolean', default: 'false', description: 'Hide the clear button / prevent clearing.' },
	{ name: 'disableCloseOnSelect', type: 'boolean', default: 'false', description: 'Keep the popup open after a selection.' },
	{ name: 'disabledItemsFocusable', type: 'boolean', default: 'false', description: 'Allow keyboard focus to land on disabled options.' },
	{ name: 'disableListWrap', type: 'boolean', default: 'false', description: 'Prevent wrapping when navigating the listbox.' },
	{ name: 'disablePortal', type: 'boolean', default: 'false', description: 'Render the popup inline instead of in a CDK overlay.' },
	{ name: 'filterSelectedOptions', type: 'boolean', default: 'false', description: 'Hide already-selected options from the listbox.' },
	{ name: 'handleHomeEndKeys', type: 'boolean', default: '!freeSolo', description: 'Move highlight with Home/End keys.' },
	{ name: 'includeInputInList', type: 'boolean', default: 'false', description: 'Allow the highlight to move back to the input.' },
	{ name: 'openOnFocus', type: 'boolean', default: 'false', description: 'Open the popup as soon as the input is focused.' },
	{ name: 'resetHighlightOnMouseLeave', type: 'boolean', default: 'false', description: 'Reset the highlight when the pointer leaves the list.' },
	{ name: 'selectOnFocus', type: 'boolean', default: '!freeSolo', description: 'Select the input text on focus.' },
	{ name: 'fixedOptions', type: 'readonly T[]', default: '[]', description: 'Values that cannot be removed while multiple.' },
	{ name: 'label', type: 'string | null', default: 'null', description: 'Field label (mat-label).' },
	{ name: 'ariaLabel', type: 'string | null', default: 'null', description: 'Accessible name when no visible label is used.' },
	{ name: 'placeholder', type: 'string | null', default: 'null', description: 'Input placeholder text.' },
	{ name: 'size', type: "'small' | 'medium'", default: "'medium'", description: 'Field density.' },
	{ name: 'appearance', type: "'fill' | 'outline'", default: "'fill'", description: 'Material form-field appearance.' },
	{ name: 'fullWidth', type: 'boolean', default: 'false', description: 'Stretch the field to fill its container.' },
	{ name: 'limitTags', type: 'number', default: '-1', description: 'Max chips shown when unfocused (-1 = all).' },
	{ name: 'getLimitTagsText', type: '(more: number) => string', default: '(more) => `+${more}`', description: 'Label for the truncated-tags summary.' },
	{ name: 'showCheckboxes', type: 'boolean', default: 'false', description: 'Render a checkbox in front of each option (multiple).' },
	{ name: 'noOptionsText', type: 'string', default: "'No options'", description: 'Message shown when nothing matches.' },
	{ name: 'loadingText', type: 'string', default: "'Loading…'", description: 'Message shown while loading.' },
	{ name: 'clearText', type: 'string', default: "'Clear'", description: 'Accessible label for the clear button.' },
	{ name: 'openText', type: 'string', default: "'Open'", description: 'Accessible label for the toggle button (closed).' },
	{ name: 'closeText', type: 'string', default: "'Close'", description: 'Accessible label for the toggle button (open).' },
	{ name: 'forcePopupIcon', type: "boolean | 'auto'", default: "'auto'", description: 'Force the dropdown toggle icon on/off.' },
	{ name: 'virtualize', type: 'boolean', default: 'false', description: 'Virtual-scroll the option list (CDK).' },
	{ name: 'itemSize', type: 'number', default: '40', description: 'Row height (px) used by virtual scroll.' },
	{ name: 'maxVisibleItems', type: 'number', default: '8', description: 'Max rows visible before the list scrolls.' },
	{ name: 'slotProps', type: 'NgAutocompleteSlotProps', default: '{}', description: 'Per-slot class/attribute pass-through.' },
	{ name: 'id', type: 'string | null', default: 'null', description: 'Base id used to derive element ids (accessibility).' },
];

export const AUTOCOMPLETE_OUTPUTS: readonly AutocompleteOutput[] = [
	{ name: 'valueChanged', payload: '{ value; reason; option? }', description: 'Selected value changed. reason: createOption | selectOption | removeOption | clear | blur.' },
	{ name: 'inputChanged', payload: '{ value: string; reason }', description: 'Input text changed. reason: input | reset | clear | blur | selectOption | removeOption.' },
	{ name: 'opened', payload: 'OpenReason', description: 'Popup opened. reason: toggleInput | focus | input | keyboard.' },
	{ name: 'closed', payload: 'CloseReason', description: 'Popup closed. reason: toggleInput | escape | selectOption | removeOption | blur.' },
	{ name: 'highlightChanged', payload: '{ option: T | null; reason }', description: 'Highlighted option changed. reason: keyboard | mouse | auto | touch.' },
];

export const AUTOCOMPLETE_TEMPLATES: readonly AutocompleteTemplate[] = [
	{ name: '*ngOption', mui: 'renderOption', purpose: 'Custom option row. Context: $implicit (option), option, highlighted, selected, query.' },
	{ name: '*ngValue', mui: 'renderValue', purpose: 'Custom chip / selected-value rendering. Context: $implicit, index, label, disabled, fixed, focused, remove().' },
	{ name: '*ngGroupHeader', mui: 'renderGroup', purpose: 'Custom group header. Context: $implicit (group name), count.' },
	{ name: '*ngPaper', mui: 'slots.paper', purpose: 'Custom popup surface wrapping the listbox. Context: $implicit (listbox template).' },
	{ name: '*ngEmpty', mui: 'noOptionsText', purpose: 'Custom "no options" content.' },
	{ name: '*ngLoading', mui: 'loadingText', purpose: 'Custom loading content.' },
	{ name: '*ngPopupIcon', mui: 'popupIcon', purpose: 'Custom dropdown toggle icon.' },
	{ name: '*ngClearIcon', mui: 'clearIcon', purpose: 'Custom clear-button icon.' },
];

export const AUTOCOMPLETE_FILTER_CONFIG: readonly AutocompleteFilterOption[] = [
	{ name: 'matchFrom', type: "'any' | 'start'", default: "'any'", description: 'Match anywhere in the string, or only at the start.' },
	{ name: 'stringify', type: '(option: T) => string', default: 'getOptionLabel', description: 'Turn an option into the string that gets matched.' },
	{ name: 'ignoreCase', type: 'boolean', default: 'true', description: 'Lowercase both sides before comparing.' },
	{ name: 'ignoreAccents', type: 'boolean', default: 'true', description: 'Strip diacritics before comparing.' },
	{ name: 'trim', type: 'boolean', default: 'false', description: 'Trim trailing whitespace off the query.' },
	{ name: 'limit', type: 'number | null', default: 'null', description: 'Cap the number of suggestions returned.' },
];

/**
 * Returns the named inputs in the order requested — used by example pages to
 * render a focused "this example demonstrates" subset of {@link AUTOCOMPLETE_INPUTS}.
 * Unknown names are skipped.
 */
export function pickAutocompleteInputs(names: readonly string[]): AutocompleteInput[] {
	return names.map((name) => AUTOCOMPLETE_INPUTS.find((input) => input.name === name)).filter((input): input is AutocompleteInput => !!input);
}

/** Like {@link pickAutocompleteInputs} but for content-template directives. */
export function pickAutocompleteTemplates(names: readonly string[]): AutocompleteTemplate[] {
	return names.map((name) => AUTOCOMPLETE_TEMPLATES.find((tpl) => tpl.name === name)).filter((tpl): tpl is AutocompleteTemplate => !!tpl);
}
