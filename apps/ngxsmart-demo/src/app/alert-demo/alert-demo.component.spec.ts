import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDemoComponent } from './alert-demo.component';

describe('AlertDemoComponent', () => {
	let component: AlertDemoComponent;
	let fixture: ComponentFixture<AlertDemoComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AlertDemoComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AlertDemoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
