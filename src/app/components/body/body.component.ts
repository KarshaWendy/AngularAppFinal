import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms'
import { FormControl } from '@angular/forms';
import { Employeemodel } from 'src/app/main-dashboard';
import { ApiService } from 'src/app/shared/api.service';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
 formValue!:FormGroup;
 employeemodelObject : Employeemodel =new Employeemodel ();
 employeeData !: any;
 name = new FormControl('');
showAdd !: boolean;
showUpdate!: boolean;
 constructor(private formBuilder: FormBuilder,
  private api:ApiService) { }

  ngOnInit(): void {
    this.formValue =this.formBuilder.group({
      name :[''],
      email :[''],
      status :[''],
      gender :[''],

    })
    this.getAllEmployee();
  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd =true;
    this.showUpdate =false;
  }
postEmployeeDetails(){

  this.employeemodelObject.name =this.formValue.value.name;
  this.employeemodelObject.email =this.formValue.value.email;
  this.employeemodelObject.status =this.formValue.value.status;
  this.employeemodelObject.gender =this.formValue.value.gender;

  this.api.postEmployee(this.employeemodelObject)
  .subscribe(res=>{
    console.log(res);
    alert("Employee details added successfully")
    let ref = document.getElementById('cancel')
    ref?.click();
    this.formValue.reset();
    this.getAllEmployee();
  },
  err=>{
    alert("Kindly check the details once more")
  })
  
}
getAllEmployee(){
  this.api.getEmployee()
  .subscribe(res=>{
    this.employeeData =res;
})
}
deleteEmployee(row : any){
  this.api.deleteEmployee(row.id)
  .subscribe(res=>{
    alert("The employee has been deleted")
    this.getAllEmployee();
    })
}
 onEdit(row:any){
  this.showAdd =false;
  this.showUpdate =true;
  this.employeemodelObject.id = row.id
   this.formValue.controls['email'].setValue(row.email);
   this.formValue.controls['name'].setValue(row.name);
   this.formValue.controls['status'].setValue(row.status);
   this.formValue.controls['gender'].setValue(row.gender);
 }
 updateEmployeeDetails(){
  this.employeemodelObject.name =this.formValue.value.name;
  this.employeemodelObject.email =this.formValue.value.email;
  this.employeemodelObject.status =this.formValue.value.status;
  this.employeemodelObject.gender =this.formValue.value.gender;
  console.log()

  this.api.updateEmployee(this.employeemodelObject,this.employeemodelObject.id)
  .subscribe(res=>{
    alert("Employee Updates Sucessfully");
    let ref = document.getElementById('cancel')
    ref?.click();
    this.formValue.reset();
    this.getAllEmployee();
  })
 }
}
