import { Component, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';

import { AutocompleteComponent } from './autocomplete.component';
import { createFilterOptions } from './create-filter-options';
import { NgPopupIconDef, NgClearIconDef, NgPaperDef, NgValueDef } from './autocomplete-templates';

@Component({
  imports: [AutocompleteComponent],
  template: `
    <autocomplete
      [options]="options"
      [(value)]="value"
      [(inputValue)]="inputValue"
      [getOptionLabel]="labelOf"
      label="Movie"
    />
  `,
})
class HostComponent {
  options = ['The Godfather', 'Pulp Fiction', 'Inception', 'Interstellar'];
  value: string | null = null;
  inputValue = '';
  labelOf = (o: string) => o;
}

describe('createFilterOptions', () => {
  it('matches case-insensitively by default', () => {
    const filter = createFilterOptions<string>();
    const result = filter(['Alpha', 'beta', 'Alpine'], {
      inputValue: 'al',
      getOptionLabel: (o) => o,
    });
    expect(result).toEqual(['Alpha', 'Alpine']);
  });

  it('supports matchFrom start', () => {
    const filter = createFilterOptions<string>({ matchFrom: 'start' });
    const result = filter(['cat', 'scatter', 'catalog'], {
      inputValue: 'cat',
      getOptionLabel: (o) => o,
    });
    expect(result).toEqual(['cat', 'catalog']);
  });
});

describe('AutocompleteComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    // ng-kit runs specs under zone.js (not zoneless), so fixtures do not
    // auto-detect — drive the initial render explicitly.
    fixture.detectChanges();
    await fixture.whenStable();
  });

  function inputEl(): HTMLInputElement {
    return fixture.debugElement.query(By.css('input.ng-input')).nativeElement;
  }

  function optionEls(): HTMLElement[] {
    return fixture.debugElement
      .queryAll(By.css('[role="option"]'))
      .map((d) => d.nativeElement as HTMLElement);
  }

  it('should create with options', () => {
    expect(fixture.debugElement.query(By.css('autocomplete'))).toBeTruthy();
    expect(inputEl()).toBeTruthy();
  });

  it('filters options on input', async () => {
    const input = inputEl();
    input.dispatchEvent(new Event('focus'));
    input.value = 'pulp';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    const labels = optionEls().map((el) => el.textContent?.trim());
    expect(labels).toEqual(['Pulp Fiction']);
  });

  it('selects an option and updates value', async () => {
    const input = inputEl();
    input.dispatchEvent(new Event('focus'));
    input.value = 'incep';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    optionEls()[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(host.value).toBe('Inception');
    expect(host.inputValue).toBe('Inception');
  });

  it('highlights with keyboard and selects on Enter', async () => {
    const input = inputEl();
    input.dispatchEvent(new Event('focus'));
    input.value = 'i';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    input.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }),
    );
    fixture.detectChanges();
    input.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }),
    );
    fixture.detectChanges();
    await fixture.whenStable();

    expect(host.value).toBeTruthy();
    expect(['Pulp Fiction', 'Inception', 'Interstellar']).toContain(host.value as string);
  });
});

describe('AutocompleteComponent — controlled open', () => {
  // Signals-first host: this is how an Angular v22 consumer binds a two-way
  // model. A plain (non-signal) field does not drive change detection in
  // zoneless mode, so a signal is the correct control surface.
  @Component({
    imports: [AutocompleteComponent],
    template: `<autocomplete [options]="options" [(open)]="open" [getOptionLabel]="id" />`,
  })
  class OpenHost {
    options = ['Alpha', 'Beta'];
    readonly open = signal(false);
    id = (o: string) => o;
  }

  it('opens the listbox when open is set to true from the host', async () => {
    const fixture = TestBed.createComponent(OpenHost);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.componentInstance.open.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.debugElement.query(By.css('[role="listbox"]'))).toBeTruthy();
  });

  it('reflects internal open back to the host model', async () => {
    const fixture = TestBed.createComponent(OpenHost);
    fixture.detectChanges();
    await fixture.whenStable();
    const input = fixture.debugElement.query(By.css('input.ng-input')).nativeElement as HTMLInputElement;
    input.dispatchEvent(new Event('focus'));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.componentInstance.open()).toBe(true);
  });
});

