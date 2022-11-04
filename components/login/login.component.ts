import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ApiService } from './../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
    ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }
    const user_log = {
      username: this.username,
      activity: "login",
      date: Date.now()
    }

    this.authService.authenticateUser(user).subscribe({
        next: (data) => {
          this.authService.storeUserData(data['token'], data['user']);
          if(data['success']){
            this.apiService.createUserLog(user_log).subscribe({
              error: (e) => {
                console.log(e);
              }
            })
            
            if(data['user'].designation=='admin'){
              this.ngZone.run(() => this.router.navigateByUrl('/admin'));
            }
            else{
              this.ngZone.run(() => this.router.navigateByUrl('/user'));
            }
          }
          
        },
        error: (e) => {
          console.log(e);
        }
      }
    );
  }
}

