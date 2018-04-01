const debug = require('debug')('alp:trader')

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

const monk = new Monk()

const redis = new Redis()

const bull = new Bull('traders')


bull.process(Ladder())

/**
 *
 */

const targets$ = Targets({ redis, monk })

async function next (target) {
  bull.add(target)
}

const sub = targets$.subscribe({ next })

// setTimeout(() => sub.unsubscribe(), 10e3)
