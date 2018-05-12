const { evolve } = require('ramda')

const touch = evolve({
  price (value) {
    return value + Math.random()
  }
})

const delay = t =>
  new Promise(r => setTimeout(r, t))

function createProcessor () {

  return job => {
    const { data } = job

    return job
      .update(touch(data))
      .then(_ => delay(10))
  }
}

module.exports = createProcessor
