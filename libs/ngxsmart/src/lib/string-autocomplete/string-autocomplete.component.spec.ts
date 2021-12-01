import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StringAutocompleteComponent } from './string-autocomplete.component';

describe('StringAutocompleteComponent', () => {
  let component: StringAutocompleteComponent;
  let fixture: ComponentFixture<StringAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StringAutocompleteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StringAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
