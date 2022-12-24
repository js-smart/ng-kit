import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
	standalone: true,
	selector: 'ngxsmart-root',
	templateUrl: './app.component.html',
	imports: [RouterOutlet, RouterLink],
})
export class AppComponent {}
