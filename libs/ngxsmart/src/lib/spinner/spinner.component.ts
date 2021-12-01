import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'spinner,lib-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  /**
   *  Use Boostrap Spinner. Default `true`
   */
  @Input() bootstrapSpinner = true;

  /**
   * Diameter of the Angular Material spinner
   */
  @Input() diameter = 50;

  /**
   *  Color of the Angular Material spinner
   */
  @Input() color: ThemePalette = 'primary';

  /**
   *  Stroke Width of the Angular Material spinner
   */
  @Input() strokeWidth = 5;

  constructor() {}

  ngOnInit(): void {}
}
