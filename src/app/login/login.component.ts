import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { subscribeOn } from 'rxjs';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formdata:any;

  constructor(private api:ApiService , private router:Router){ }

  ngOnInit(): void {
    this.formdata = new FormGroup({
        username:new FormControl("", Validators.compose([Validators.required])),
        password:new FormControl("",Validators.compose([Validators.required]))
    });
  }

  login(data:any){
      this.api.post("api/authentication/login", data).subscribe((result:any)=>{
        if(result.length == 0){
        // alert("Invalid credentials);
        Swal.fire({
          icon: 'error',
          title: 'Invalid Credentials',
          showConfirmButton: false,
          timer: 1000
        })
        }
        else{
          localStorage.setItem("usertype", "admin");
          localStorage.setItem("id", result[0].id);
          localStorage.setItem("username", result[0].username);
          localStorage.setItem("name", result[0].name);
          this.router.navigate(["/admin/dashboard"]);
          Swal.fire({
            icon: 'success',
            title: 'Login Successfully',
            showConfirmButton: false,
            timer: 500
          })
        }
    });
  }
}
