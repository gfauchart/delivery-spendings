import { Component } from '@angular/core';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  providerImages = [
    './assets/providerImages/asos.png',
    './assets/providerImages/uberEATS.png',
    './assets/providerImages/jsutEat.png',
    './assets/providerImages/PizzaHut.png',
    './assets/providerImages/amazon.png'
  ]

  login() {
    gapi.auth2.getAuthInstance().signIn();
  }
}
