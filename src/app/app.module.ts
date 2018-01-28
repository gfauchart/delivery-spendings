import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { BarComponent } from './charts-components/bar.component'
import { PieComponent } from './charts-components/pie.component'
import { LineComponent } from './charts-components/line.component'
import {LoginComponent} from './login/login.component'
import {SpendingsComponent} from './spendings/spendings.component'
import {GmailService} from './services/gmail.service'


@NgModule({
  declarations: [
    AppComponent,
    PieComponent,
    BarComponent,
    LineComponent,
    LoginComponent,
    SpendingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [GmailService],
  bootstrap: [AppComponent]
})
export class AppModule { }
