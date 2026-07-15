import { NgDocPage } from '@ng-doc/core';
import ButtonsCategory from '../ng-doc.category';
import { CloseButtonOpenInStackblitzComponent } from './open-in-stackblitz.component';

const CloseButtonPage: NgDocPage = {
	title: 'Close Button',
	mdFile: './index.md',
	category: ButtonsCategory,
	order: 3,
	demos: { CloseButtonOpenInStackblitzComponent },
};

export default CloseButtonPage;
