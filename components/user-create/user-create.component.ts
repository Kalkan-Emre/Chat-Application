import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent implements OnInit {

  submitted = false;
  userForm: FormGroup;
  UserProfile: any = ['regular', 'admin'];
  Gender: any = ['male','female']
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService,
  ) {
    this.mainForm();
  }
  ngOnInit() {}
  mainForm() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      designation: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      birthDate: ['',[Validators.required]]
    });
  }
  // Choose designation and gender with select dropdown
  updateProfile(e) {
    this.userForm.get('designation').setValue(e, {
      onlySelf: true,
    });
  }
  updateGender(e) {
    this.userForm.get('gender').setValue(e, {
      onlySelf: true,
    });
  }
  // Getter to access form control
  get myForm() {
    return this.userForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (!this.userForm.valid) {
      return false;
    } else {
      return this.apiService.createUser(this.userForm.value).subscribe({
        complete: () => {
          console.log('User successfully created!');
          const user_log = {
            username: this.userForm.get('username').value,
            activity: "user created",
            date: Date.now()
          }
          this.apiService.createUserLog(user_log).subscribe({
            error: (e) => {
              console.log(e);
            }
          });
          this.ngZone.run(() => this.router.navigateByUrl('/list-users'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }

}
