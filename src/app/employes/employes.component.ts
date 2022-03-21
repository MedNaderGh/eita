import { Component, OnInit } from '@angular/core';
import { AdminService } from "../../services/admin.service";
@Component({
  selector: 'app-employes',
  templateUrl: './employes.component.html',
  styleUrls: ['./employes.component.scss']
})
export class EmployesComponent implements OnInit {
  users:any;
  constructor(private admin: AdminService) { }

  ngOnInit(): void {
      this.admin.getAllUsers().subscribe(
        data =>{
          this.users=data
        }
      )
      console.log(this.users)
      }
  validate(id:any){
    this.admin.validateUser(id).subscribe(
      res => {alert("user validated");this.admin.getAllUsers().subscribe(
        data =>{
          this.users=data
        }
      )},
      err => {alert("erreur lors de validation")}
    )
  }
  unvalidate(id:any){
    this.admin.unvalidateUser(id).subscribe(
      res => {alert("user unvalidated");this.admin.getAllUsers().subscribe(
        data =>{
          this.users=data
        }
      )},
      err => {alert("erreur lors de unvalidation")}
    )
  }
  delete(id:any){
    this.admin.deleteUser(id).subscribe(
      res => {alert("user deleted");this.admin.getAllUsers().subscribe(
        data =>{
          this.users=data
        }
      )},
      err => {alert("erreur lors de suppression")}
    )
  }
}