describe('AutocompleteComponent — selectOnFocus default (B1)', () => {
  // NOTE: also binds [(value)] so the pre-existing "keep input text in sync
  // with the selected value" effect (Tasks 1-7) doesn't reset inputValue to
  // '' on init when no option is selected — that reset is unrelated to the
  // selectOnFocus behaviour under test here.
  @Component({
    imports: [AutocompleteComponent],
    template: `<autocomplete [options]="options" [(value)]="value" [(inputValue)]="inputValue" [getOptionLabel]="id" [freeSolo]="freeSolo" />`,
  })
  class Host {
    options = ['Alpha']; value = 'Alpha'; inputValue = 'Alpha'; freeSolo = false; id = (o: string) => o;
  }

  it('selects input text on focus when not freeSolo (default)', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    await fixture.whenStable();
    const input = fixture.debugElement.query(By.css('input.ng-input')).nativeElement as HTMLInputElement;
    input.dispatchEvent(new Event('focus'));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(input.selectionStart).toBe(0);
    expect(input.selectionEnd).toBe('Alpha'.length);
  });

  it('does NOT auto-select on focus when freeSolo (default)', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.freeSolo = true;
    fixture.detectChanges();
    await fixture.whenStable();
    const input = fixture.debugElement.query(By.css('input.ng-input')).nativeElement as HTMLInputElement;
    input.setSelectionRange(5, 5);
    input.dispatchEvent(new Event('focus'));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(input.selectionStart).toBe(input.selectionEnd);
  });
});

describe('AutocompleteComponent — forcePopupIcon (B3)', () => {
  @Component({
    imports: [AutocompleteComponent],
    template: `<autocomplete [options]="o" [getOptionLabel]="id" [freeSolo]="freeSolo" [forcePopupIcon]="force" />`,
  })
  class Host { o = ['A']; id = (x: string) => x; freeSolo = false; force: boolean | 'auto' = 'auto'; }

  function toggle(f: ComponentFixture<Host>) {
    return f.debugElement.query(By.css('.ng-toggle'));
  }

  it('shows the popup icon by default (not freeSolo)', async () => {
    const f = TestBed.createComponent(Host); await f.whenStable(); f.detectChanges();
    expect(toggle(f)).toBeTruthy();
  });
  it('hides it in freeSolo with forcePopupIcon=auto', async () => {
    const f = TestBed.createComponent(Host); f.componentInstance.freeSolo = true; await f.whenStable(); f.detectChanges();
    expect(toggle(f)).toBeNull();
  });
  it('forces it in freeSolo with forcePopupIcon=true', async () => {
    const f = TestBed.createComponent(Host); f.componentInstance.freeSolo = true; f.componentInstance.force = true; await f.whenStable(); f.detectChanges();
    expect(toggle(f)).toBeTruthy();
  });
  it('hides it with forcePopupIcon=false', async () => {
    const f = TestBed.createComponent(Host); f.componentInstance.force = false; await f.whenStable(); f.detectChanges();
    expect(toggle(f)).toBeNull();
  });
});

describe('AutocompleteComponent — getLimitTagsText', () => {
  @Component({
    imports: [AutocompleteComponent],
    template: `<autocomplete [options]="o" [(value)]="v" [getOptionLabel]="id" [multiple]="true" [limitTags]="1" [getLimitTagsText]="fmt" />`,
  })
  class Host { o = ['A','B','C']; v = ['A','B','C']; id = (x:string)=>x; fmt = (n:number)=>`and ${n} more`; }

  it('uses the custom overflow text', async () => {
    const f = TestBed.createComponent(Host); await f.whenStable(); f.detectChanges();
    expect(f.debugElement.query(By.css('.ng-more')).nativeElement.textContent.trim()).toBe('and 2 more');
  });
});

