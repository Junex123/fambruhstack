import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credentials } from '../Class/credentials';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:9400';

  //current user: user which is logged in
  public getCurrentUser(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/current-user`);
  }

//generate token
public generateToken(credentials: Credentials): Observable<any> {
  console.log('Generating token...');
  return this.http.post<any>(`${this.baseUrl}/generate-token`, credentials);
}

//login user: set token in local storage
public loginUser(token: any) {
  console.log('Logging in user...');
  localStorage.setItem('token', token);
  return true;
}

  //is logged in: user is logged in or not
  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == null || tokenStr == '') {
      return false;
    } else {
      return true;
    }
  }
 // Function to extract username from token
 getUsernameFromToken(token: string): string {
  const decodedToken = this.decodeToken(token);
  return decodedToken ? decodedToken.sub : null; // Assuming 'sub' contains the username
}

// Function to decode JWT token
private decodeToken(token: string): any {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}
  //logout user: remove token from local storage
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }
  public logoutadmin() {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    return true;
  }
  //get token
  public getToken() {
    return localStorage.getItem('token');
  }

  //set user details in local storage
  public setUserDetails(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

 //get user details from local storage
public getUserDetails() {
  let user = localStorage.getItem('user');
  if (user != null) {
    console.log('User details retrieved from local storage:', user);
    return JSON.parse(user);
  } else {
    this.logout();
    console.log('No user details found in local storage');
    return null;
  }
}

  //get user role
  public getUserRole() {
    let user = this.getUserDetails();
    return user.authorities[0].authority;
  }


}
