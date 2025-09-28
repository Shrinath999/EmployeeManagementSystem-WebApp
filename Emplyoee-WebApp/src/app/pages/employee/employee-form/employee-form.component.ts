
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpService } from '../../../Services/http.service';
import { IDepartment } from '../../../Types/department';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule
  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
})
export class EmployeeFormComponent implements OnInit {

  fb = inject(FormBuilder);
  httpService = inject(HttpService);
  dialogRef = inject(MatDialogRef<EmployeeFormComponent>);
  data = inject(MAT_DIALOG_DATA) as { employeeId?: number } | null;

  employeeForm = this.fb.group({
    
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    gender: [1, [Validators.required]],
    departmentId: ['', [Validators.required]],
    jobTitle: ['', [Validators.required]],
    joiningDate: ['', [Validators.required]],
    dateOfBirth: ['', [Validators.required]],
    lastWorkingDate: ['', [Validators.required]],
  });

  departments: IDepartment[] = [];

  ngOnInit() {
    // get departments list
    this.httpService.getDepartments().subscribe((result) => {
      this.departments = result;
    });

    // if edit mode
    const employeeid = this.data?.employeeId;
    if (employeeid) {
      this.httpService.getEmplyoeebyid(employeeid).subscribe((result) => {
        this.employeeForm.patchValue(result as any);
        this.employeeForm.get('gender')?.disable();
      });
    }
  }

  onSubmit() {
    
  
  let value: any = this.employeeForm.value;

  // Convert gender from number to string before sending to backend
  value.gender = value.gender === 1 ? 'male' : 'women';

  // Agar add kar rahe ho to id bhejne ki zarurat nahi
  delete value.id;

  if (this.data?.employeeId) {
    // Update case
    this.httpService.updateEmployee(this.data.employeeId, value).subscribe({
      next: () => {
        alert('Record Update');
        this.dialogRef.close();
      },
      error: (err) => {
        console.error('Update employee failed:', err.error);
        alert('Employee update failed. Check console for details.');
      }
    });
  } else {
    // Add case
    this.httpService.addEmployee(value).subscribe({
      next: () => {
        alert('Record Save');
        this.dialogRef.close();
      },
      error: (err) => {
        console.error('Add employee failed:', err.error);
        alert('Employee add failed. Check console for details.');
      }
    });
  }
}

}

  


