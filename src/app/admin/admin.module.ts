import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LandingComponent } from './landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminsComponent } from './admins/admins.component';
import { CropsComponent } from './crops/crops.component';
import { FarmersComponent } from './farmers/farmers.component';
import { TownsComponent } from './towns/towns.component';
import { FarmerComponent } from './farmer/farmer.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { NgApexchartsModule } from 'ng-apexcharts';



@NgModule({
  declarations: [
       LandingComponent,
        DashboardComponent,
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        AdminsComponent,
        CropsComponent,
        FarmersComponent,
        TownsComponent,
        FarmerComponent,
        RecommendationsComponent,
        RecommendationComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule,
    NgApexchartsModule
  ]
})
export class AdminModule { }

