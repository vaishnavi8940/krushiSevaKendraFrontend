import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-towns',
  templateUrl: './towns.component.html',
  styleUrls: ['./towns.component.css']
})
export class TownsComponent implements OnInit {
  formdata:any;
  towns:any;
  id:any;

  constructor(private api:ApiService, private router:Router){ }

  ngOnInit(): void {


     this.load();
  }

  load(){
    this.id = null;
    this.formdata = new FormGroup({
      id:new FormControl(0),
      name: new FormControl("", Validators.compose([Validators.required])),
     })
    this.api.get("api/towns").subscribe((result:any)=>{
      this.towns = result;
  })
  }

  Save(data:any){
    if(this.id == null){
      this.api.post("api/towns", data).subscribe((result:any)=>{
       this.load();
        Swal.fire({
          icon: 'success',
          title: 'Successfully Submitted',
          showConfirmButton: false,
          timer: 1500
        })
      })
    }
    else{
      this.api.put("api/towns/" +this.id , data).subscribe((result:any)=>{
       this.load();
        Swal.fire({
          icon: 'success',
          title: 'Successfully Updated',
          showConfirmButton: false,
          timer: 1500
        })

      })
    }
  }

  Delete(id:number){
    // alert(id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.delete("api/towns/" +id).subscribe((result:any)=>{
          this.load();
        });
        // Swal.fire(
        //   'Deleted!',
        //   'Your file has been deleted.',
        //   'success'
        // )
      }
    })

  }
  Edit(id:number){
    this.id=id;
    if(this.id != null){
      this.api.get("api/towns/" +this.id).subscribe((result:any)=>{
        // console.log(result);
        this.formdata.patchValue({
          id:this.id,
          name:result.name,
        });
      })
     }
  }
}
