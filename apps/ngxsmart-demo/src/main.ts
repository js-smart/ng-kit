import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { bootstrapApplication, BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { environment } from './environments/environment';

if (environment.production) {
	enableProdMode();
}

bootstrapApplication(AppComponent, {
	providers: [
		importProvidersFrom(
			BrowserModule,
			CommonModule,
			RouterModule.forRoot(routes, {
				anchorScrolling: 'enabled',
				onSameUrlNavigation: 'reload',
				scrollPositionRestoration: 'enabled',
				preloadingStrategy: PreloadAllModules,
				enableTracing: false,
			}),
			FormsModule,
			ReactiveFormsModule,
			BrowserAnimationsModule,
			HttpClientModule,
			HttpClientXsrfModule.withOptions(),
			MatSelectModule,
			MatAutocompleteModule,
			MatNativeDateModule,
			MatDatepickerModule
		),
		Title,
		DatePipe,
		{
			provide: MAT_DIALOG_DEFAULT_OPTIONS,
			useValue: { hasBackdrop: true, disableClose: true },
		},
	],
}).catch((err) => console.error('Unable to Boostrap the application. Error:' + err));
