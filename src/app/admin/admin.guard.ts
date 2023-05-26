import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  canActivate(): boolean {
    if(localStorage.getItem("usertype") == null)
      return false;

    if(localStorage.getItem("usertype")?.toString() != "admin")
      return false;


    return true;
  }

}
