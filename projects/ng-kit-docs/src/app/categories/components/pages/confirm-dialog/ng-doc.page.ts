import { NgDocPage } from '@ng-doc/core';
import ComponentsCategory from '../../ng-doc.category';
import { ConfirmDialogOpenInStackblitzComponent } from './open-in-stackblitz.component';

const ConfirmDialog: NgDocPage = {
	title: 'Confirm Dialog',
	mdFile: './index.md',
	order: 3,
	category: ComponentsCategory,
	demos: { ConfirmDialogOpenInStackblitzComponent },
};

export default ConfirmDialog;
