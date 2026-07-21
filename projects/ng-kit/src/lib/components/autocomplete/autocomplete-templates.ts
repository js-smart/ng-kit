import { Directive, TemplateRef, inject } from '@angular/core';
import type { RenderedOption } from './autocomplete.types';

/**
 * Angular's answer to MUI's `renderOption` / `renderGroup` / `renderValue`
 * render props: content-projected templates with a typed context.
 */

export interface OptionTemplateContext<T> {
  $implicit: T;
  option: RenderedOption<T>;
  highlighted: boolean;
  selected: boolean;
  /** The current query, for building your own <mark> highlighting. */
  query: string;
}

@Directive({ selector: '[ngOption]' })
export class NgOptionDef<T = unknown> {
  readonly template = inject<TemplateRef<OptionTemplateContext<T>>>(TemplateRef);
  static ngTemplateContextGuard<T>(
    _dir: NgOptionDef<T>,
    _ctx: unknown,
  ): _ctx is OptionTemplateContext<T> {
    return true;
  }
}

export interface GroupTemplateContext {
  $implicit: string;
  count: number;
}

@Directive({ selector: '[ngGroupHeader]' })
export class NgGroupHeaderDef {
  readonly template = inject<TemplateRef<GroupTemplateContext>>(TemplateRef);
  static ngTemplateContextGuard(
    _dir: NgGroupHeaderDef,
    _ctx: unknown,
  ): _ctx is GroupTemplateContext {
    return true;
  }
}

export interface ValueTemplateContext<T> {
  $implicit: T;
  index: number;
  label: string;
  disabled: boolean;
  fixed: boolean;
  focused: boolean;
  remove: () => void;
}

/** Renders one chip (multiple) or the selected value (single). */
@Directive({ selector: '[ngValue]' })
export class NgValueDef<T = unknown> {
  readonly template = inject<TemplateRef<ValueTemplateContext<T>>>(TemplateRef);
  static ngTemplateContextGuard<T>(
    _dir: NgValueDef<T>,
    _ctx: unknown,
  ): _ctx is ValueTemplateContext<T> {
    return true;
  }
}

@Directive({ selector: '[ngEmpty]' })
export class NgEmptyDef {
  readonly template = inject<TemplateRef<void>>(TemplateRef);
}

@Directive({ selector: '[ngLoading]' })
export class NgLoadingDef {
  readonly template = inject<TemplateRef<void>>(TemplateRef);
}

@Directive({ selector: '[ngPopupIcon]' })
export class NgPopupIconDef {
  readonly template = inject<TemplateRef<void>>(TemplateRef);
}

@Directive({ selector: '[ngClearIcon]' })
export class NgClearIconDef {
  readonly template = inject<TemplateRef<void>>(TemplateRef);
}

export interface PaperTemplateContext {
  /** The default listbox template to project inside your surface. */
  $implicit: TemplateRef<unknown>;
}

@Directive({ selector: '[ngPaper]' })
export class NgPaperDef {
  readonly template = inject<TemplateRef<PaperTemplateContext>>(TemplateRef);
  static ngTemplateContextGuard(
    _d: NgPaperDef,
    _c: unknown,
  ): _c is PaperTemplateContext {
    return true;
  }
}
