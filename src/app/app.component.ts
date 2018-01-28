import { Component, NgZone } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, ActivatedRoute }  from '@angular/router';
import { providers } from './services/providers.conf'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './spinner.sass']
})
export class AppComponent {
  title = 'app';
  providers= [];
  startMonth = 32;
  isSignedIn = false;
  loadingEnable = false;

  constructor(private router : Router, private zone: NgZone) {

    this.isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();

    gapi.auth2.getAuthInstance().isSignedIn.listen((isSignedIn) => {
      console.log('isSignedIn', isSignedIn)
      this.isSignedIn = isSignedIn;
      if (isSignedIn) {
        this.zone.run(() => {
          this.filter();
        })
      }
    });

    let nonUniqueProviders = providers.map(p=>p.tag);
    this.providers = Array.from(new Set(nonUniqueProviders)).map(name => {
      return {
        name: name,
        on : true
      }
    })

  }

  ngOnInit() {
   this.router.events.subscribe(event => {
       if (event instanceof NavigationStart) {
         this.loadingEnable = true;
       } else if (event instanceof NavigationEnd || event instanceof NavigationCancel){
         this.loadingEnable = false;
       }
   });
 }


  login() {
    gapi.auth2.getAuthInstance().signIn();
  }

  logout() {
    gapi.auth2.getAuthInstance().signOut();
    this.isSignedIn = false;
    this.router.navigate(['/login']);
  }

  filter() {
    let names = this.providers.filter(p => p.on).map(p => p.name);
    this.router.navigate(['/'],  {
      queryParams:
        {
          names : names,
          startMonth : this.startMonth
        }
    });
  }


}
