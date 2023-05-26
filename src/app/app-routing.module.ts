import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminModule } from './admin/admin.module';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"admin", loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)},
  {path:"**",component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
