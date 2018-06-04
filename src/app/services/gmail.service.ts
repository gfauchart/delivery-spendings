
import { providers } from './providers.conf'
import { Utils } from './utils'

import * as moment from 'moment';

export class GmailService {

  constructor() {

  }

  public buildQuery(names, startMonth) : string {
    var queryPart = [];

    let targetProviders = providers;

    if (names) {
      targetProviders = targetProviders.filter((p) => names.indexOf(p.tag) >= 0);
    }

    targetProviders.forEach(provider => {
      var localquery = [];
      for (var j = 0; j < provider.subjects.length; j++) {
        localquery.push('subject:"' + provider.subjects[j] + '"');
      }
      localquery.push('from:' + provider.from)
      queryPart.push('(' + localquery.join(' AND ') + ')');
    })

    let start = moment().subtract(startMonth, 'month').startOf('month').format('YYYY/MM/DD');

    return queryPart.join(' OR ') + ` AND after:${start}`;

  }

  public download(names, startMonth) {

    var ORDERS = [];
    var gapiClient = <any>gapi.client;
    var q = this.buildQuery(names, startMonth);
    console.log(q);

    function downloadsEmails(nextPageToken?) {

      return gapiClient.gmail.users.messages.list({
        'userId': 'me',
        'q' : q,
        'pageToken' : nextPageToken
      }).then(function(response) {

        if (!response.result.messages) {
          return [];
        }

        let ids = response.result.messages.map(m => m.id);

        var batch = gapiClient.newBatch();
        for (var i = 0; i < ids.length; i++) {
          batch.add(gapiClient.gmail.users.messages.get({
            'userId': 'me',
            id : ids[i]
          }))

        }

        return batch.then((results) => {
          for (let i in results.result) {
            let mail = results.result[i].result;
            if (mail.payload.parts) {
              var parts = mail.payload.parts.find(p => p.mimeType = "text/plain");

              if (parts.body.size == 0) {
                var email = parts.parts.find(p => p.mimeType = "text/plain").body.data;
              } else {
                var email = parts.body.data;
              }

              if (!email) {
                console.log('email body not found');
                continue;
                //var email = mail.payload.parts.parts.find(p => p.mimeType = "text/plain").body.data;
              }
            } else {
              var email = mail.payload.body.data;
            }

            var from = mail.payload.headers.find(h => h.name == "From").value;

            var provider =  providers.find(p => from.indexOf(p.from) >= 0);

            if (!provider) {
              console.log('provider not found for email:' + from);
              continue;
            }
            let orderPrice = provider.priceGetter(Utils.b64DecodeUnicode(email));

            ORDERS.push({
              tag : provider.tag,
              timestamp: mail.internalDate,
              price : orderPrice
            })

          }

          if (response.result.nextPageToken) {
            return downloadsEmails(response.result.nextPageToken)
          } else {
            return ORDERS;
          }

        })


      });
    }


    return downloadsEmails().then(() => {
      return ORDERS;
    })
  }

}
