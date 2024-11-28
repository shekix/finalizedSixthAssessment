import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { AsyncPipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-my-info',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './my-info.component.html',
  styleUrl: './my-info.component.css'
})
export class MyInfoComponent implements OnInit {
api:any;
id:any;
data:any;
constructor(apiservice:ApiService){
  this.api = apiservice
  this.id = sessionStorage.getItem('id');
}

ngOnInit(): void {
    this.api.userById(this.id).subscribe((res:any)=>{
      this.data = res;
    })
}

formatdate(date:Date){
    return formatDate(date,"dd/MM/yyyy","en");
}

}
