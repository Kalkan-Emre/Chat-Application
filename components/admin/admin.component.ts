import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ApiService } from './../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

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
      next: () => {
        this.authService.logout();
        this.ngZone.run(() => this.router.navigateByUrl('/login'));
      }
    });

  }

}