
import { Injectable }             from '@angular/core';
import { Observable }             from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';

import {GmailService} from './gmail.service'

@Injectable()
export class GmailResolver  {
  constructor(private router: Router, private gmail : GmailService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Promise<any> {
    return this.gmail.download(route.queryParams.names, route.queryParams.startMonth || 32);
  }
}
