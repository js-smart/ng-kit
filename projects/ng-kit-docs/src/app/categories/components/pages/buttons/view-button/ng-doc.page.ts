import { NgDocPage } from '@ng-doc/core';
import ButtonsCategory from '../ng-doc.category';
import { ViewButtonOpenInStackblitzComponent } from './open-in-stackblitz.component';

const ViewButtonPage: NgDocPage = {
	title: 'View Button',
	mdFile: './index.md',
	category: ButtonsCategory,
	order: 15,
	demos: { ViewButtonOpenInStackblitzComponent },
};

export default ViewButtonPage;
