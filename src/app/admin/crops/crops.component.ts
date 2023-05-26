import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crops',
  templateUrl: './crops.component.html',
  styleUrls: ['./crops.component.css']
})
export class CropsComponent implements OnInit {
  formdata:any;
  crops:any;
  id:any;

  constructor(private api:ApiService) { }
  ngOnInit(): void {
     this.load();
  }

  load(){
    this.id = null;
    this.formdata = new FormGroup({
      id:new FormControl(0),
      name: new FormControl("", Validators.compose([Validators.required])),
     })
    this.api.get("api/crops").subscribe((result:any)=>{
      this.crops = result;
   })
  }

  Save(data:any){
    if(this.id == null){
      this.api.post("api/crops", data).subscribe((result:any)=>{
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
      this.api.put("api/crops/" +this.id , data).subscribe((result:any)=>{
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
        this.api.delete("api/crops/" +id).subscribe((result:any)=>{
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
      this.api.get("api/crops/" +this.id).subscribe((result:any)=>{
        // console.log(result);
        this.formdata.patchValue({
          id:this.id,
          name:result.name,
        });
      })
     }
  }
}
