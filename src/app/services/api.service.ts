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

  // Employees Dash Board Api Request
  private EmployeesUrl = 'http://localhost:3000/employeeList/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  createEmployee(data : Observable<Employees[]>) {
    return this.http.post<Employees[]>(this.EmployeesUrl, JSON.stringify(data), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getEmployees(): Observable<Employees[]> {
    return this.http.get<Employees[]>(this.EmployeesUrl).pipe(
      catchError(this.errorHandler)
    );
  }

  updateEmployee(data: any, id:number) {
      return this.http.put<Employees[]>(this.EmployeesUrl +id, JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
    }

  deleteEmployee(id: number) {
      return this.http.delete<Employees[]>(this.EmployeesUrl +id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error('test'));
}

  // Image Gallary Api request from Unsplash

  getImage() {
    return this.http.get<any>(
      `https://api.unsplash.com/photos/?page=${environment.page}&per_page=${environment.per_page}&client_id=${environment.key}`
    );
  }
}


