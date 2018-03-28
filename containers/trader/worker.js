const debug = require('debug')('alp:trader:worker')

const {
  Bull,
  Monk,
  Redis
} = require('./lib/clients')

const { Ladder } = require('./lib/workers')

const { Targets } = require('./lib/observables')

/**
 * Initialize clients
 */

const bull = new Bull('traders')

const monk = new Monk()

const redis = new Redis()


bull.process(Ladder({ monk }))

/**
 *
 */

const targets$ = Targets({ redis, monk })

async function next (target) {
  console.log(target)
  bull.add(target)
}

const sub = targets$.subscribe({ next })

setTimeout(() => sub.unsubscribe(), 10e3)
