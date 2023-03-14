import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { Todo, BtnState } from 'src/app/model/project';
import { TodosService } from 'src/app/services/todo.service';
import { TodoModalComponent } from './edit-modal/todo-modal.component';



@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todoObj : Todo = new Todo();
  todoArr : Todo[] = [];

  addTodoValue : string = '';
  editTodoValue : string = '';

  constructor(private todoService : TodosService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.editTodoValue = '';
    this.addTodoValue = '';
    this.todoObj = new Todo();
    this.todoArr = [];
    this.getAllTodo();
  }
  getAllTodo() {
    this.todoService.getAllTodo().subscribe(res => {
      this.todoArr = res;
    }, err => {
      alert("Unable to get list of todos");
    });
  }

  addTodo() {
    this.todoObj.todo_name = this.addTodoValue;
    this.todoService.addTodo(this.todoObj).subscribe(res => {
      this.ngOnInit();
      this.addTodoValue = '';
    }, err => {
      alert(err);
    })
  }

  openTodo() {
    this.dialog.open(TodoModalComponent, {
      width: "40%"
    });
  }

  deleteTodo(todo : Todo) {
    this.todoService.deleteTodo(todo).subscribe(res => {
      this.ngOnInit();
    }, err => {
      alert("Failed to delete todo");
    });
  }
}
