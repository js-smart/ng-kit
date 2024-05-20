import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withXsrfConfiguration } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
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
		provideHttpClient(withXsrfConfiguration({ headerName: 'X-XSRF-TOKEN' })),
		Title,
		DatePipe,
		{
			provide: MAT_DIALOG_DEFAULT_OPTIONS,
			useValue: { hasBackdrop: true, disableClose: true },
		},
	],
};
