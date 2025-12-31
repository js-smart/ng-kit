import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { provideAnimations } from '@angular/platform-browser/animations';
import {
	NG_DOC_DEFAULT_PAGE_PROCESSORS,
	NG_DOC_DEFAULT_PAGE_SKELETON,
	NgDocDefaultSearchEngine,
	provideMainPageProcessor,
	provideNgDocApp,
	providePageSkeleton,
	provideSearchEngine,
} from '@ng-doc/app';
import { NG_DOC_ROUTING, provideNgDocContext } from 'ng-doc/ng-kit-docs';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideAnimations(),
		provideBrowserGlobalErrorListeners(),
		provideZonelessChangeDetection(),
		provideRouter(routes),
		provideRouter(
			NG_DOC_ROUTING,
			withInMemoryScrolling({
				scrollPositionRestoration: 'enabled',
				anchorScrolling: 'enabled',
			}),
		),
		// NgDoc providers
		provideNgDocApp(),
		provideNgDocContext(),
		provideSearchEngine(NgDocDefaultSearchEngine),
		providePageSkeleton(NG_DOC_DEFAULT_PAGE_SKELETON),
		provideMainPageProcessor(NG_DOC_DEFAULT_PAGE_PROCESSORS),
	],
};
