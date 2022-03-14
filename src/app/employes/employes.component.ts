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
}

