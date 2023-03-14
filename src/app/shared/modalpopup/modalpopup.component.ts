// Importing necessary dependencies for this component.
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.component.html',
  styleUrls: ['./modalpopup.component.scss']
})
export class ModalpopupComponent implements OnInit {

  // Initializing the employee form and setting the default button action.
  employeeForm !: FormGroup
  actionBtn: string='Save';

  constructor(
    // Injecting necessary services and dependencies to this component.
    private formBuilder: FormBuilder,
    private api: ApiService,
    private popupRef: MatDialogRef<ModalpopupComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private notifier: NotifierService) { }

  ngOnInit(): void {
     // Initializing the employee form with required fields and validators.
    this.employeeForm =this.formBuilder.group({
      employeeName: ['', Validators.required],
      age: ['', Validators.required],
      department: ['', Validators.required],
      date: ['', Validators.required],
      gender: ['', Validators.required],
      salary: ['', Validators.required],
      bio: ['', Validators.required]
    })

    // Updating the button action and setting form values if editData is passed.
    if (this.editData) {
      this.actionBtn='Update';
      this.employeeForm.controls['employeeName'].setValue(this.editData.employeeName);
      this.employeeForm.controls['age'].setValue(this.editData.age);
      this.employeeForm.controls['department'].setValue(this.editData.department);
      this.employeeForm.controls['date'].setValue(this.editData.date);
      this.employeeForm.controls['gender'].setValue(this.editData.gender);
      this.employeeForm.controls['salary'].setValue(this.editData.salary);
      this.employeeForm.controls['bio'].setValue(this.editData.bio);
    }
  }

/** Method to add or update employee details. */
  addEmployee(): any {
    // If editData is not present, create a new employee.
    if (!this.editData) {
      if (this.employeeForm.valid) {
        this.api.createEmployee(this.employeeForm.value)
          .subscribe({
            next: () => {
              // Displaying success notification and closing popup.
              this.notifier.showNotification('Employee\'s details added successfully!', 'OK', 'success');
              this.employeeForm.reset();
              this.popupRef.close('save');
            },
            error: () => {
               // Displaying error notification if adding employee failed.
              this.notifier.showNotification('Something went wrong, could not add employee. Pls try again', 'OK', 'error');
            }
          })
      }
    }
    else {
      // Update the employee if editData is present.
      this.updateEmployee();
    }
  }

  /** Method to update the employee details. */
  updateEmployee() {
    this.api.updateEmployee(this.employeeForm.value, this.editData.id)
      .subscribe({
        next: (res: any) => {
          // Displaying success notification and closing popup.
          this.notifier.showNotification('Employee\'s details was updated successfully!', 'OK', 'success');
          this.employeeForm.reset();
          this.popupRef.close('updated');
        },
        error: () => {
           // Displaying error notification if updating employee failed.
          this.notifier.showNotification('Something went wrong , could not update the employee details. Pls try again', 'OK', 'error');
        }
      })
  }

}
