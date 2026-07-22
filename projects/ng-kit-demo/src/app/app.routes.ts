import { Route } from '@angular/router';
import { GALLERY_PAGES } from './gallery/gallery-registry';
// Legacy standalone demo components — kept routable at their original
// `/<name>-demo` paths so existing e2e specs continue to pass while the
// gallery pages become the primary navigation.
import { AlertDemoComponent } from './alert-demo/alert-demo.component';
import { QueryDemoComponent } from './query-demo/query-demo.component';
import { AutocompleteDemoComponent } from './autocomplete-demo/autocomplete-demo.component';
import { AutocompleteSuffixDemoComponent } from './autocomplete-suffix-demo/autocomplete-suffix-demo.component';
import { ButtonsDemoComponent } from './buttons-demo/buttons-demo.component';
import { ConfirmDialogDemoComponent } from './confirm-dialog-demo/confirm-dialog-demo.component.html-demo.component';
import { DirectivesDemoComponent } from './directives-demo/directives-demo.component';
import { EditSvgIconDemoComponent } from './edit-svg-icon-demo/edit-svg-icon-demo.component';
import { NgxPrintDemoComponent } from './ngx-print-demo/ngx-print-demo';
import { ProgressStateDemoComponent } from './progress-state-demo/progress-state-demo.component';
import { SnackBarDemoComponent } from './snack-bar-demo/snack-bar-demo.component';

export const routes: Route[] = [
	{ path: '', pathMatch: 'full', loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage) },

	// Gallery pages (primary navigation), generated from the registry.
	...GALLERY_PAGES.map((page) => ({ path: page.slug, loadComponent: page.load })),

	// Grouped landing redirects: the old flat routes now point at the group's
	// introduction page (each family member has its own nested route).
	{ path: 'buttons', pathMatch: 'full', redirectTo: 'buttons/introduction' },
	{ path: 'autocomplete', pathMatch: 'full', redirectTo: 'autocomplete/introduction' },

	// Legacy demo routes (kept for backward compatibility / existing e2e specs).
	{ path: 'autocomplete-demo', component: AutocompleteDemoComponent },
	{ path: 'autocomplete-suffix-demo', component: AutocompleteSuffixDemoComponent },
	{ path: 'alert-demo', component: AlertDemoComponent },
	{ path: 'confirm-dialog-demo', component: ConfirmDialogDemoComponent },
	{ path: 'edit-svg-icon-demo', component: EditSvgIconDemoComponent },
	{ path: 'buttons-demo', component: ButtonsDemoComponent },
	{ path: 'directives-demo', component: DirectivesDemoComponent },
	{ path: 'snack-bar-demo', component: SnackBarDemoComponent },
	{ path: 'progress-state-demo', component: ProgressStateDemoComponent },
	{ path: 'ngx-print-demo', component: NgxPrintDemoComponent },
	{ path: 'query-demo', component: QueryDemoComponent },

	{ path: '**', redirectTo: '' },
];
