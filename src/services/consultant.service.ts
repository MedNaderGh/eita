import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root",
})
export class ConsultantService {
  noAuthHeader = { headers: new HttpHeaders({ NoAuth: "True" }) };
  uri = "http://localhost:4000/v1/consultant";
  userDetails!: Object;
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}
  login(authCredentials:any) {
    return this.http.post(`${this.uri}/authenticate`, authCredentials);
  }
  setToken(token: string) {
    localStorage.setItem("jwtToken", token);
  }

  getToken() {
    return localStorage.getItem("jwtToken");
  }

  deleteToken() {
    localStorage.removeItem("jwtToken");
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split(".")[1]);
      return JSON.parse(userPayload);
    } else return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload) return userPayload.exp > Date.now() / 1000;
    else return false;
  }
}