const {
  add,
  multiply,
  append,
  sortBy,
  prop,
  isEmpty,
  compose,
  last,
  head,
  curryN
} = require('ramda')

const { Maybe } = require('monet')

const sorted = sortBy(prop('level'))

const header = compose(last, sorted)
const footer = compose(head, sorted)

const headerLevel = compose(prop('level'), header)
const footerLevel = compose(prop('level'), footer)

const headerVolume = compose(prop('volume'), header)
const footerVolume = compose(prop('volume'), footer)

const weightOf = ({ level, volume }) => level * volume

const headerInvestment = compose(weightOf, header)
const footerInvestment = compose(weightOf, footer)

/**
 * Append new slot on given `level` if available
 *
 * @param {Object} opts
 * @param {number} opts.level_threshold
 * @param {number} opts.weight_initial -
 * @param {number} opts.weight_up_b - Addition
 * @param {number} opts.weight_up_k - Multiplication
 * @param {number} opts.weight_down_b
 * @param {number} opts.weight_down_k
 * @param {number} level
 * @param {Array}  slots
 *
 * @returm {Maybe} - Next volume
 */

function renderVolume (opts, level, slots = []) {
  const {
    level_threshold,
    weight_initial,
    weight_up_b,
    weight_up_k,
    weight_down_b,
    weight_down_k
  } = opts

  if (isEmpty(slots)) {
    const volume = weight_initial / level
    return Maybe.Some(volume)
  }

  const toVolume = weight => weight / level

  const weightNextHeader = compose(
    toVolume,
    add(weight_up_b),
    multiply(weight_up_k),
    headerInvestment
  )

  const weightNextFooter = compose(
    toVolume,
    add(weight_down_b),
    multiply(weight_down_k),
    footerInvestment
  )

  const marginHeader = headerLevel(slots) + level_threshold
  const marginFooter = footerLevel(slots) - level_threshold

  if (level >= marginHeader) {
    return Maybe.Some(weightNextHeader(slots))
  }

  if (level <= marginFooter) {
    return Maybe.Some(weightNextFooter(slots))
  }

  return Maybe.None()
}

function commitOpen (opts, level, slots = []) {
  return renderVolume(opts, level, slots)
    .map(volume => ({ level, volume }))
    .map(slot => append(slot, slots))
    .map(sorted)
    .orSome(slots)
}

module.exports = curryN(3, commitOpen)
