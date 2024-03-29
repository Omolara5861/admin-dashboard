import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material Module
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';

import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GallaryComponent } from './pages/gallary/gallary.component';
import { ModalpopupComponent } from './shared/modalpopup/modalpopup.component';
import { NotifierComponent } from './shared/notifier/notifier.component';
import { TodosWrapperComponent } from './pages/todos-wrapper/todos-wrapper.component';
import { TodoButtonComponent } from './pages/todos-wrapper/api-todo/todo-button/todo-button.component';
import { TodosComponent } from './pages/todos-wrapper/api-todo/todos/todos.component';
import { TodoItemComponent } from './pages/todos-wrapper/api-todo/todo-item/todo-item.component';
import { TodoComponent } from './pages/todos-wrapper/todo/todo.component';
import { TodoModalComponent } from './pages/todos-wrapper/todo/edit-modal/todo-modal.component';
import { LandingComponent } from './pages/landing/landing.component';



@NgModule({
  declarations: [AppComponent,
    HomeComponent,
    NotFoundComponent,
    ModalpopupComponent,
    GallaryComponent,
    NotifierComponent,
    TodosWrapperComponent,
    TodoButtonComponent,
    TodosComponent,
    TodoItemComponent,
    TodoComponent,
    TodoModalComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatCardModule,
    MatSnackBarModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatListModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
