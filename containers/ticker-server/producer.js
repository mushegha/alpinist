const { Subject } = require('rxjs/Rx')

const MonitorCexio = require('./lib/cexio')

function Source () {
  const ticker$ = new Subject()

  MonitorCexio().subscribe(ticker$)

  const topic = 'tickers'

  return ticker$
}

Source()
  .subscribe(console.log)
