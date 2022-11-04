import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor (private authService:AuthService, private router:Router){}

  canActivate() {
    if(this.authService.isAdmin()) {
      return true;
    } else {
      console.warn("You are not an admin")
      this.router.navigate(['/user']);
      return false;
    }
  }
}