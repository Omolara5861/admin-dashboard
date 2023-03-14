import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  todoForm!: FormGroup;
  todoObj : Todo = new Todo();
  todoArr : Todo[] = [];

  todoValue : string = '';
  editTodoValue : string = '';

  constructor(private todoService : TodosService, public dialog: MatDialog, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({todo: ['', Validators.required]});
    this.editTodoValue = '';
    this.todoValue = '';
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
    if(this.todoForm.valid) {
      this.todoObj.todo_name = this.todoValue;
    this.todoService.addTodo(this.todoObj).subscribe(res => {
      this.getAllTodo();
      this.todoValue = '';
    }, err => {
      alert(err);
    })
    }
  }

  openTodo() {
    this.dialog.open(TodoModalComponent, {
      width: "40%"
    });
  }

  deleteTodo(todo : Todo) {
    this.todoService.deleteTodo(todo).subscribe(res => {
      this.getAllTodo();
    }, err => {
      alert("Failed to delete todo");
    });
  }
}
