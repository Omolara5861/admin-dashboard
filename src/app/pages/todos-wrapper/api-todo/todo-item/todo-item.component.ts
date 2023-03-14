import { Component, OnInit, Input } from '@angular/core';
import { ExternalTodo } from 'src/app/model/project';


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input() todo!: ExternalTodo;

  constructor() { }

  ngOnInit(): void {
  }

}
