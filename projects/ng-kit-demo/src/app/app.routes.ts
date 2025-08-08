import { Route } from '@angular/router';
import { AlertDemoComponent } from './alert-demo/alert-demo.component';
import { AutocompleteDemoComponent } from './autocomplete-demo/autocomplete-demo.component';
import { ButtonsDemoComponent } from './buttons-demo/buttons-demo.component';
import { ConfirmDialogDemoComponent } from './confirm-dialog-demo/confirm-dialog-demo.component.html-demo.component';
import { DirectivesDemoComponent } from './directives-demo/directives-demo.component';
import { EditSvgIconDemoComponent } from './edit-svg-icon-demo/edit-svg-icon-demo.component';
import { ProgressStateDemoComponent } from './progress-state-demo/progress-state-demo.component';
import { SnackBarDemoComponent } from './snack-bar-demo/snack-bar-demo.component';
import { NgxPrintDemoComponent } from './ngx-print-demo/ngx-print-demo';

export const routes: Route[] = [
	{ path: 'autocomplete-demo', component: AutocompleteDemoComponent },
	{ path: 'alert-demo', component: AlertDemoComponent },
	{ path: 'confirm-dialog-demo', component: ConfirmDialogDemoComponent },
	{ path: 'edit-svg-icon-demo', component: EditSvgIconDemoComponent },
	{ path: 'buttons-demo', component: ButtonsDemoComponent },
	{ path: 'directives-demo', component: DirectivesDemoComponent },
	{ path: 'snack-bar-demo', component: SnackBarDemoComponent },
	{ path: 'progress-state-demo', component: ProgressStateDemoComponent },
	{ path: 'ngx-print-demo', component: NgxPrintDemoComponent },
];
