import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from "../services/admin.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private admin:AdminService) { } 
  canActivate(){
    if (this.admin.getToken() || this.admin.getUserPayload()[0]["USERNAME"].includes("admin")) {
      return true;
    }
    else {
      if(this.admin.getToken()){
      this.router.navigateByUrl('/consultant');
        return false;
    }
    else{
      this.router.navigateByUrl('/');
        return false;
    }
    
  }}
  
}
