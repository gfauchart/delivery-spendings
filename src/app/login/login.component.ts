import { Component } from '@angular/core';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  login() {
    gapi.auth2.getAuthInstance().signIn();
  }
}
