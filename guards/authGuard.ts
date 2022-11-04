import { Injectable, NgZone } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor (private authService:AuthService, private router:Router, private ngZone: NgZone){}
  canActivate() {
    if(sessionStorage.getItem('id_token')==null){
      this.authService.logout();
      this.ngZone.run(() => this.router.navigateByUrl('/login'));
      return true;
    }
  }
}