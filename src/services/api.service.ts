import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  http = inject(HttpClient)
  constructor() { }
  private authUrl = 'https://localhost:7073/api/Authorization';
  private userUrl = 'https://localhost:7073/api/User';
  
  registerUser(user:any):Observable<any>{
    return this.http.post<any>(`${this.authUrl}/register`,user,{responseType:'text' as 'json'} )
  }

  loginUser(user:any):Observable<any>{
    return this.http.post<any>(`${this.authUrl}/Userlogin`,user,{responseType :'text' as 'json'});
  }

  userById(id:any):Observable<any>{
    return this.http.get<any>(`${this.userUrl}/byId?id=${id}`)
  }

  allusers():Observable<any>{
    return this.http.get<any>(`${this.userUrl}/All`)
  }

  deleteUser(id:any):Observable<any>{
    return this.http.delete<any>(`${this.userUrl}?id=${id}`,{responseType:'text' as 'json'})
  }

  updateUser(id:any,data:any):Observable<any>{
    return this.http.put<any>(`${this.userUrl}?id=${id}`,data,{responseType:'text' as 'json'})
  }

  isLoggedIn(){
    return sessionStorage.getItem("access_token") ? true : false;
  }



  currentUser : BehaviorSubject<any> = new BehaviorSubject(null);

}
