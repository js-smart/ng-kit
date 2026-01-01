import { CommonModule, Location } from '@angular/common';
import { Component, HostBinding, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgDocNavbarComponent, NgDocRootComponent, NgDocSidebarComponent, NgDocThemeToggleComponent } from '@ng-doc/app';
import { NgDocButtonIconComponent, NgDocIconComponent, NgDocTooltipDirective } from '@ng-doc/ui-kit';

@Component({
	selector: 'app-root',
	imports: [
		RouterOutlet,
		CommonModule,
		NgDocRootComponent,
		NgDocNavbarComponent,
		NgDocSidebarComponent,
		NgDocIconComponent,
		NgDocButtonIconComponent,
		NgDocThemeToggleComponent,
		NgDocTooltipDirective,
	],
	templateUrl: './app.html',
	styleUrls: ['./app.scss'],
})
export class App {
	protected readonly location = inject(Location);

	@HostBinding('attr.data-ng-doc-is-landing')
	get isLandingPage(): boolean {
		return this.location.path() === '';
	}
}
