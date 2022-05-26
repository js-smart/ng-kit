import { NgModule } from '@angular/core';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { NgxSpinnerComponent } from './ngx-spinner/ngx-spinner.component';
import { SafeHtmlPipe } from './ngx-spinner/safe-html.pipe';

@NgModule({
	declarations: [SpinnerComponent, NgxSpinnerComponent, SafeHtmlPipe],
	imports: [MatProgressSpinnerModule, CommonModule],
	exports: [SpinnerComponent, NgxSpinnerComponent],
})
export class SpinnerModule {}
