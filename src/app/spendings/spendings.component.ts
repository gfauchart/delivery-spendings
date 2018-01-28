import { Component, NgZone} from '@angular/core';
import { Router, ActivatedRoute, Params,  } from '@angular/router';

import {GmailService} from '../services/gmail.service';

@Component({
  templateUrl: './spendings.component.html',
  styleUrls: ['./spendings.component.scss']
})
export class SpendingsComponent {

  constructor(
    public router: Router,
  ) {
  }

}
