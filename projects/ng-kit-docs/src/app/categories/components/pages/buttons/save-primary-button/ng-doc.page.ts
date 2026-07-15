import { NgDocPage } from '@ng-doc/core';
import ButtonsCategory from '../ng-doc.category';
import { SavePrimaryButtonOpenInStackblitzComponent } from './open-in-stackblitz.component';

const SavePrimaryButtonPage: NgDocPage = {
	title: 'Save Primary Button',
	mdFile: './index.md',
	category: ButtonsCategory,
	order: 12,
	demos: { SavePrimaryButtonOpenInStackblitzComponent },
};

export default SavePrimaryButtonPage;
