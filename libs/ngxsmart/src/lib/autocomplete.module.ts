import { NgModule } from '@angular/core';
import { ObjectAutocompleteComponent } from './components/object-autocomplete/object-autocomplete.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { StringAutocompleteComponent } from './components/string-autocomplete/string-autocomplete.component';
import { TypeOfPipe } from './pipes/type-of.pipe';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';

@NgModule({
	declarations: [ObjectAutocompleteComponent, StringAutocompleteComponent, TypeOfPipe, AutocompleteComponent],
	imports: [MatFormFieldModule, ReactiveFormsModule, MatAutocompleteModule, MatInputModule, MatButtonModule, MatIconModule, CommonModule],
	exports: [ObjectAutocompleteComponent, StringAutocompleteComponent, AutocompleteComponent],
})
export class AutocompleteModule {}
