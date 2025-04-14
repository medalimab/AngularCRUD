import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.modal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule,HttpClientModule,CommonModule],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css',
  providers: [ ApiService],
})
export class EmployeeDashboardComponent implements OnInit {
  formValue !:FormGroup;
employeeModelObj :EmployeeModel=new EmployeeModel();
employeeData !: any;
currentMaxId: number = 0; // Initialisation du compteur pour l'ID

constructor(private formbuilder: FormBuilder, private api: ApiService) { }
ngOnInit(): void {
this.formValue=this.formbuilder.group({
firstName : [''],
lastName : [''],
email : [''],
mobile : [''],
salary : ['']
})
this.getAllEmployee(); // Récupérer tous les employés au démarrage

}

postEmployeeDetails(){
  this.employeeModelObj.firstName=this.formValue.value.firstName;
  this.employeeModelObj.lastName=this.formValue.value.lastName;
  this.employeeModelObj.email=this.formValue.value.email;
  this.employeeModelObj.mobile=this.formValue.value.mobile;
  this.employeeModelObj.salary=this.formValue.value.salary;
  // Générer un ID unique pour le nouvel employé en incrémentant un compteur
  this.employeeModelObj.id = ++this.currentMaxId;
  // Incrémenter le compteur à chaque ajout
  this.api.postEmployee(this.employeeModelObj)
  .subscribe(res=>{
  console.log(res);
  alert("employee added successfully")
  this.formValue.reset(); // Réinitialiser le formulaire après l'ajout
  this.getAllEmployee(); // Récupérer à nouveau tous les employés pour mettre à jour la liste
  },err=>{
  alert("something went wrong");
  })
  }
  getAllEmployee() {
    this.api.getAllEmployee()
      .subscribe(res => {
        this.employeeData = res; // Les données récupérées sont assignées à employeeData
      });
  }

  deleteEmployee(row : any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("Employee deleted successfully")
      this.getAllEmployee(); // Récupérer à nouveau tous les employés après la suppression
    })
  }


  onEdit(row : any){
    this.employeeModelObj.id=row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
  }
  updateEmployeeDetails(){
    this.employeeModelObj.firstName=this.formValue.value.firstName;
    this.employeeModelObj.lastName=this.formValue.value.lastName;
    this.employeeModelObj.email=this.formValue.value.email;
    this.employeeModelObj.mobile=this.formValue.value.mobile;
    this.employeeModelObj.salary=this.formValue.value.salary;
    this.api.updadteEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res=>{
    alert("Update successfuly");
    this.getAllEmployee();
    })
    }

}
