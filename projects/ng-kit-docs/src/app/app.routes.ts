import { Routes } from '@angular/router';
import { NG_DOC_ROUTING } from 'ng-doc/ng-kit-docs';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		data: { title: 'Home' },
	},
	...NG_DOC_ROUTING,
	{
		path: '**',
		redirectTo: 'getting-started/introduction',
		pathMatch: 'full',
	},
];
