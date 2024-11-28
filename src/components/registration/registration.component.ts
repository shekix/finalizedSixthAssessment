import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,RouterLink],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  api:any;

  constructor(api:ApiService,private router: Router){
    this.api = api;
    }

  regsitrationForm = new FormGroup({
    firstName: new FormControl("",[Validators.required,Validators.maxLength(15)]),
    lastName: new FormControl("",[Validators.required,Validators.maxLength(15)]),
    email: new FormControl("",[Validators.required,Validators.email]),
    dob : new FormControl('',[Validators.required]),
    gender: new FormControl("",[Validators.required]),
    role: new FormControl("",[Validators.required]),
    password: new FormControl("",[Validators.required,Validators.minLength(6)]),
    cpassword: new FormControl(""),
    })

    confirmPassword:string = "none";  
    displayMsg:string = '';

    submit(){
      if(this.Password.value == this.Cpassword.value)
      {
        
        this.confirmPassword = 'none'
        
        var user = {
        
          firstName:this.regsitrationForm.value.firstName,
          lastName:this.regsitrationForm.value.lastName,
          email:this.regsitrationForm.value.email,
          password:this.regsitrationForm.value.password,
          role:this.regsitrationForm.value.role,
          gender:this.regsitrationForm.value.gender,
          dob:this.regsitrationForm.value.dob
        }
    
        this.api.registerUser(user).subscribe((res:any)=>{
          if(res=='RegistrationSuccessful'){
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Account successfully created",
              text:"Login to access your account",
              showConfirmButton: false,
              timer: 2000
            });
           
            this.router.navigate(['/login']);
          }
          else if(res=='userAlreadyExists'){
           alert('Account with this email already exists');
            
          }
        })
    
      }
      else
      {
        this.confirmPassword = 'inline'
      }
    }


    get FirstName() : FormControl{
      return this.regsitrationForm.get('firstName') as FormControl;
    } 
    get LastName() : FormControl{
      return this.regsitrationForm.get('lastName') as FormControl;
    } 
    get Email() : FormControl{
      return this.regsitrationForm.get('email') as FormControl;
    } 
    get Dob() : FormControl{
      return this.regsitrationForm.get('dob') as FormControl;
    } 
    get Gender() : FormControl{
      return this.regsitrationForm.get('gender') as FormControl;
    } 
    get Role() : FormControl{
      return this.regsitrationForm.get('role') as FormControl;
    } 
    get Password() : FormControl{
      return this.regsitrationForm.get('password') as FormControl;
    } 
    get Cpassword() : FormControl{
      return this.regsitrationForm.get('cpassword') as FormControl;
    } 

}
