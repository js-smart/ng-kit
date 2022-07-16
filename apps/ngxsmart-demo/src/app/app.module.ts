import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AutocompleteDemoComponent } from './autocomplete-demo/autocomplete-demo.component';
import { RouterModule } from '@angular/router';
import { AlertDemoComponent } from './alert-demo/alert-demo.component';
import { EditSvgIconDemoComponent } from './edit-svg-icon-demo/edit-svg-icon-demo.component';
import { HttpClientModule } from '@angular/common/http';
import { ButtonsDemoComponent } from './buttons-demo/buttons-demo.component';
import { DirectivesDemoComponent } from './directives-demo/directives-demo.component';
import { SnackBarDemoComponent } from './snack-bar-demo/snack-bar-demo.component';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		HttpClientModule,
		RouterModule.forRoot([
			{ path: 'autocomplete-demo', component: AutocompleteDemoComponent },
			{ path: 'alert-demo', component: AlertDemoComponent },
			{ path: 'edit-svg-icon-demo', component: EditSvgIconDemoComponent },
			{ path: 'buttons-demo', component: ButtonsDemoComponent },
			{ path: 'directives-demo', component: DirectivesDemoComponent },
			{ path: 'snack-bar-demo', component: SnackBarDemoComponent },
		]),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
