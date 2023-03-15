import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
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
  formDirective!: FormGroupDirective;
  todo!: FormControl;
  todoObj : Todo = new Todo();
  todoArr : Todo[] = [];

  todoValue : string = '';

  constructor(private todoService : TodosService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.todo = new FormControl('', Validators.required);
    this.todoForm = new FormGroup({todo: this.todo})
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
    }, err => {
      alert(err);
    })
    this.todoForm.reset();
    // this.formDirective.resetForm();
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
      this.getAllTodo();
    }, err => {
      alert("Failed to delete todo");
    });
  }
}
