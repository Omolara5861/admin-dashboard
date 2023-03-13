import { Component } from '@angular/core';

@Component({
  selector: 'app-todos-wrapper',
  template: `
  <mat-card style="padding: 20px">
    <app-todo></app-todo>
    <app-api-todos></app-api-todos>
  </mat-card>
  `
})
export class TodosWrapperComponent {

}
