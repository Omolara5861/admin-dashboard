import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
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

  displayedColumns: string[] =
  ['employeeName', 'age', 'department', 'date', 'gender', 'salary', 'bio', 'action'];
  dataSource!: MatTableDataSource<any>;
  apiResponse:any = [];
  departmentOptions : any = [];
  defaultOption: string = 'Filter By Department';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private api: ApiService,
  private notifier: NotifierService) { }

  ngOnInit(): void {
    this.getAllEmployees();
  }

   openDialog() {
    this.dialog.open(ModalpopupComponent, {
      width: "30%",
    }).afterClosed().subscribe({
      next: (val) => {
        if(val === 'save') {
          this.getAllEmployees();
        }
      }
    })
  }

   getAllEmployees() {
    this.api.getEmployees()
    .subscribe({
      next: (res) => {
        this.apiResponse = res;
        this.dataSource = new MatTableDataSource(res);
        this.departmentOptions = _.uniq(res.map((item:any) => item['department']));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        this.notifier.showNotification('An error occured while fetching the Employees', 'OK', 'error');
      }
    })
  }

    editEmployee(row: any) {
    this.dialog.open(ModalpopupComponent, {
    width: "30%",
    data: row
    }).afterClosed().subscribe({
    next: val => {
        if(val === 'updated') {
          this.getAllEmployees();
        }
      }
    })
  }

   deleteEmployee(id: number) {
     this.api.deleteEmployee(id).subscribe({
      next: () => {
        this.notifier.showNotification('Employee details was deleted successfully', 'OK', 'success');
        this.getAllEmployees();
      },
     error: () => {
      this.notifier.showNotification('Something went wrong, could not delete Employee. Pls try again.', 'OK', 'error');     }
    })
   }

   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onChange($event:any){
    let filteredData = _.filter(this.apiResponse,(item: any) =>{
      return item.department ==  $event.value;
    })
    this.dataSource = new MatTableDataSource(filteredData);
  }

}

