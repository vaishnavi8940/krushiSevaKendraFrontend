import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import Swal from 'sweetalert2';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})

export class RecommendationComponent implements OnInit {
  formdata:any;
  crops:any;
  id:any;
  farmer:any;
  recommendations:any;
  selectedDate: Date | undefined;

  constructor(private api:ApiService, private router:Router, private route:ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data:any) {
    //this.id = this.route.snapshot.paramMap.get("farmerid");
    this.api.get("api/farmers/" +this.data.id).subscribe((result:any)=>{
      this.farmer = result;
      console.log(this.farmer);

    })
  }

  

  ngOnInit(): void {
    this.api.get("api/crops").subscribe((result:any)=>{
      this.crops = result;
  })
  this.load();
  }

 load(){
  this.formdata = new FormGroup({
    id:new FormControl(0),
    rdate:new FormControl(new Date()),
    message: new FormControl("", Validators.compose([Validators.required])),
    cropid:new FormControl(1, Validators.compose([Validators.required])),
    adminid:new FormControl(parseInt(localStorage.getItem("id") || '0'), Validators.compose([Validators.required])),
    farmerid:new FormControl(parseInt(this.data.id),Validators.compose([Validators.required])),
   })

  this.api.get("api/recommendations/" +this.data.id).subscribe((result:any)=>{
    this.recommendations = result;
   })
}

Save(data:any){
  console.log(data);
      this.api.post("api/recommendations", data).subscribe((result:any)=>{
         console.log(result);
      })
    }
}
