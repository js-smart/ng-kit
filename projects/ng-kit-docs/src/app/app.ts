import { Component, inject } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { NgDocNavbarComponent, NgDocRootComponent, NgDocSidebarComponent, NgDocThemeToggleComponent } from '@ng-doc/app';
import { NgDocThemeService } from '@ng-doc/app/services/theme';
import { NgDocButtonIconComponent, NgDocIconComponent } from '@ng-doc/ui-kit';

@Component({
	selector: 'app-root',
	imports: [
		RouterOutlet,
		NgDocRootComponent,
		NgDocNavbarComponent,
		NgDocSidebarComponent,
		NgDocIconComponent,
		NgDocButtonIconComponent,
		NgDocThemeToggleComponent,
	],
	templateUrl: './app.html',
	styleUrls: ['./app.scss'],
})
export class App {
	private contexts = inject(ChildrenOutletContexts);
	private readonly themeService = inject(NgDocThemeService);

	constructor() {
		this.themeService.set('auto');
	}

	get routingAnimations() {
		return this.contexts.getContext('primary')?.route?.snapshot?.title;
	}
}
