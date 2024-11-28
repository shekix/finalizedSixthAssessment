import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Router, RouterEvent, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  api:any;
  
  jwtHelperService = new JwtHelperService();
  constructor(api:ApiService, private router:Router){
  this.api = api;
  }
  
  loginForm = new FormGroup({
    email : new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required])
  })
  
  get Email() : FormControl{
    return this.loginForm.get('email') as FormControl;
  } 
  get Password() : FormControl{
    return this.loginForm.get('password') as FormControl;
  } 
  isUserValid:boolean = false;
  
  onLogin(){
    var data = {... this.loginForm.value}
    this.api.loginUser(data).subscribe((res:any)=>{
      if(res =='unsuccessful'){
        Swal.fire("Invalid credentials");
        this.isUserValid = false;
        // this.api.isLoggedIn(this.isUserValid);
      }
      if(res=='inactive'){
        Swal.fire({
          icon: "error",
          text: "Your account has been deactivated!",
          footer:"Contact admin for more details"
        });
      }
      else{
        this.setToken(res);       
        this.router.navigate(['/home']);
        Swal.fire("Logged in as "+ sessionStorage.getItem("role"));
        // alert("you have logged in as " + sessionStorage.getItem("role"));
      }
    })
  }
  
  setToken(token:string){
    sessionStorage.setItem("access_token",token);
    this.loadCurrentUser();
  }
  
  loadCurrentUser(){
    const token = sessionStorage.getItem("access_token");
    const userInfo = token != null? this.jwtHelperService.decodeToken(token) : null;
    const data = userInfo ? {
      email:userInfo["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
      role:userInfo["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
      id:userInfo["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
    }:null;
  
    this.api.currentUser.next(data);
    sessionStorage.setItem("name",data?.email)
    sessionStorage.setItem("role",data?.role);
    sessionStorage.setItem("id",data?.id);
    
  }  
}
