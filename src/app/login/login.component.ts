import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';
import { HttpHeaders ,HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdminService } from "../../services/admin.service";
import { ConsultantService } from "../../services/consultant.service";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message:any;
  data:any;
  show:boolean=false;
  public onLoginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private admin: AdminService,
    private consult: ConsultantService,
    private http: HttpClient,
    private router:Router
  ){}
  ngOnInit() {
    this.onLoginForm = this.formBuilder.group({
      'username': ['', Validators.compose([Validators.minLength(6), Validators.required])],
      'password': ['', Validators.compose([
        Validators.required,Validators.minLength(6)])]
    });
  }
    login() {
      console.log(this.onLoginForm.value)
      if (this.onLoginForm.get('username')!.value.includes("admin")){
        this.admin.login(this.onLoginForm.value).subscribe(
          (res) => {
            this.data = res;
            console.log(this.data);
            this.admin.setToken(this.data["access_token"]);
            this.snackbar("admin correct");
            setTimeout(() => {
              this.router.navigate(['admin']);
            }, 2000);
          },
          (err) => {
            this.snackbar("admin incorrect"); 
          }
        );
      }
      else{
        this.admin.login(this.onLoginForm.value).subscribe(
          (res) => {
            this.data = res;
            console.log(this.data);
            this.admin.setToken(this.data["access_token"]);
            this.snackbar("consultant correct");
            setTimeout(() => {
              this.router.navigate(['consultant']);
            }, 2000);
          },
          (err) => {
            this.snackbar("consultant incorrect");
          }
        ); 
      }  
    }
    snackbar(msg: string){
      this.message=msg;
      this.show=!this.show;
      setTimeout(() => {
        this.show=!this.show
      }, 3000);
    }
    test(){
      console.log(this.show)
    }

}
