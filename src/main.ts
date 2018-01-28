import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const CLIENT_ID = '12647830247-v3efd87ar33du3t89g8snvqio7s7tf9r.apps.googleusercontent.com';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];
const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';

let node = document.createElement('script');
node.src = 'https://apis.google.com/js/api.js';
node.type = 'text/javascript';
node.charset = 'utf-8';
document.getElementsByTagName('head')[0].appendChild(node);
node.onload = () => {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES
      }).then(function () {
        platformBrowserDynamic().bootstrapModule(AppModule)
          .catch(err => console.log(err));
      });
    });
};
