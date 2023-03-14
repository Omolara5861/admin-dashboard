import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Employees } from '../model/project';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  /** Employees API URL used to create, read, update, and delete employee data. createEmployee(),
   * getEmployees(),
   * updateEmployee(),
   * and deleteEmployee() functions provide the CRUD functionality for this API
  */
  private EmployeesUrl = 'https://admin-dashboard-server-zvu4.onrender.com/employeeList';

  /* Setting headers for HTTP requests **/
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  /** Function to create new employee */
  createEmployee(data : Observable<Employees[]>) {
    return this.http.post<Employees[]>(this.EmployeesUrl, JSON.stringify(data), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  /** Function to get all employees */
  getEmployees(): Observable<Employees[]> {
    return this.http.get<Employees[]>(this.EmployeesUrl).pipe(
      catchError(this.errorHandler)
    );
  }

  /** Function to update an employee */
  updateEmployee(data: any, id:number) {
      return this.http.put<Employees[]>(this.EmployeesUrl + '/' + id, JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
    }

    /** Function to delete an employee */
  deleteEmployee(id: number) {
      return this.http.delete<Employees[]>(this.EmployeesUrl + '/' +id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  /** Function to handle errors that may occur during the HTTP requests*/
  errorHandler(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error('Something went wrong while making the request'));
}

  /** Function to get images from Unsplash API */

  getImage() {
    return this.http.get<any>(
      `https://api.unsplash.com/photos/?page=${environment.page}&per_page=${environment.per_page}&client_id=${environment.key}`
    );
  }
}


