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
      <form [formGroup]="editTodoForm">
      <mat-form-field class="example-full-width">
        <mat-label> Enter Edited Todo </mat-label>
        <input matInput placeholder="Update James Details" [(ngModel)]="todoValue"  formControlName="todo">
      </mat-form-field>

      <button mat-raised-button color="primary" (click)="updateTodo()">
        Update
      </button>
      <div *ngIf="todo.errors && (todo.dirty || todo.touched)">
          <span *ngIf="todo.errors.required">Todo Name is required</span>
          <span *ngIf="todo.errors.minlength">Todo should be at least 10 characters long</span>
        </div>
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

    span {
      color: red;
    }
    `
  ]
})
export class TodoModalComponent implements OnInit{
  editTodoForm!: FormGroup;
  todo!: FormControl;
  todoValue : string = '';
  taskObj : Todo = new Todo();
  todoArr!: Todo[];

  constructor(@Inject(MAT_DIALOG_DATA) public todoData: Todo, private todoService : TodosService, private popupRef: MatDialogRef<TodoModalComponent>, private notifierService: NotifierService) {
  }

  ngOnInit(): void {
    this.todo = new FormControl('', [Validators.required, Validators.minLength(10)]);
    this.editTodoForm = new FormGroup({todo: this.todo})
    if (this.todoData) {
      this.todoValue = this.todoData.todo_name;
    }
  }

  getAllTodo() {
    this.todoService.getAllTodo().subscribe(
      res => this.todoArr = res,
      err => this.notifierService.showNotification('Something went wrong. could not fetch todos', 'ok', 'error')
    )
  }

  updateTodo() {
  if (this.editTodoForm.valid) {
    this.getAllTodo();
    this.taskObj.todo_name = this.todoValue;
    this.taskObj.id = this.todoData.id;
    const todoExist = this.todoArr.find(todo => todo.todo_name === this.taskObj.todo_name);
    if (!todoExist) {
      this.todoService.editTodo( this.taskObj).subscribe(res => {
        this.notifierService.showNotification('Todo has been updated Successfully', 'ok', 'success')
            this.popupRef.close('updated');
      }, err=> {
        this.notifierService.showNotification('Something went wrong, could not update todo pls try again', 'ok', 'error');
      })
    }
    else {
      this.notifierService.showNotification('A todo with the edited name already exist in your list, pls enter a new name', 'ok', 'error');
    }
  }
  }
}
