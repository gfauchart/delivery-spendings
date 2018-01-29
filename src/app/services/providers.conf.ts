export const providers = [
  {
    tag: 'Deliveroo',
    from: 'info@deliveroo.co.uk',
    subjects: ['Your order from', 'has been accepted'],
    price :  {
      getter : (str) => (str.match(/Total\s+£([0-9.]+)/))
    }
  },
  {
    tag: 'Deliveroo',
    from: 'info@deliveroo.co.uk',
    subjects: ['has accepted your order'],
    price :  {
      getter : (str) => (str.match(/Total\s+£([0-9.]+)/))
    }
  },
  {
    tag: 'PapaJohns',
    from: 'info@papajohns.co.uk',
    subjects: ['Papa John', 'Your order', 'is confirmed'],
    price : {
      getter : (str) => (str.match(/TOTAL\s+£([0-9.]+)/))
    }
  },
  {
    tag: 'UberEATS',
    from: 'uber.uk@uber.com',
    subjects: ['order with UberEATS'],
    price : {
      getter : (str) => (str.match(/\s£([0-9.]+)\s/))
    }
  },
  {
    tag: 'UberEATS',
    from: 'uber.uk@uber.com',
    subjects: ['order with Uber EATS'],
    price : {
      getter : (str) => (str.match(/\s£([0-9.]+)\s/))
    }
  },
  {
    tag: 'JustEat',
    from: 'noreplyuk@just-eat.info',
    subjects: ['Your order\'s in the bag'],
    price : {
      getter : (str) => (str.match(/Total:[^£]*£([0-9.]+)/))
    }
  },
  {
    tag: 'JustEat',
    from: 'justeat@order.just-eat.co.uk',
    subjects: ['Your order', 'is in the bag'],
    price : {
      getter : (str) => (str.match(/Total:[^£]*£([0-9.]+)/))
    }
  },
  {
    tag: 'JustEat',
    from: 'justeat@order.just-eat.co.uk',
    subjects: ['Your order from'],
    price : {
      getter : (str) => (str.match(/Total:[^£]*£([0-9.]+)/))
    }
  },
]
