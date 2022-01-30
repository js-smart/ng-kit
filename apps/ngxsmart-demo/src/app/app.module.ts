import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AutocompleteModule } from '@ngxsmart/ngxsmart';
import { AutocompleteDemoComponent } from './autocomplete-demo/autocomplete-demo.component';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [AppComponent, AutocompleteDemoComponent],
	imports: [BrowserModule, BrowserAnimationsModule, ReactiveFormsModule, AutocompleteModule, RouterModule.forRoot([
    { path: 'autocomplete-demo', component: AutocompleteDemoComponent }
  ])],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
