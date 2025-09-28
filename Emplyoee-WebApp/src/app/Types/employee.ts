export interface IEmployee{
      id :number;
     name :string;
     email:string;
    phone :string;
   jobTitle:string; 
   gender:Gender;
  departmentId:number;
  joiningDate:string;
  lastWorkingDate:string;
  dateOfBirth:string;
}

export enum Gender{
    male=1,
    women=2,
}