import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable, timer } from 'rxjs';
import { Subject } from '@microsoft/signalr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
api:any;
role:boolean;


constructor(apiservice:ApiService,private router:Router,private route:ActivatedRoute){
this.api = apiservice
this.role = sessionStorage.getItem("role") == "Admin"? true:false;

}

ngOnInit(): void {
  // this.secondsRemaining = timer(0, 1000).pipe(
  //   map(n => 300 - n),
  //   takeWhile(n => n >= 0),
  // );
}

myInfo(){
this.router.navigate(['/home/myinfo'])
}

allUsers(){
  this.router.navigate(['/home/allusers'])
}

chat(){
  this.router.navigate(['/home/chat'])
}

logout(){
  Swal.fire({
    title: "Are you sure?",
    text: "You want to logout",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes!"
  }).then((result) => {
    if (result.isConfirmed) {
      sessionStorage.clear();
      this.router.navigate(['/login'])
      Swal.fire({
        title: "Logged Out!",
        text: "You have successfully logged out from your account",
        icon: "success"
      });
    }
  });
  
}

}