describe('AutocompleteComponent — fullWidth & appearance', () => {
  @Component({
    imports: [AutocompleteComponent],
    template: `<autocomplete [options]="o" [getOptionLabel]="id" [fullWidth]="true" appearance="outline" />`,
  })
  class Host { o = ['A']; id = (x:string)=>x; }
  it('reflects fullWidth on the host and appearance on the mat-form-field', async () => {
    const f = TestBed.createComponent(Host); await f.whenStable(); f.detectChanges();
    const hostEl = f.debugElement.query(By.css('autocomplete')).nativeElement as HTMLElement;
    expect(hostEl.classList.contains('ng-fullwidth')).toBe(true);
    // `appearance` is now owned by mat-form-field, which reflects it as a class.
    const field = f.debugElement.query(By.css('mat-form-field')).nativeElement as HTMLElement;
    expect(field.classList.contains('mat-form-field-appearance-outline')).toBe(true);
  });
});

describe('AutocompleteComponent — id override', () => {
  @Component({
    imports: [AutocompleteComponent],
    template: `<autocomplete id="films" [options]="o" [getOptionLabel]="id2" label="Film" />`,
  })
  class Host { o = ['A']; id2 = (x:string)=>x; }
  it('derives element ids from the provided id', async () => {
    const f = TestBed.createComponent(Host); await f.whenStable(); f.detectChanges();
    const input = f.debugElement.query(By.css('input.ng-input')).nativeElement as HTMLInputElement;
    expect(input.id).toBe('films');
    // The label is now a mat-form-field <mat-label>; its text is preserved.
    const label = f.debugElement.query(By.css('mat-label')).nativeElement as HTMLElement;
    expect(label.textContent?.trim()).toBe('Film');
  });
});

describe('AutocompleteComponent — icon slots', () => {
  @Component({
    imports: [AutocompleteComponent, NgPopupIconDef, NgClearIconDef],
    template: `
      <autocomplete [options]="o" [(value)]="v" [getOptionLabel]="id">
        <span *ngPopupIcon class="my-caret">CARET</span>
        <span *ngClearIcon class="my-clear">CLR</span>
      </autocomplete>`,
  })
  class Host { o = ['A', 'B']; v: string | null = 'A'; id = (x: string) => x; }

  it('renders custom popup and clear icons', async () => {
    const f = TestBed.createComponent(Host); await f.whenStable(); f.detectChanges();
    expect(f.debugElement.query(By.css('.my-caret'))).toBeTruthy();
    expect(f.debugElement.query(By.css('.my-clear'))).toBeTruthy();
  });
});

describe('AutocompleteComponent — paper slot', () => {
  @Component({
    imports: [AutocompleteComponent, NgPaperDef, NgTemplateOutlet],
    template: `
      <autocomplete [options]="o" [(open)]="open" [getOptionLabel]="id">
        <div *ngPaper="let body" class="my-paper">
          <ng-container [ngTemplateOutlet]="body" />
        </div>
      </autocomplete>`,
  })
  class Host { o = ['A', 'B']; readonly open = signal(true); id = (x: string) => x; }

  it('renders the projected paper wrapping the listbox body, replacing the default .ng-popup', async () => {
    const f = TestBed.createComponent(Host); await f.whenStable(); f.detectChanges();
    expect(f.debugElement.query(By.css('.my-paper'))).toBeTruthy();
    expect(f.debugElement.query(By.css('.ng-popup'))).toBeNull();
    expect(f.debugElement.queryAll(By.css('[role="option"]')).length).toBe(2);
  });
});

describe('AutocompleteComponent — slotProps', () => {
  @Component({
    imports: [AutocompleteComponent],
    template: `<autocomplete [options]="o" [getOptionLabel]="id" [slotProps]="sp" />`,
  })
  class Host {
    o = ['A']; id = (x: string) => x;
    sp = { input: { class: 'custom-input', 'data-testid': 'ac-input' } };
  }
  it('applies slotProps.input class and attributes', async () => {
    const f = TestBed.createComponent(Host); await f.whenStable(); f.detectChanges();
    const input = f.debugElement.query(By.css('input.ng-input')).nativeElement as HTMLInputElement;
    expect(input.classList.contains('custom-input')).toBe(true);
    expect(input.getAttribute('data-testid')).toBe('ac-input');
  });
});

