const TIME       = Date.now()
const INVESTMENT = 100
const PRICE      = 500

const xTicker = (t = 0, dev = t) => {
  const timestamp = TIME + t * 60e3

  const ask = PRICE + dev
  const bid = ask - 1

  return {
    timestamp,
    ask,
    bid
  }
}

const xOpenOrder = (ticker) => {
  const price = ticker.ask
  const amount = INVESTMENT / price

  return { price, amount }
}

const orderClose = {
  price: 520,
  amount: void 0
}

const records = [
  {
    _id: 0,
    tickerOpen: xTicker(0),
    tickerClose: xTicker(4, 21),
    orderClose
  },
  {
    _id: 1,
    tickerOpen: xTicker(1, 10),
    tickerClose: xTicker(4, 21),
    orderClose
  },
  {
    _id: 2,
    tickerOpen: xTicker(2, 20),
  },
  {
    _id: 3,
    tickerOpen: xTicker(3, -10),
    tickerClose: xTicker(4, 21),
    orderClose
  },
  {
    _id: 5,
    tickerOpen: xTicker(5, 30),
  }
]

export default function () {
  return {
    records: records.map(r => {
      r.orderOpen = xOpenOrder(r.tickerOpen)
      return r
    })
  }
}

