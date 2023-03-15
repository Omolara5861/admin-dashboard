import { Component } from '@angular/core';

@Component({
  selector: 'app-todos-wrapper',
  template: `
    <app-todo></app-todo>
    <app-api-todos></app-api-todos>
  `
})
export class TodosWrapperComponent {

}
