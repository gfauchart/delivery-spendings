const cheerio = require('cheerio')


enum ProviderType {
  FOOD = 'food',
  SHOPPING = 'shopping',
  FLIGHTS = 'flight'
}


var findByRegexp = function(str, rgx) {
  let matches = str.match(rgx);

  if (matches && matches.length > 0) {
    return parseFloat(matches[1]);
  } else {
    console.warn('price not found defaulting to 0');
    return 0.0;
  }

}


//from:auto-confirm@amazon.co.uk
export const providers = [
  {
    tag: 'Amazon',
    type: ProviderType.SHOPPING,
    from: 'auto-confirm@amazon.co.uk',
    subjects: ['Your Amazon.co.uk order'],
    price :  {
      getter : (str) => findByRegexp(str, /Order Total:[^£]*£([0-9.]+)/)
    }
  },
  {
    tag: 'Asos',
    type: ProviderType.SHOPPING,
    from: 'order_confirm@asos.com',
    subjects: ['Thanks for your order!'],
    price :  {
      getter : (str) => {
        const $ = cheerio.load(str);

        var trPrice = $("td").filter(function() {
          return $(this).text().trim() === 'Total';
        })[0].parent;

        return parseFloat($(trPrice).find('td:nth-child(2)').text());
      }
    }
  },
  {
    tag: 'PizzaHut',
    type: ProviderType.FOOD,
    from: 'orders@pizzahut.io',
    subjects: ['Pizza Hut: Your order is in the kitchen'],
    price :  {
      getter : (str) => findByRegexp(str, /Total:[^£]*£([0-9.]+)/)
    }
  },
  {
    tag: 'Deliveroo',
    type: ProviderType.FOOD,
    from: 'info@deliveroo.co.uk',
    subjects: ['Your order from', 'has been accepted'],
    price :  {
      getter : (str) => findByRegexp(str, /Total\s+£([0-9.]+)/)
    }
  },
  {
    tag: 'Deliveroo',
    type: ProviderType.FOOD,
    from: 'info@deliveroo.co.uk',
    subjects: ['has accepted your order'],
    price :  {
      getter : (str) => findByRegexp(str, /Total\s+£([0-9.]+)/)
    }
  },
  {
    tag: 'PapaJohns',
    type: ProviderType.FOOD,
    from: 'info@papajohns.co.uk',
    subjects: ['Papa John', 'Your order', 'is confirmed'],
    price : {
      getter : (str) => findByRegexp(str, /TOTAL\s+£([0-9.]+)/)
    }
  },
  {
    tag: 'UberEATS',
    type: ProviderType.FOOD,
    from: 'uber.uk@uber.com',
    subjects: ['order with UberEATS'],
    price : {
      getter : (str) => findByRegexp(str, /\s£([0-9.]+)\s/)
    }
  },
  {
    tag: 'UberEATS',
    type: ProviderType.FOOD,
    from: 'uber.uk@uber.com',
    subjects: ['order with Uber EATS'],
    price : {
      getter : (str) => findByRegexp(str, /\s£([0-9.]+)\s/)
    }
  },
  {
    tag: 'JustEat',
    type: ProviderType.FOOD,
    from: 'noreplyuk@just-eat.info',
    subjects: ['Your order\'s in the bag'],
    price : {
      getter : (str) => findByRegexp(str, /Total:[^£]*£([0-9.]+)/)
    }
  },
  {
    tag: 'JustEat',
    type: ProviderType.FOOD,
    from: 'justeat@order.just-eat.co.uk',
    subjects: ['Your order', 'is in the bag'],
    price : {
      getter : (str) => findByRegexp(str, /Total:[^£]*£([0-9.]+)/)
    }
  },
  {
    tag: 'JustEat',
    type: ProviderType.FOOD,
    from: 'justeat@order.just-eat.co.uk',
    subjects: ['Your order from'],
    price : {
      getter : (str) => findByRegexp(str, /Total:[^£]*£([0-9.]+)/)
    }
  },
]
