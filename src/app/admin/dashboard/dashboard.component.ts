import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  ApexYAxis }  from "ng-apexcharts";
import { ApexAxisChartSeries, ApexChart, ApexTitleSubtitle } from 'ng-apexcharts';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
admincount:any;
cropcount:any;
farmercount:any;
towncount:any;

rCount:any;
yaxis: ApexYAxis | ApexYAxis[] | any;
series: ApexAxisChartSeries | any;
chart: ApexChart | any;
title: ApexTitleSubtitle | any;

chartOptions:any;

  constructor(private api:ApiService){

    this.chartOptions = {
      series: [
        {
          name: "Recommendations",
          data: [],
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Recommendations by Dates",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },

      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep"
        ]
      }
    };

  }


  ngOnInit(): void {

    this.api.get("api/recommendations").subscribe((result:any)=>{
     // console.log(result);
       this.rCount = result;
      //  this.chartOptions.series[0].data[0] = this.rCount;
        console.log(this.rCount);
        for(let i =0;i<this.rCount.length;i++)
    {
      this.chartOptions.series[0].data[i] =(this.rCount[i].count)*1;
      this.chartOptions.xaxis.categories[i] =  formatDate(this.rCount[i].rdate, 'dd-MM-yyyy', 'en');;
      console.log(this.rCount[i].rdate);
    }
    })

  // this.api.get("api/recommendations").subscribe((result:any)=>{
  //   this.rCount = result.length;
  //   this.chartOptions.series[0].data[0] = this.rCount;
  //   console.log(this.rCount);
  // })

  // this.api.get("api/recommendations").subscribe((result:any)=>{
  //   this.rCount = result.length;
  // })

    this.api.get("api/admins").subscribe((result:any)=>{
      this.admincount = result;
  });
  this.api.get("api/crops").subscribe((result:any)=>{
    this.cropcount = result;
  });
  this.api.get("api/towns").subscribe((result:any)=>{
    this.towncount = result;
  });
  this.api.get("api/farmers").subscribe((result:any)=>{
   this.farmercount = result;
   });
 }

}
