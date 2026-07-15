import { NgDocPage } from '@ng-doc/core';
import ComponentsCategory from '../../ng-doc.category';
import { AutocompleteOpenInStackblitzComponent } from './open-in-stackblitz.component';

const Autocomplete: NgDocPage = {
	title: 'Autocomplete',
	mdFile: './index.md',
	order: 1,
	category: ComponentsCategory,
	demos: { AutocompleteOpenInStackblitzComponent },
};

export default Autocomplete;
