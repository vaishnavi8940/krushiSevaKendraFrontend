import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-farmer',
  templateUrl: './farmer.component.html',
  styleUrls: ['./farmer.component.css']
})
export class FarmerComponent implements OnInit {

  formdata:any;
  id:any;
  farmers:any;
  towns:any;

  constructor(private api:ApiService, private router:Router, private route:ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get("id");
  }
  ngOnInit(): void {

    this.api.get("api/towns").subscribe((result:any)=>{
      this.towns = result;
  })
     this.load();
  }

 load(){
  this.formdata = new FormGroup({
    id:new FormControl(0),
    name: new FormControl("", Validators.compose([Validators.required])),
    mobileno: new FormControl("", Validators.compose([Validators.required])),
    townid: new FormControl(0, Validators.compose([Validators.required])),
    town:new FormControl(0, Validators.compose([Validators.required]))
   })

   if(this.id != null){
    this.api.get("api/farmers/" +this.id).subscribe((result:any)=>{
       //console.log(result);
      this.formdata.patchValue({
        id:this.id,
        name:result.name,
        mobileno:result.mobileno,
        townid:result.townid
      })
    })
   }
 }

  Save(data:any){
    if(this.id == null){
      this.api.post("api/farmers", data).subscribe((result:any)=>{
        this.router.navigate(['/admin/farmers']);
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
      this.api.put("api/farmers/" +this.id , data).subscribe((result:any)=>{
        this.router.navigate(['/admin/farmers']);
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

}

