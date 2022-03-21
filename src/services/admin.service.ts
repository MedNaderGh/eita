import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root",
})
export class AdminService {
  noAuthHeader = { headers: new HttpHeaders({ 'Content-Type' : 'application/json' }) };
  uri = "http://localhost:3333/user";
  userDetails!: Object;
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}
  postStation(station: any){
  return this.http.post(`${this.uri}/addstation`,station,this.noAuthHeader);
}
validateUser(id:any){
  return this.http.post(`${this.uri}/validateuser/${id}`,this.noAuthHeader);
}
unvalidateUser(id:any){
  return this.http.post(`${this.uri}/unvalidateuser/${id}`,this.noAuthHeader);
}
deleteUser(id:any){
  return this.http.delete(`${this.uri}/deleteuser/${id}`,this.noAuthHeader);
}
  updateStation(station: any,id:any){
  return this.http.put(`${this.uri}/updatestation/${id}`,station,this.noAuthHeader);
}
deleteStation(id:any){
  return this.http.delete(`${this.uri}/deletestation/${id}`);
}
  getStations(){
    return this.http.get(`${this.uri}/getstations`);
  }
  login(authCredentials:any) {
    return this.http.post(`${this.uri}/ressource`, authCredentials);
  }
  getAllUsers(){
    return this.http.get(`${this.uri}/getemps`); 
  }
  sendemail(email:any,pdf:any){
    return this.http.post(`${this.uri}/sendemail`,{email,pdf}); 
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
docgenerate(text:any){
  const api_key="a1d96f892738387fa2f41720cc9544b2e6ff89a94f3ba311ba8dbc9043d15b7b";
  const pdf_in=text;
let body = new URLSearchParams();
body.set('api_key', api_key);
body.set('pdf_in', pdf_in);
let options = {
  headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
};
  return this.http
  .post('https://getoutpdf.com/api/convert/pdf-to-word', body.toString(), options)  
}
NumberToLetter(nombre:any, U=null, D=null):any {
          
          var letter:any = {
          0: "zéro",
          1: "un",
          2: "deux",
          3: "trois",
          4: "quatre",
          5: "cinq",
          6: "six",
          7: "sept",
          8: "huit",
          9: "neuf",
          10: "dix",
          11: "onze",
          12: "douze",
          13: "treize",
          14: "quatorze",
          15: "quinze",
          16: "seize",
          17: "dix-sept",
          18: "dix-huit",
          19: "dix-neuf",
          20: "vingt",
          30: "trente",
          40: "quarante",
          50: "cinquante",
          60: "soixante",
          70: "soixante-dix",
          80: "quatre-vingt",
          90: "quatre-vingt-dix",
        };
          
            var i, j, n, quotient, reste, nb;
            var ch
            var numberToLetter = '';
            //__________________________________
    
            if (nombre.toString().replace(/ /gi, "").length > 15) return "dépassement de capacité";
            if (isNaN(nombre.toString().replace(/ /gi, ""))) return "Nombre non valide";
    
            nb = parseFloat(nombre.toString().replace(/ /gi, ""));
            //if (Math.ceil(nb) != nb) return "Nombre avec virgule non géré.";
        if(Math.ceil(nb) != nb){
          nb = nombre.toString().split('.');
          //return NumberToLetter(nb[0]) + " virgule " + NumberToLetter(nb[1]);
          return this.NumberToLetter(nb[0]) + (U ? " " + U + " et " : " virgule ") + this.NumberToLetter(nb[1]) + (D ? " " + D : "");
            }
            
            n = nb.toString().length;
            switch (n) {
                case 1:
                    numberToLetter = letter[nb];
                    break;
                case 2:
                    if (nb > 19) {
                        quotient = Math.floor(nb / 10);
                        reste = nb % 10;
                        if (nb < 71 || (nb > 79 && nb < 91)) {
                            if (reste == 0) numberToLetter = letter[quotient * 10];
                            if (reste == 1) numberToLetter = letter[quotient * 10] + "-et-" + letter[reste];
                            if (reste > 1) numberToLetter = letter[quotient * 10] + "-" + letter[reste];
                        } else numberToLetter = letter[(quotient - 1) * 10] + "-" + letter[10 + reste];
                    } else numberToLetter = letter[nb];
                    break;
                case 3:
                    quotient = Math.floor(nb / 100);
                    reste = nb % 100;
                    if (quotient == 1 && reste == 0) numberToLetter = "cent";
                    if (quotient == 1 && reste != 0) numberToLetter = "cent" + " " + this.NumberToLetter(reste);
                    if (quotient > 1 && reste == 0) numberToLetter = letter[quotient] + " cents";
                    if (quotient > 1 && reste != 0) numberToLetter = letter[quotient] + " cent " + this.NumberToLetter(reste);
                    break;
                case 4 :
                case 5 :
                case 6 :
                    quotient = Math.floor(nb / 1000);
                    reste = nb - quotient * 1000;
                    if (quotient == 1 && reste == 0) numberToLetter = "mille";
                    if (quotient == 1 && reste != 0) numberToLetter = "mille" + " " + this.NumberToLetter(reste);
                    if (quotient > 1 && reste == 0) numberToLetter = this.NumberToLetter(quotient) + " mille";
                    if (quotient > 1 && reste != 0) numberToLetter = this.NumberToLetter(quotient) + " mille " + this.NumberToLetter(reste);
                    break;
                case 7:
                case 8:
                case 9:
                    quotient = Math.floor(nb / 1000000);
                    reste = nb % 1000000;
                    if (quotient == 1 && reste == 0) numberToLetter = "un million";
                    if (quotient == 1 && reste != 0) numberToLetter = "un million" + " " + this.NumberToLetter(reste);
                    if (quotient > 1 && reste == 0) numberToLetter = this.NumberToLetter(quotient) + " millions";
                    if (quotient > 1 && reste != 0) numberToLetter = this.NumberToLetter(quotient) + " millions " + this.NumberToLetter(reste);
                    break;
                case 10:
                case 11:
                case 12:
                    quotient = Math.floor(nb / 1000000000);
                    reste = nb - quotient * 1000000000;
                    if (quotient == 1 && reste == 0) numberToLetter = "un milliard";
                    if (quotient == 1 && reste != 0) numberToLetter = "un milliard" + " " + this.NumberToLetter(reste);
                    if (quotient > 1 && reste == 0) numberToLetter = this.NumberToLetter(quotient) + " milliards";
                    if (quotient > 1 && reste != 0) numberToLetter = this.NumberToLetter(quotient) + " milliards " + this.NumberToLetter(reste);
                    break;
                case 13:
                case 14:
                case 15:
                    quotient = Math.floor(nb / 1000000000000);
                    reste = nb - quotient * 1000000000000;
                    if (quotient == 1 && reste == 0) numberToLetter = "un billion";
                    if (quotient == 1 && reste != 0) numberToLetter = "un billion" + " " + this.NumberToLetter(reste);
                    if (quotient > 1 && reste == 0) numberToLetter = this.NumberToLetter(quotient) + " billions";
                    if (quotient > 1 && reste != 0) numberToLetter = this.NumberToLetter(quotient) + " billions " + this.NumberToLetter(reste);
                    break;
            }//fin switch
            /*respect de l'accord de quatre-vingt*/
            if (numberToLetter.substr(numberToLetter.length - "quatre-vingt".length, "quatre-vingt".length) == "quatre-vingt") numberToLetter = numberToLetter + "s";
    
            return numberToLetter;
    
        }}