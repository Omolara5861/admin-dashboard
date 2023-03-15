import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { ModalpopupComponent } from 'src/app/shared/modalpopup/modalpopup.component';
import * as _ from 'lodash';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
// Array which determines which columns are displayed in the table
  displayedColumns: string[] =
    ['employeeName', 'age', 'department', 'date', 'gender', 'salary', 'bio', 'action'];
  // Variable which is an instance of the MatTableDataSource class
  dataSource!: MatTableDataSource<any>;
//Array which will store the response from the API
  apiResponse: any = [];
// Array which will store the unique department values
  departmentOptions: any = [];
  //Property which sets the default option for the department filter.
  defaultOption: string = 'Filter By Department';

  /** Properties are defined, paginator and sort, which will be used to control the table's pagination and sorting. */
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private api: ApiService,
    private notifier: NotifierService) { }

  ngOnInit(): void {
    // Call the method which makes a GET request to the API and updates the dataSource, apiResponse, and departmentOptions properties.
    this.getAllEmployees();
  }

  /** This method opens a modal dialog and subscribes to the result, calling the getAllEmployees() method if the result is 'save' in other to fetch the updated list */
  openDialog() {
    this.dialog.open(ModalpopupComponent, {
      width: "30%",
    }).afterClosed().subscribe({
      next: (val) => {
        if (val==='save') {
          this.getAllEmployees();
        }
      }
    })
  }

  /** This method makes a GET request to the API using ApiService, updating the dataSource, apiResponse, and departmentOptions properties on success and displaying an error notification on failure. */
  getAllEmployees() {
    this.api.getEmployees()
      .subscribe({
        next: (res) => {
          this.apiResponse=res;
          this.dataSource=new MatTableDataSource(res);
          this.departmentOptions=_.uniq(res.map((item: any) => item['department']));
          this.dataSource.paginator=this.paginator;
          this.dataSource.sort=this.sort;
        },
        error: (err) => {
          this.notifier.showNotification('An error occurred while fetching the Employee List', 'OK', 'error');
        }
      })
  }

  /** This method opens a modal dialog for editing a row and subscribes to the result, calling the getAllEmployees() method if the result is 'updated'. */
  editEmployee(row: any) {
    this.dialog.open(ModalpopupComponent, {
      width: "30%",
      data: row
    }).afterClosed().subscribe({
      next: val => {
        if (val==='updated') {
          this.getAllEmployees();
        }
      }
    })
  }

  /** This method makes a DELETE request to the API to delete an employee, displaying a success message and calls the getAllEmployees() method if successful or display an error notification if unsuccessful  */
  deleteEmployee(id: number) {
    this.api.deleteEmployee(id).subscribe({
      next: () => {
        this.notifier.showNotification('Employee details were deleted successfully', 'OK', 'success');
        this.getAllEmployees();
      },
      error: () => {
        this.notifier.showNotification('Something went wrong, could not delete Employee details. Pls try again.', 'OK', 'error');
      }
    })
  }

/** This method filters the dataSource based on the search input */
  applyFilter(event: Event) {
    const filterValue=(event.target as HTMLInputElement).value;
    this.dataSource.filter=filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** This method filters the dataSource based on the department filter selection. */
  onChange($event: any) {
    let filteredData=_.filter(this.apiResponse, (item: any) => {
      return item.department == $event.value;
    })
    this.dataSource = new MatTableDataSource(filteredData);
  }

}

