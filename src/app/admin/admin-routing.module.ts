import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminsComponent } from './admins/admins.component';
import { CropsComponent } from './crops/crops.component';
import { TownsComponent } from './towns/towns.component';
import { FarmersComponent } from './farmers/farmers.component';
import { FarmerComponent } from './farmer/farmer.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { AdminGuard } from './admin.guard';
import { RecommendationComponent } from './recommendation/recommendation.component';



const routes: Routes = [
  {path:"", canActivate:[AdminGuard], component:LandingComponent,
    children:[
      {path:"",component:DashboardComponent},
      {path:"dashboard", component:DashboardComponent},
      {path:"admins",component:AdminsComponent},
      {path:"crops",component:CropsComponent},
      {path:"towns",component:TownsComponent},
      {path:"farmers",component:FarmersComponent},
      {path:"farmer",component:FarmerComponent},
      {path:"farmer/:id",component:FarmerComponent},
      {path:"recommendation/:farmerid",component:RecommendationComponent},
      {path:"recommendations/:id",component:RecommendationsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
