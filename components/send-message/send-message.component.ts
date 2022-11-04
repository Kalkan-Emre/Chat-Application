import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {
  messageForm: FormGroup;
  submitted = false;

  constructor(    
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
    ) { 
      this.mainForm();
    }

  ngOnInit() {}

  mainForm() {
    this.messageForm = this.fb.group({
      to: ['', [Validators.required]],
      messageBody: ['', [Validators.required]],
    });
  }

  get myForm() {
    return this.messageForm.controls;
  }
  onSubmit() {
    let jsonObject = sessionStorage.getItem('user');
    let username = JSON.parse(jsonObject)["username"];
    const message = {
      to: this.messageForm.get('to').value,
      from: username,
      messageBody: this.messageForm.get('messageBody').value,
      date: Date.now()
    }
    this.submitted = true;

    if (!this.messageForm.valid) {
      return false;
    } else {

      return this.apiService.sendMessage(message).subscribe({
        complete: () => {
          console.log('Message Sent');
          let jsonObject = sessionStorage.getItem('user');
          let username = JSON.parse(jsonObject)["username"];
          const user_log = {
            username: username,
            activity: "send message",
            date: Date.now()
          }
          this.apiService.createUserLog(user_log).subscribe({
            error: (e) => {
              console.log(e);
            }
          });
          this.ngZone.run(() => this.router.navigateByUrl('/outbox'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }

}