describe('AutocompleteComponent — window blur reopen guard (B10)', () => {
  @Component({
    imports: [AutocompleteComponent],
    template: `<autocomplete [options]="o" [getOptionLabel]="id" [openOnFocus]="true" />`,
  })
  class Host { o = ['A', 'B']; id = (x: string) => x; }

  it('does not reopen on the focus that follows a real window blur event', async () => {
    const f = TestBed.createComponent(Host); await f.whenStable(); f.detectChanges();
    const input = f.debugElement.query(By.css('input.ng-input')).nativeElement as HTMLInputElement;

    window.dispatchEvent(new Event('blur'));
    input.focus();
    f.detectChanges(); await f.whenStable();
    expect(f.debugElement.query(By.css('[role="listbox"]'))).toBeNull();

    // A normal focus afterwards (no intervening window blur) opens as usual.
    input.blur();
    f.detectChanges(); await f.whenStable();
    input.focus();
    f.detectChanges(); await f.whenStable();
    expect(f.debugElement.query(By.css('[role="listbox"]'))).toBeTruthy();
  });

  it('removes the window blur listener on destroy', async () => {
    const f = TestBed.createComponent(Host); await f.whenStable(); f.detectChanges();
    const removeSpy = vi.spyOn(window, 'removeEventListener');
    f.destroy();
    expect(removeSpy).toHaveBeenCalledWith('blur', expect.any(Function));
    removeSpy.mockRestore();
  });
});

describe('AutocompleteComponent — blurOnSelect wiring (B9)', () => {
  @Component({
    imports: [AutocompleteComponent],
    template: `<autocomplete [options]="o" [(value)]="v" [getOptionLabel]="id" [blurOnSelect]="true" />`,
  })
  class Host { o = ['A', 'B']; v: string | null = null; id = (x: string) => x; }

  it('blurs the input after a click-select when blurOnSelect is true', async () => {
    const f = TestBed.createComponent(Host); await f.whenStable(); f.detectChanges();
    const input = f.debugElement.query(By.css('input.ng-input')).nativeElement as HTMLInputElement;
    input.focus();
    input.value = 'A';
    input.dispatchEvent(new Event('input'));
    f.detectChanges(); await f.whenStable();
    expect(document.activeElement).toBe(input);

    f.debugElement.queryAll(By.css('[role="option"]'))[0].nativeElement
      .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    f.detectChanges(); await f.whenStable();

    expect(f.componentInstance.v).toBe('A');
    expect(document.activeElement).not.toBe(input);
  });
});

describe('AutocompleteComponent — single-select chip (B6)', () => {
  @Component({
    imports: [AutocompleteComponent, NgValueDef],
    template: `
      <autocomplete [options]="o" [(value)]="v" [getOptionLabel]="id">
        <span *ngValue="let item; label as label" class="single-chip">{{ label }}</span>
      </autocomplete>`,
  })
  class Host { o = ['A', 'B']; v: string | null = 'A'; id = (x: string) => x; }

  it('renders a chip for the single value', async () => {
    const f = TestBed.createComponent(Host); await f.whenStable(); f.detectChanges();
    expect(f.debugElement.query(By.css('.single-chip')).nativeElement.textContent.trim()).toBe('A');
  });

  it('Backspace on empty input clears the single value', async () => {
    const f = TestBed.createComponent(Host); await f.whenStable(); f.detectChanges();
    const input = f.debugElement.query(By.css('input.ng-input')).nativeElement as HTMLInputElement;
    // Chip mode: the text mirror stays empty (the chip itself shows the label) —
    // asserting this first stops the test from passing for the wrong reason,
    // since dispatching an 'input' event with '' already clears the value via
    // the pre-existing (non-chip) empty-input-clears logic.
    expect(input.value).toBe('');
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true }));
    f.detectChanges(); await f.whenStable();
    expect(f.componentInstance.v).toBeNull();
  });
});
