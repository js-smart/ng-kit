import { NgDocPage } from '@ng-doc/core';
import ButtonsCategory from '../ng-doc.category';
import { ViewPrimaryButtonOpenInStackblitzComponent } from './open-in-stackblitz.component';

const ViewPrimaryButtonPage: NgDocPage = {
	title: 'View Primary Button',
	mdFile: './index.md',
	category: ButtonsCategory,
	order: 16,
	demos: { ViewPrimaryButtonOpenInStackblitzComponent },
};

export default ViewPrimaryButtonPage;
