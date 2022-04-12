import { Component, Input, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { EditSolidSvgComponentModule } from "../../svg-icons/edit-solid-svg/edit-solid-svg.component";

@Component({
  selector: "edit-bs-button",
  template: `
    <button
      class="text-primary"
      mat-button
      color="primary"
      data-cy="edit-bs-button"
      type="{{type}}"
    >
      <edit-solid-svg></edit-solid-svg>
      Edit
    </button>
  `,
  styles: []
})
export class EditBsButtonComponent {
  /**
   * Type of the button. Following values are supported. See BootStrap docs for mor
   * e information
   * <pre>
   *   1. button
   *   2. submit
   * </pre>
   */
  @Input() type = "button";

  /**
   * If set, shows the label
   */
  @Input() label = "Edit";
}

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule, EditSolidSvgComponentModule],
  declarations: [EditBsButtonComponent],
  exports: [EditBsButtonComponent]
})
export class EditBsButtonComponentModule {
}
