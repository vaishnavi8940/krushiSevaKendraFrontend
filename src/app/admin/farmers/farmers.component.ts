import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-farmers',
  templateUrl: './farmers.component.html',
  styleUrls: ['./farmers.component.css']
})
export class FarmersComponent implements OnInit {
farmers: any;

  constructor(private api:ApiService){ }

  ngOnInit(): void {
     this.load();
  }

  load(){
    this.api.get("api/farmers").subscribe((result:any)=>{
      this.farmers = result;
  })
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
      this.api.delete("api/farmers/" +id).subscribe((result:any)=>{
        this.load();
      });
    }
  })
  }
}
