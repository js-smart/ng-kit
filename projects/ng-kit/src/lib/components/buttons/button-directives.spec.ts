import { Component, DOCUMENT, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
	BsLinkButtonDirective,
	EditBsButtonDirective,
	EditSvgIconButtonDirective,
	ManageButtonDirective,
	PrimaryButtonDirective,
	ViewButtonDirective,
} from '@js-smart/ng-kit';

@Component({
	imports: [
		PrimaryButtonDirective,
		ViewButtonDirective,
		BsLinkButtonDirective,
		EditBsButtonDirective,
		EditSvgIconButtonDirective,
		ManageButtonDirective,
	],
	template: `
		<button data-testid="primary" primaryButton [loading]="loading()">Save</button>
		<button data-testid="view" viewButton>View</button>
		<a data-testid="link" bsLinkButton href="/path">Link</a>
		<button data-testid="edit-bs" editBsButton>Edit</button>
		<button data-testid="edit-svg" editSvgIconButton>Edit</button>
		<button data-testid="manage" manageButton>Manage</button>
	`,
})
class TestHostComponent {
	loading = signal(false);
}

describe('Button directives', () => {
	let fixture: ComponentFixture<TestHostComponent>;
	let host: HTMLElement;

	const button = (id: string): HTMLElement => host.querySelector(`[data-testid="${id}"]`) as HTMLElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
		fixture = TestBed.createComponent(TestHostComponent);
		host = fixture.nativeElement;
		fixture.detectChanges();
		await fixture.whenStable();
	});

	it('should keep the class names the directives have always emitted', () => {
		expect(Array.from(button('primary').classList)).toEqual(expect.arrayContaining(['btn', 'btn-primary', 'primary-button']));
		expect(Array.from(button('view').classList)).toContain('btn');
		expect(button('view').classList).not.toContain('btn-primary');
		expect(Array.from(button('link').classList)).toEqual(expect.arrayContaining(['btn', 'text-primary']));
		expect(Array.from(button('edit-bs').classList)).toEqual(expect.arrayContaining(['btn', 'text-primary', 'gap-1']));
		expect(Array.from(button('edit-svg').classList)).toEqual(expect.arrayContaining(['primary-button', 'gap-1']));
		expect(Array.from(button('manage').classList)).toEqual(expect.arrayContaining(['btn', 'mr-3', 'secondary-button']));
	});

	it('should mark icons with the spacing class', () => {
		expect(button('primary').querySelector('mat-icon')?.classList).toContain('pe-2');
		expect(button('link').querySelector('.material-icons')?.classList).toContain('pe-2');
	});

	it('should render the inline spinner while loading', () => {
		fixture.componentInstance.loading.set(true);
		fixture.detectChanges();

		const spinner = button('primary').querySelector('[role="status"]');
		expect(Array.from(spinner?.classList ?? [])).toEqual(['spinner-border', 'spinner-border-sm', 'me-2']);
		expect(button('primary').textContent).toContain('Saving...');
	});

	it('should add the button stylesheet to the document head once', () => {
		const styles = Array.from(TestBed.inject(DOCUMENT).head.querySelectorAll('style')).filter((style) =>
			style.textContent?.includes('.btn-primary'),
		);
		expect(styles.length).toBe(1);
		expect(styles[0].textContent).toContain('@layer ng-kit');
	});
});
