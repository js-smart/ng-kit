import { NgDocPage } from '@ng-doc/core';
import ButtonsCategory from '../ng-doc.category';
import { ExcelExportButtonOpenInStackblitzComponent } from './open-in-stackblitz.component';

const ExcelExportButtonPage: NgDocPage = {
	title: 'Excel Export Button',
	mdFile: './index.md',
	category: ButtonsCategory,
	order: 8,
	demos: { ExcelExportButtonOpenInStackblitzComponent },
};

export default ExcelExportButtonPage;
