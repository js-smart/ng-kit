import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertModule, AutocompleteModule } from "@ngxsmart/ngxsmart";
import { AutocompleteDemoComponent } from './autocomplete-demo/autocomplete-demo.component';
import { RouterModule } from '@angular/router';
import { AlertDemoComponent } from './alert-demo/alert-demo.component';

@NgModule({
	declarations: [AppComponent, AutocompleteDemoComponent, AlertDemoComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		AutocompleteModule,
		AlertModule,
		RouterModule.forRoot([
			{ path: 'autocomplete-demo', component: AutocompleteDemoComponent },
			{ path: 'alert-demo', component: AlertDemoComponent },
		]),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
