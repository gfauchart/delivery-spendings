import { Component, NgZone } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, ActivatedRoute }  from '@angular/router';
import { providers, Provider } from './services/providers.conf'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './spinner.sass']
})
export class AppComponent {
  providers = {};
  providersList = [];
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

    let uniqueMap = {}
    for (let i = 0; i < providers.length; i++) {
        let provider : Provider = providers[i];
        this.providers [provider.type] = this.providers [provider.type] || [];
        if (!uniqueMap[provider.tag]) {
          let providerUi = {
            name: provider.tag,
            on : true
          };
          this.providers[provider.type].push(providerUi);
          this.providersList.push(providerUi);
        }
        uniqueMap[provider.tag] = true;
    }

  }

  getProvidersArray() : Array<string> {
    return Object.keys(this.providers);
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
    let names = this.providersList.filter(p => p.on).map(p => p.name);
    this.router.navigate(['/'],  {
      queryParams:
        {
          names : names,
          startMonth : this.startMonth
        }
    });
  }


}
