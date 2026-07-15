import { NgDocPage } from '@ng-doc/core';
import ComponentsCategory from '../../ng-doc.category';
import { AlertDemoComponent } from '@ng-kit-demo/alert-demo/alert-demo.component';

const Alert: NgDocPage = {
	title: 'Alert',
	mdFile: './index.md',
	order: 0,
	category: ComponentsCategory,
	demos: { AlertDemoComponent },
};

export default Alert;
