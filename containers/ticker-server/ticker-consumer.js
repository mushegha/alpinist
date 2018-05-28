const TickerSource = require('@alpinist/ticker-source-kafka')

const host = '178.62.246.62:2181'

const ticker$ = TickerSource({ host })

ticker$
  .subscribe(console.log)
