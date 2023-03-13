import { Component } from '@angular/core';

@Component({
  selector: 'app-todo-modal',
  template: `
  <div style="display: flex; justify-content: space-between;">
    <h1 mat-dialog-title>Edit Todo</h1>
    <div mat-dialog-actions>
    <button mat-button mat-dialog-close><mat-icon>close</mat-icon></button>
  </div>
  </div>
  <mat-divider></mat-divider>
<div mat-dialog-content>
      <mat-form-field class="example-full-width">
        <input matInput name="editTodo">
      </mat-form-field>

      <button mat-raised-button color="primary">
        Update
      </button>
</div>
  `,
  styles: [
    `
    mat-form-field {
  width: 70%;
}

button:last-child {
  margin-left: 10px;
}

    `
  ]
})
export class TodoModalComponent {

}
