import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [AlertComponent],
	imports: [CommonModule],
	exports: [AlertComponent],
})
export class AlertModule {}
