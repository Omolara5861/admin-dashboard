import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ExternalTodo, Todo } from '../model/project';



@Injectable({
  providedIn: 'root'
})
export class TodosService {

  /**
   * @todoUrl variable stores the api endpoint
   */
  externalTodosURL = 'https://jsonplaceholder.typicode.com/todos';
  todoURL = 'https://jsonplaceholder.typicode.com/todos';

  /**
   * Setting Header Options
   */
  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }
  /**
   * This is the method for handling all possible errors
   */
  errorHandling(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    }

    else {
      console.error(`Api returned code ${error.status}, and body: ${error}`);
    }

    return throwError ('Some went wrong, please try again later.');
  }

  /**
   * Fetch todos from @todoUrl
   */
  getTodos(): Observable<ExternalTodo[]> {
    return this.http.get<ExternalTodo[]>(this.externalTodosURL).pipe(
      map((el) => el.slice(0, 10)),
      catchError(this.errorHandling)
    );
  }

/** Request Method of creating todo */
  addTodo(todo : Todo) : Observable<Todo> {
    return this.http.post<Todo>(this.todoURL,todo);
  }

  getAllTodo() : Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todoURL);
  }

  deleteTodo(todo : Todo) : Observable<Todo> {
    return this.http.delete<Todo>(`${this.todoURL}/${todo.id}`);
  }

  editTodo(todo : Todo) : Observable<Todo> {
    return this.http.put<Todo>(`${this.todoURL}/${todo.id}`,todo);
  }
}


