const cheerio = require('cheerio')

export enum ProviderType {
  FOOD = 'food',
  SHOPPING = 'shopping',
  FLIGHTS = 'flight'
}

export interface Provider {
  tag: string;
  type: ProviderType;
  from: string;
  subjects: string[];
  priceGetter : (htmlInput: string) => number;
}

var findByRegexp = function(str, rgx) : number {
  let matches = str.match(rgx);

  if (matches && matches.length > 0) {
    return parseFloat(matches[1]);
  } else {
    console.warn('price not found defaulting to 0');
    return 0.0;
  }
}

export const providers : Provider[]= [
  {
    tag: 'Amazon',
    type: ProviderType.SHOPPING,
    from: 'auto-confirm@amazon.co.uk',
    subjects: ['Your Amazon.co.uk order'],
    priceGetter : (htmlInput : string) => findByRegexp(htmlInput, /Order Total:[^£]*£([0-9.]+)/)
  },
  {
    tag: 'Asos',
    type: ProviderType.SHOPPING,
    from: 'order_confirm@asos.com',
    subjects: ['Thanks for your order!'],
    priceGetter : (str) => {
      const $ = cheerio.load(str);

      var trPrice = $("td").filter(function() {
        return $(this).text().trim() === 'Total';
      })[0].parent;

      return parseFloat($(trPrice).find('td:nth-child(2)').text());
    }
  },
  {
    tag: 'PizzaHut',
    type: ProviderType.FOOD,
    from: 'orders@pizzahut.io',
    subjects: ['Pizza Hut: Your order is in the kitchen'],
    priceGetter : (str) => findByRegexp(str, /Total:[^£]*£([0-9.]+)/)
  },
  {
    tag: 'Deliveroo',
    type: ProviderType.FOOD,
    from: 'info@deliveroo.co.uk',
    subjects: ['Your order from', 'has been accepted'],
    priceGetter : (str) => findByRegexp(str, /Total\s+£([0-9.]+)/),
  },
  {
    tag: 'Deliveroo',
    type: ProviderType.FOOD,
    from: 'info@deliveroo.co.uk',
    subjects: ['has accepted your order'],
    priceGetter : (str) => findByRegexp(str, /Total\s+£([0-9.]+)/)
  },
  {
    tag: 'PapaJohns',
    type: ProviderType.FOOD,
    from: 'info@papajohns.co.uk',
    subjects: ['Papa John', 'Your order', 'is confirmed'],
    priceGetter : (str) => findByRegexp(str, /TOTAL\s+£([0-9.]+)/),
  },
  {
    tag: 'UberEATS',
    type: ProviderType.FOOD,
    from: 'uber.uk@uber.com',
    subjects: ['order with UberEATS'],
    priceGetter : (str) => findByRegexp(str, /\s£([0-9.]+)\s/)
  },
  {
    tag: 'UberEATS',
    type: ProviderType.FOOD,
    from: 'uber.uk@uber.com',
    subjects: ['order with Uber EATS'],
    priceGetter : (str) => findByRegexp(str, /\s£([0-9.]+)\s/)
  },
  {
    tag: 'JustEat',
    type: ProviderType.FOOD,
    from: 'noreplyuk@just-eat.info',
    subjects: ['Your order\'s in the bag'],
    priceGetter : (str) => findByRegexp(str, /Total:[^£]*£([0-9.]+)/)
  },
  {
    tag: 'JustEat',
    type: ProviderType.FOOD,
    from: 'justeat@order.just-eat.co.uk',
    subjects: ['Your order', 'is in the bag'],
    priceGetter : (str) => findByRegexp(str, /Total:[^£]*£([0-9.]+)/)
  },
  {
    tag: 'JustEat',
    type: ProviderType.FOOD,
    from: 'justeat@order.just-eat.co.uk',
    subjects: ['Your order from'],
    priceGetter : (str) => findByRegexp(str, /Total:[^£]*£([0-9.]+)/)
  },
]
