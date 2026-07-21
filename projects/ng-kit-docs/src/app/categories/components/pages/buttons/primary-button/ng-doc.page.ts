import { NgDocPage } from '@ng-doc/core';
import ButtonsCategory from '../ng-doc.category';
import { PrimaryButtonOpenInStackblitzComponent } from './open-in-stackblitz.component';

const PrimaryButtonPage: NgDocPage = {
	title: 'Primary Button',
	mdFile: './index.md',
	category: ButtonsCategory,
	order: 11,
	demos: { PrimaryButtonOpenInStackblitzComponent },
};

export default PrimaryButtonPage;
