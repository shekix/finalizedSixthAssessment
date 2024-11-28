import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { formatDate, NgClass } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { FilterPipe } from '../../pipes/filter.pipe';
import Swal from 'sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [FormsModule, NgClass, ReactiveFormsModule,FilterPipe,NgxPaginationModule],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css'
})


export class AllUsersComponent implements OnInit {
  data: any[]=[];
  constructor(private api: ApiService) {
  }


  row:any;

  filter :string= '';

  getall() {
    this.api.allusers().subscribe((res) => {
      this.data = res; 
    })
  }

  ngOnInit(): void {
    
    this.getall();
  }

  formatdate(date: Date) {
    return formatDate(date, "dd/MM/yyyy", "en");
  }

  editForm = new FormGroup({
    firstName: new FormControl(['', [Validators.required]]),
    lastName: new FormControl(['', [Validators.required]]),
    // email:new FormControl(['', [Validators.required, Validators.email]]) ,
    gender: new FormControl(['', [Validators.required]]),
    dob: new FormControl(['', [Validators.required]]),
    role: new FormControl(['', [Validators.required]]),
  })

  userId: any;
  onEdit(item: any): void {
    this.userId = item.id;
    this.editForm.patchValue({
      firstName: item.firstName,
      lastName: item.lastName,
      // email: item.email,
      gender: item.gender,
      dob: item.dob ? formatDate(new Date(item.dob), 'yyyy-MM-dd', 'en') : item.dob,
      role: item.role,
    });

    // Open the modal
    const modal = new bootstrap.Modal(document.getElementById('editModal')!);

    modal.show();
  }


  onUpdate(): void {

    const modal = new bootstrap.Modal(document.getElementById('editModal')!);

    const data = {
      ... this.editForm.value
    }
    this.api.updateUser(this.userId, data).subscribe((res) => {
      if (res == "notFound") {
        alert("an error occured");
      }
      else {
        
        // alert("user updated");
        Swal.fire('user has been updated');
        modal.hide();
        this.getall();
      }
    })



  }

  onDelete(item: any): void {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.deleteUser(item.id).subscribe((res) => {
          if (res == "unavailable") {
            Swal.fire({
              title:"Error!",
              text:"An error occured",
              icon:"error"
            })
          }
          else {
            this.getall();
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success"
            });
          }
        })
      }
    });



    // if (confirm("you really want to delete this user")) {
    //   this.api.deleteUser(item.id).subscribe((res) => {
    //     if (res == "unavailable") {
    //       alert("an error occured");
    //     }
    //     else {
    //       this.getall();
    //       alert("user inactivated")
    //     }
    //   })
    // }
  }

}
