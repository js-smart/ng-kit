import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-alert, alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  /**
   * Type of the BootStrap Alert. Following values are supported. See BootStrap docs for more information
   * <pre>
   *   1. info
   *   2. primary
   *   3. secondary
   *   4. success
   *   5. warning
   *   6. danger
   *   7. dark
   *   8. light
   * </pre>
   */
  @Input() type = 'info';

  /**
   *  Is alert visible or open
   */
  @Input() isOpen = true;

  /**
   * If set, displays an inline “Close” button
   */
  @Input() dismissible = true;

  /**
   * If set, dismisses the alert after Dismiss Timeout
   */
  @Input() dismissOnTimeout = true;

  /**
   * Number in milliseconds, after which alert will be closed. Default value is 5000 ms
   */
  @Input() dismissTimeout = 5000;

  constructor() {}

  ngOnInit(): void {
    this.openAlert();

    if (this.dismissOnTimeout) {
      setTimeout(() => {
        this.closeAlert();
      }, this.dismissTimeout);
    }
  }

  /**
   * Closes BootStrap Alert if not open
   */
  closeAlert(): void {
    if (!this.isOpen) {
      return;
    }
    this.isOpen = false;
  }

  /**
   * Opens Bootstrap Alert
   */
  private openAlert(): void {
    this.isOpen = true;
  }
}
