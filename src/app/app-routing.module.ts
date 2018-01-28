import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginComponent} from './login/login.component'
import {SpendingsComponent} from './spendings/spendings.component'
import {AuthGuardService} from './services/login.guard';
import {GmailResolver} from './services/gmail.resolver';

const routes: Routes = [
  {
    path: '',
    resolve: {
      data : GmailResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    canActivate: [AuthGuardService],
    component: SpendingsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  { enableTracing: false, useHash: true })],
  exports: [RouterModule],
  providers: [AuthGuardService, GmailResolver]
})
export class AppRoutingModule { }
