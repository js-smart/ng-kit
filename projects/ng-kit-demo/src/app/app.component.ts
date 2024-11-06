import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'ng-kit-root',
    templateUrl: './app.component.html',
    imports: [RouterOutlet, RouterLink]
})
export class AppComponent {}
