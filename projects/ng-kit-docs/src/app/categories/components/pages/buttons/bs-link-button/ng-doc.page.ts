import { NgDocPage } from '@ng-doc/core';
import ButtonsCategory from '../ng-doc.category';
import { BsLinkButtonOpenInStackblitzComponent } from './open-in-stackblitz.component';

const BsLinkButtonPage: NgDocPage = {
	title: 'Bootstrap Link Button',
	mdFile: './index.md',
	category: ButtonsCategory,
	order: 2,
	demos: { BsLinkButtonOpenInStackblitzComponent },
};

export default BsLinkButtonPage;
