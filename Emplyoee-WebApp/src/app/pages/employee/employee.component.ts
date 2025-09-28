import { Component } from '@angular/core';
import { HttpService } from '../../Services/http.service';
import{inject,OnInit} from '@angular/core'
import {MatButtonModule} from '@angular/material/button';
import{MatInputModule}from'@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IEmployee } from '../../Types/employee';
import { TableComponent } from '../../Component/table/table.component';

import { MatCardModule } from "@angular/material/card";
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
  
} from '@angular/material/dialog';
import { EmployeeFormComponent } from './employee-form/employee-form.component';


@Component({
  selector: 'app-employee',
  imports: [MatButtonModule, MatInputModule, CommonModule, FormsModule, MatCardModule,TableComponent,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent  implements OnInit{
  
  httpService = inject(HttpService);
  employees: IEmployee[]=[];
  showCol=['id','name','email','phone','action']



  ngOnInit(){
    
     this.getLatestData();
    }

  getLatestData(){
    this.httpService.getEmployessList().subscribe((result:IEmployee[])=>{
     this.employees = result;

  });
}

  edit(employee:IEmployee){
    let ref = this.dialog.open(EmployeeFormComponent, {
      panelClass:"m-auto",
      data:{
          employeeId: employee.id 
      },
      });

    ref.afterClosed().subscribe(()=>{
     this.getLatestData();
    });
  }
  delete(employee:IEmployee){
    this.httpService.deletEmployee(employee.id).subscribe(()=>{
     alert('Employee Deleted Successfully');
     this.getLatestData();
    });
  }

  add(){
    this.openDialog();
  }

  readonly dialog = inject(MatDialog);
  openDialog(): void { 
  let ref = this.dialog.open(EmployeeFormComponent, {
      panelClass:"m-auto"
      
      
    
    });

    ref.afterClosed().subscribe(()=>{
     this.getLatestData();
    });







}
}
