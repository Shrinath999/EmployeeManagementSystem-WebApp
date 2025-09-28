import { Component, inject,OnInit } from '@angular/core';
import { HttpService } from '../../Services/http.service';
import { IDepartment } from '../../Types/department';
import {MatButtonModule} from '@angular/material/button';
import{MatInputModule}from'@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-department',
  standalone:true,
  
  imports: [MatButtonModule,MatInputModule,CommonModule,FormsModule],
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent implements OnInit {
  httpService = inject(HttpService);

  department: IDepartment[] = [];

   isFormOpen=false;
   totalCount = 0;
ngOnInit(){
    this.getLetestData();
    
  
  
}

getLetestData(){
  this.httpService.getDepartments().subscribe((result: IDepartment[]) => {
    this.department = result;
    this.totalCount = this.department.length;
});
}

departmentName!:string;

addDepartment(){
  console.log(this.departmentName);
  this.httpService.addDepartment(this.departmentName).subscribe(()=>{
   this.isFormOpen=false;
    this.getLetestData();
  });
}
editId=0;

editDepartment(department: IDepartment){
  this.departmentName = department.name;
  this.isFormOpen=true;
  this.editId=department.id;
}
updateDepartment(){
  this.httpService.updateDepartment(this.editId, this.departmentName).subscribe(() => {
    alert("Department Updated Successfully");
    this.isFormOpen = false;
    this.getLetestData();
    this.editId=0;
  });
}
delete(id:number){
  this.httpService.deLetDepartment(id).subscribe(()=>{
    this.getLetestData();
  
  });
}


}


