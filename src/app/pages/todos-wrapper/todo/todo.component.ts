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
  todoForm!: FormGroup;
  todo!: FormControl;
  todoObj : Todo = new Todo();
  todoArr : Todo[] = [];

  todoValue : string = '';

  constructor(private todoService : TodosService, public dialog: MatDialog, private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.todo = new FormControl('', [Validators.required, Validators.minLength(10)]);
    this.todoForm = new FormGroup({todo: this.todo})
    this.getAllTodo();

  }
  getAllTodo() {
    this.todoService.getAllTodo().subscribe(res => {
      this.todoArr = res;
    }, err => {
      this.notifierService.showNotification('Something went wrong, Could not fetch todos, pls try again', 'ok', 'error');
    });
  }

  addTodo() {
    if(this.todoForm.valid) {
      this.todoObj.todo_name = this.todoValue;
    this.todoService.addTodo(this.todoObj).subscribe(res => {
      this.notifierService.showNotification('Todo added to your list successfully', 'ok', 'success');
      this.getAllTodo();
    }, err => {
      this.notifierService.showNotification('Could not add todo, pls try again', 'ok', 'error');
    })
    this.todoForm.reset();
  }
}

  openTodo(todo: Todo) {
    this.dialog.open(TodoModalComponent, {
      width: "40%",
      data: todo
    }).afterClosed().subscribe(val => val === 'updated' ? this.getAllTodo() : '');
  }

  deleteTodo(todo : Todo) {
    this.todoService.deleteTodo(todo).subscribe(res => {
      this.notifierService.showNotification('Todo has been deleted from your list', 'ok', 'success');
      this.getAllTodo();
    }, err => {
      this.notifierService.showNotification('Could not delete todo, pls try again', 'ok', 'error');
    });
  }
}
