import { NgDocPage } from '@ng-doc/core';
import ComponentsCategory from '../../ng-doc.category';
import { AlertOpenInStackblitzComponent } from './open-in-stackblitz.component';

const Alert: NgDocPage = {
	title: 'Alert',
	mdFile: './index.md',
	order: 0,
	category: ComponentsCategory,
	demos: { AlertOpenInStackblitzComponent },
};

export default Alert;
