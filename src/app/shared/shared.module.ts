import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports:[
    HttpClientModule
  ],
  providers:[
    ApiService
  ]
})
export class SharedModule { }
