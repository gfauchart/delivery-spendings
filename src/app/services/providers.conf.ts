export const providers = [
  {
    tag: 'Deliveroo',
    from: 'info@deliveroo.co.uk',
    subjects: ['Your order from', 'has been accepted'],
    price :  {
      getter : (str) => parseFloat(str.match(/Total\s+£([0-9.]+)/)[1])
    }
  },
  {
    tag: 'PapaJohns',
    from: 'info@papajohns.co.uk',
    subjects: ['Papa John', 'Your order', 'is confirmed'],
    price : {
      getter : (str) => parseFloat(str.match(/TOTAL\s+£([0-9.]+)/)[1])
    }
  },
  {
    tag: 'UberEATS',
    from: 'uber.uk@uber.com',
    subjects: ['order with UberEATS'],
    price : {
      getter : (str) => parseFloat(str.match(/\s£([0-9.]+)\s/)[1])
    }
  },
  {
    tag: 'UberEATS',
    from: 'uber.uk@uber.com',
    subjects: ['order with Uber EATS'],
    price : {
      getter : (str) => parseFloat(str.match(/\s£([0-9.]+)\s/)[1])
    }
  },
  {
    tag: 'JustEat',
    from: 'noreplyuk@just-eat.info',
    subjects: ['Your order\'s in the bag'],
    price : {
      getter : (str) => parseFloat(str.match(/Total:[^£]*£([0-9.]+)/)[1])
    }
  },
]
