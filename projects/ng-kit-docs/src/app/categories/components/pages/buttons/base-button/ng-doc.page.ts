import { NgDocPage } from '@ng-doc/core';
import ButtonsCategory from '../ng-doc.category';
import { BaseButtonOpenInStackblitzComponent } from './open-in-stackblitz.component';

const BaseButtonPage: NgDocPage = {
	title: 'Base Button',
	mdFile: './index.md',
	category: ButtonsCategory,
	order: 1,
	demos: { BaseButtonOpenInStackblitzComponent },
};

export default BaseButtonPage;
