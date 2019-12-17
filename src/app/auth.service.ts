import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private _registerUrl = "http://localhost:8080/api/register";
  // private _checkUserEmailUrl = "http://localhost:8080/api/useremailcheck";
  // private _checkUserIdUrl = "http://localhost:8080/api/useridcheck";
  // private _loginUrl = "http://localhost:8080/api/login";
  
  private _registerUrl = "api/register";
  private _checkUserEmailUrl = "api/useremailcheck";
  private _checkUserIdUrl = "api/useridcheck";
  private _loginUrl = "api/login";


  constructor(private http: HttpClient, private _router: Router) { }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }

  checkUserEmail(userEmail) {
    const req = {"email": userEmail};
    return this.http.post<any>(this._checkUserEmailUrl, req);
  }

  checkUserId(userId) {
    const req = {"_id": userId}
    return this.http.post<any>(this._checkUserIdUrl, req);
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user);
  }

  //only return true of false to indicate whether the token exists.
  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this._router.navigate(['/posters']);
  }

  getUserId() {
    return localStorage.getItem('id');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
