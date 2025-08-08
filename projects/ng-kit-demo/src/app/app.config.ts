import { CommonModule, DatePipe } from '@angular/common';
import { provideHttpClient, withFetch, withXsrfConfiguration } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
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
			MatSelectModule,
			MatAutocompleteModule,
			MatNativeDateModule,
			MatDatepickerModule,
		),
		provideHttpClient(withXsrfConfiguration({ headerName: 'X-XSRF-TOKEN' }), withFetch()),
		Title,
		DatePipe,
		{
			provide: MAT_DIALOG_DEFAULT_OPTIONS,
			useValue: { hasBackdrop: true, disableClose: true },
		},
	],
};
