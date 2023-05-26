import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import Swal from 'sweetalert2';
import { RecommendationComponent } from '../recommendation/recommendation.component';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {

  recommendations: any;
  farmer: any;
  id:any;
  crop:any;
  admin:any;

  constructor(private api:ApiService, private router:Router, private route:ActivatedRoute, private matdialog:MatDialog) {
    this.id = this.route.snapshot.paramMap.get("id");
   }

  ngOnInit(): void {
    // this.api.get("api/recommendations/" +this.id).subscribe((result:any)=>{
    //   this.recommendations = result;
    //   console.log(this.recommendations);
    //  })
     this.load();
  }

  load(){
    this.api.get("api/farmers/" +this.id).subscribe((result:any)=>{
      this.farmer = result;
    })

    this.api.get("api/crops").subscribe((result:any)=>{
      this.crop = result;
      //console.log(this.crop);
    })

    this.api.get("api/admins").subscribe((result:any)=>{
      this.admin = result;
     // console.log(this.admin);
    })

    this.api.get("api/recommendations/" +this.id).subscribe((result:any)=>{
      this.recommendations = result;
      //console.log(this.recommendations);
     })
  }

  OpenPop(){
    this.matdialog.open(RecommendationComponent, {data:{id:this.id}})
  }


  Delete(id:number){
    //alert(id);
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
       this.api.delete("api/recommendations/" +id).subscribe((result:any)=>{
         this.load();
       });
     }
   })
  // this.api.delete("api/recommendations/" +id).subscribe((result:any)=>{
  //   this.load();
  // });
   }


}
