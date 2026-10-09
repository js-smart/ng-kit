import { Component, DOCUMENT, OnDestroy, ViewEncapsulation } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgKitStyleLoader } from './style-loader';

const MARKER = 'ngk-style-loader-spec-marker';

@Component({
	selector: 'ngk-style-loader-spec-styles',
	template: '',
	styles: `
		.${MARKER} {
			color: red;
		}
	`,
	encapsulation: ViewEncapsulation.None,
})
class TestStyles implements OnDestroy {
	static instances = 0;
	static destroyed = 0;

	constructor() {
		TestStyles.instances++;
	}

	ngOnDestroy(): void {
		TestStyles.destroyed++;
	}
}

describe('NgKitStyleLoader', () => {
	let loader: NgKitStyleLoader;
	let document: Document;

	const markerStyles = (): HTMLStyleElement[] =>
		Array.from(document.head.querySelectorAll('style')).filter((style) => style.textContent?.includes(MARKER));

	beforeEach(() => {
		TestStyles.instances = 0;
		TestStyles.destroyed = 0;
		loader = TestBed.inject(NgKitStyleLoader);
		document = TestBed.inject(DOCUMENT);
	});

	it('should add the component styles to the document head', () => {
		loader.load(TestStyles);

		expect(markerStyles().length).toBe(1);
	});

	it('should instantiate a styles component only once', () => {
		loader.load(TestStyles);
		loader.load(TestStyles);

		expect(TestStyles.instances).toBe(1);
		expect(markerStyles().length).toBe(1);
	});

	it('should not attach the styles component to the DOM', () => {
		loader.load(TestStyles);

		expect(document.querySelector('ngk-style-loader-spec-styles')).toBeNull();
	});

	it('should destroy loaded components when the application is destroyed', () => {
		loader.load(TestStyles);
		expect(TestStyles.destroyed).toBe(0);

		TestBed.resetTestingModule();

		expect(TestStyles.destroyed).toBe(1);
		expect(markerStyles().length).toBe(0);
	});
});
