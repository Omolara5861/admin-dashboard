import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Todo } from '../../../../model/project';
import { TodosService } from 'src/app/services/todo.service';
import { NotifierService } from '../../../../services/notifier.service';

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
      <form>
      <mat-form-field class="example-full-width">
        <input matInput [(ngModel)]="todoValue">
      </mat-form-field>

      <button mat-raised-button color="primary" (click)="updateTodo()">
        Update
      </button>
      </form>
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
export class TodoModalComponent implements OnInit{
  todoValue : string = '';
  taskObj : Todo = new Todo();

  constructor(@Inject(MAT_DIALOG_DATA) public todoData: Todo, private todoService : TodosService, private popupRef: MatDialogRef<TodoModalComponent>, private notifierService: NotifierService) {
  }

  ngOnInit(): void {
    if (this.todoData) {
      this.todoValue = this.todoData.todo_name;
    }
  }

  updateTodo() {
    this.taskObj.todo_name = this.todoValue;
    this.taskObj.id = this.todoData.id;
    this.todoService.editTodo( this.taskObj).subscribe(res => {
      this.notifierService.showNotification('Todo has been updated Successfully', 'ok', 'success')
          this.popupRef.close('updated');
    }, err=> {
      this.notifierService.showNotification('Something went wrong, could not update todo pls try again', 'ok', 'error');
    })
  }
}
