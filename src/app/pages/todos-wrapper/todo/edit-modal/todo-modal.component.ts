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
  /** A FormGroup instance that represents the form for editing a todo item. */
  editTodoForm!: FormGroup;
  /** An instance that represents the input field for the edited todo text. */
  todo!: FormControl;
  /** A string that holds the current value of the todo item being edited. */
  todoValue : string = '';
  /** An instance of a custom Todo class that represents the todo item being edited. */
  taskObj : Todo = new Todo();
  /** An array of Todo instances that holds all the todo items in the list. */
  todoArr!: Todo[];


  /**
   * @param Inject(MAT_DIALOG_DATA) public todoData: Todo is a parameter decorated with @Inject that injects the data passed into the dialog component. It's assumed to be a Todo instance that represents the todo item being edited.
   * @param todoService  is a parameter that represents the injected service that handles the CRUD operations for todo items.
   * @param popupRef is a parameter that represents the injected reference to the parent dialog component. It's used to close the dialog when the todo item is updated.
   * @param notifierService is a parameter that represents the injected service that displays notifications to the user.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public todoData: Todo, private todoService : TodosService, private popupRef: MatDialogRef<TodoModalComponent>, private notifierService: NotifierService) {
  }


  /** The OnInit initializes the form control and form group for the edit todo input field, and sets the initial value of the todo text from the injected data if it exists. */
  ngOnInit(): void {
    this.todo = new FormControl('', [Validators.required, Validators.minLength(10)]);
    this.editTodoForm = new FormGroup({todo: this.todo})
    if (this.todoData) {
      this.todoValue = this.todoData.todo_name;
    }
  }


  /**
   * This is a helper method that calls the getAllTodo() method of the injected TodoService instance to retrieve all todo items. It uses the subscribe() method of the Observable returned by getAllTodo() to set the todoArr property of the component to the returned array of todo items if successful. If there's an error, it shows an error notification to the user.
   */
  getAllTodo() {
    this.todoService.getAllTodo().subscribe(
      res => this.todoArr = res,
      err => this.notifierService.showNotification('Something went wrong. could not fetch todos', 'ok', 'error')
    )
  }


/**
 * This method updates a todo item by calling the editTodo method of the TodoService. If the new todo item name already exists in the todo list, it displays an error message to the user. Otherwise, it displays a success message and closes the modal dialog.
 */
updateTodo() { 
  if (this.editTodoForm.valid) { // check if the form is valid
    this.getAllTodo(); // get all the todo items
    this.taskObj.todo_name = this.todoValue; // set the todo name property of the task object to the new value
    this.taskObj.id = this.todoData.id; // set the id property of the task object to the id of the current todo item
    const todoExist = this.todoArr.find(todo => todo.todo_name === this.taskObj.todo_name); // check if a todo item with the same name already exists in the todo array
    if (!todoExist) { // if the todo item with the new name does not already exist
      this.todoService.editTodo(this.taskObj).subscribe(res => { // call the editTodo method of the todo service to update the todo item on the server
        this.notifierService.showNotification('Todo has been updated Successfully', 'ok', 'success'); // display a success notification to the user
        this.popupRef.close('updated'); // close the dialog popup
      }, err=> { // if there's an error
        this.notifierService.showNotification('Something went wrong, could not update todo pls try again', 'ok', 'error'); // display an error notification to the user
      });
    } else { // if the todo item with the new name already exists
      this.notifierService.showNotification('A todo with the edited name already exist in your list, pls enter a new name', 'ok', 'error'); // display an error notification to the user
    }
  }
}
}
