import { appConfig } from './app/app.config';

import { AppComponent } from './app/app.component';

import { environment } from './environments/environment';

if (environment.production) {
	enableProdMode();
}

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error('Unable to Boostrap the application. Error:' + err));
