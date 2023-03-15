import { Component, OnDestroy, OnInit } from '@angular/core';
import {  FormControl, FormGroup,  Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { Todo, BtnState } from 'src/app/model/project';
import { TodosService } from 'src/app/services/todo.service';
import { TodoModalComponent } from './edit-modal/todo-modal.component';
import { NotifierService } from '../../../services/notifier.service';



@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
/** An instance of the FormGroup class that holds the to-do item form */
  todoForm!: FormGroup;
/** An instance of the FormControl class that represents the to-do item input field.*/
  todo!: FormControl;
/** An instance of the Todo class that represents a to-do item.*/
  todoObj : Todo = new Todo();
/** An array of Todo objects that represents all the to-do items.*/
  todoArr : Todo[] = [];
/** A string that holds the value of the to-do item being added.*/
  todoValue : string = '';


  /**
   * The constructor of this class takes in three parameters
   * @param todoService A service that handles to-do items.
   * @param dialog A dialog box that is used to edit to-do items.
   * @param notifierService  service that displays notifications to the user.
   */
  constructor(private todoService : TodosService, public dialog: MatDialog, private notifierService: NotifierService) { }


  /**
   * The ngOnInit method is called when the component is initialized. It sets up the todo and todoForm properties, and then calls the getAllTodo method to get all the to-do items.
  */
  ngOnInit(): void {
    this.todo = new FormControl('', [Validators.required, Validators.minLength(10)]);
    this.todoForm = new FormGroup({todo: this.todo})
    this.getAllTodo();

  }


  /**
   * This method calls the getAllTodo method of the todoService service to get all the to-do items. If the call is successful, it sets the todoArr property to the response. If there is an error, it displays an error notification.
   */
  getAllTodo() {
    this.todoService.getAllTodo().subscribe(res => {
      this.todoArr = res;
    }, err => {
      this.notifierService.showNotification('Something went wrong, Could not fetch todos, pls try again', 'ok', 'error');
    });
  }


  /**
   * This method is called when the user clicks the "Add" button to add a new to-do item. If the form is valid, it sets the todo_name property of the todoObj object to the value of the todoValue property. It then checks whether a to-do item with the same name already exists. If it does not exist, it calls the addTodo method of the todoService service to add the new to-do item. If the addition is successful, it displays a success notification and calls the getAllTodo method to get all the to-do items. If there is an error, it displays an error notification. If a to-do item with the same name already exists, it displays an error notification.
   */
  addTodo() {
    if(this.todoForm.valid) {
      this.todoObj.todo_name = this.todoValue;
      let todoExist = this.todoArr.find(todo => todo.todo_name === this.todoObj.todo_name);
      if (!todoExist) {
        this.todoService.addTodo(this.todoObj).subscribe(res => {
          this.notifierService.showNotification('Todo added to your list successfully', 'ok', 'success');
          this.getAllTodo();
        }, err => {
          this.notifierService.showNotification('Could not add todo, pls try again', 'ok', 'error');
        })
      }
      else {
        this.notifierService.showNotification('A todo with the provided name already exist in your list, pls enter a new name', 'ok', 'error')
      }
    this.todoForm.reset();
  }
}


/**
 * This method is called when the user clicks the "Edit" button to edit a to-do item. It opens the TodoModalComponent dialog box and passes in the selected to-do item as data. After the dialog box is closed, it calls the getAllTodo method to get all the to-do items if the dialog box was closed with the "updated" value that indicates that an item was updated.
 * @param todo is the selected to-do item to be updated
 */
  openTodo(todo: Todo) {
    this.dialog.open(TodoModalComponent, {
      width: "40%",
      data: todo
    }).afterClosed().subscribe(val => val === 'updated' ? this.getAllTodo() : '');
  }


  /**
   * This method is called when the user clicks the "Delete" button to delete a to-do item. It calls the deleteTodo method of the todoService service to delete the selected to-do item. If the deletion is successful, it displays a success notification and calls the getAllTodo method to get all the to-do items. If there is an error, it displays an error notification.
   * @param todo is the selected to-do item to be deleted
   */
  deleteTodo(todo : Todo) {
    this.todoService.deleteTodo(todo).subscribe(res => {
      this.notifierService.showNotification('Todo deleted successfully', 'ok', 'success');
      this.getAllTodo();
    }, err => {
      this.notifierService.showNotification('Could not delete todo, pls try again', 'ok', 'error');
    });
  }
}
