import { NgDocPage } from '@ng-doc/core';
import ButtonsCategory from '../ng-doc.category';
import { SuccessButtonOpenInStackblitzComponent } from './open-in-stackblitz.component';

const SuccessButtonPage: NgDocPage = {
	title: 'Success Button',
	mdFile: './index.md',
	category: ButtonsCategory,
	order: 13,
	demos: { SuccessButtonOpenInStackblitzComponent },
};

export default SuccessButtonPage;
