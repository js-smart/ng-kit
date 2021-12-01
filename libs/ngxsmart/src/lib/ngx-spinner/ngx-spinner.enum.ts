export const LOADERS = {
  'ball-clip-rotate': 1,
};

export const DEFAULTS = {
  BD_COLOR: 'rgba(51,51,51,0.8)',
  SPINNER_COLOR: '#fff',
  SPINNER_TYPE: 'ball-clip-rotate',
  Z_INDEX: 99999,
};

export const PRIMARY_SPINNER = 'primary';

export type Size = 'default' | 'small' | 'medium' | 'large';

export interface Spinner {
  bdColor?: string;
  size?: Size;
  color?: string;
  type?: string;
  fullScreen?: boolean;
  zIndex?: number;
  template?: string;
  showSpinner?: boolean;
}

export class NgxSpinner {
  name?: string;
  bdColor?: string;
  size?: Size;
  color?: string;
  type?: string;
  class?: string;
  divCount?: number;
  divArray?: Array<number>;
  fullScreen?: boolean;
  show?: boolean;
  zIndex?: number;
  template?: string;
  showSpinner?: boolean;

  constructor(init?: Partial<NgxSpinner>) {
    Object.assign(this, init);
  }
}
