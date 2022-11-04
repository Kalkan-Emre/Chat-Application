import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ApiService } from './../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

  onLogout(){
    let jsonObject = sessionStorage.getItem('user');
    let username = JSON.parse(jsonObject)["username"];
    const user_log = {
      username: username,
      activity: "logout",
      date: Date.now()
    }
    this.apiService.createUserLog(user_log).subscribe({
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        this.authService.logout();
        this.ngZone.run(() => this.router.navigateByUrl('/login'));
      }
    });
  }

}