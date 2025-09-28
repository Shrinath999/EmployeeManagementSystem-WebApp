import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DepartmentComponent } from './pages/department/department.component';
import { EmployeeComponent } from './pages/employee/employee.component';

export const routes: Routes = [
{

    path:'',
    component: HomeComponent
},
{
    path:'departments',
    component:DepartmentComponent
},
{
    path:'Employee',
    component:EmployeeComponent
},

];  
