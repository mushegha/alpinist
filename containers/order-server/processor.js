const Channel = require('./lib/channel')

const { Observable } = require('rxjs/Rx')

const { evolve, always } = require('ramda')

const mockProcessor = order => {
  const updated = evolve({
    status: always('closed'),
    price: x => x + Math.random(),
    ts: _ => Date.now()
  })

  return Observable
    .of(updated(order))
}

const source = Channel.Observable('mock')
  .filter(o => o.status === 'new')

const sink = Channel.Observer()

source
  .flatMap(mockProcessor)
  .subscribe(sink)
