import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo, BtnState } from 'src/app/model/project';
import { TodosService } from 'src/app/services/todo.service';



@Component({
  selector: 'app-api-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit, OnDestroy {
  /**
   * Todos to display
   */
  todoList!: Todo[];
  /**
   * BehaviorSubject to manage the state between Todos and TodoButton component
   */
  btnState$: BehaviorSubject<BtnState> = new BehaviorSubject<BtnState>(BtnState.loading);
  constructor(
    private todosService: TodosService,
  ) {}

  ngOnInit() {
  }

  /**
   * Gets the state of the button from the TodoButton component
   *
   * @param btnState
   */
  getBtnState(btnState: any) {
    if (btnState === BtnState.loading) {
      this.todoList = [];
      this.loadTodos();
    }
  }

  /**
   * Fetches the todolist from API and emits it
   * for it to be displayed by the parent TodosComponent
   */
  loadTodos() {
    this.todosService.getTodos()
      .subscribe(
        (res: Todo[]) => {
          this.todoList = res;
          this.btnState$.next(BtnState.loadedAndDelaying);
        },
        (err) => {
          this.btnState$.next(BtnState.error);
        }
      );
  }

  ngOnDestroy() {
    this.btnState$.complete();
  }
}
