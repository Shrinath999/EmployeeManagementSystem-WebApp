

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { IDepartment } from '../Types/department'; // Path check karo
import { IEmployee } from '../Types/employee';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService{
 http= inject(HttpClient);
 
 constructor() {}
 getDepartments(){
  return this.http.get<IDepartment[]>(environment.apiUrl+'/api/Department');
 }
  
 addDepartment(name:string){
  return this.http.post(environment.apiUrl+'/api/Department/DepartmentNew',{
  name:name
  });

 }

 updateDepartment(id: number, name: string) {
   return this.http.put(`${environment.apiUrl}/api/Department/${id}`, {
    name: name
  });
}

deLetDepartment(id:number){
  return this.http.delete(`${environment.apiUrl}/api/Department/${id}`,{
    
  });
}

getEmployessList(){
  return this.http.get<IEmployee[]>(`${environment.apiUrl}/api/Employee`);
}
addEmployee(employee:IEmployee){
return this.http.post(`${environment.apiUrl}/api/Employee`,employee);
}

getEmplyoeebyid(id:number){
  return this.http.get<IEmployee>(`${environment.apiUrl}/api/Employee/${id}`);

}
updateEmployee(id: number,employee: IEmployee){
  return this.http.put(`${environment.apiUrl}/api/Employee/${id}`,employee);
}
deletEmployee(id:number){
  return this.http.delete(`${environment.apiUrl}/api/Employee/${id}`);

}
};
