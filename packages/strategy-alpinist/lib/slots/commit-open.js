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

const ybkx = curryN(3, (b, k, x) => b + k * x)

const sorted = sortBy(prop('level'))

const header = compose(last, sorted)
const footer = compose(head, sorted)

const headerLevel = compose(prop('level'), header)
const footerLevel = compose(prop('level'), footer)

const headerWeight = compose(prop('weight'), header)
const footerWeight = compose(prop('weight'), footer)

const investmentFrom = ({ level, weight }) =>
  level * weight

const headerInvestment = compose(investmentFrom, header)
const footerInvestment = compose(investmentFrom, footer)

/**
 * Append new slot on given `level` if available
 *
 * @param {Object} opts
 * @param {number} opts.level_threshold
 * @param {number} opts.investment_initial -
 * @param {number} opts.investment_up_b - Addition
 * @param {number} opts.investment_up_k - Multiplication
 * @param {number} opts.investment_down_b
 * @param {number} opts.investment_down_k
 * @param {number} level
 * @param {Array}  slots
 *
 * @returm {Maybe} - Next weight
 */

function renderWeight (opts, level, slots = []) {
  const {
    level_threshold,
    investment_initial,
    investment_up_b,
    investment_up_k,
    investment_down_b,
    investment_down_k
  } = opts

  if (isEmpty(slots)) {
    const weight = investment_initial / level
    return Maybe.Some(weight)
  }

  const toWeight = investment => investment / level

  const weightNextHeader = compose(
    toWeight,
    add(investment_up_b),
    multiply(investment_up_k),
    headerInvestment
  )

  const weightNextFooter = compose(
    toWeight,
    add(investment_down_b),
    multiply(investment_down_k),
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
  return renderWeight(opts, level, slots)
    .map(weight => ({ level, weight }))
    .map(slot => append(slot, slots))
    .map(sorted)
    .orSome(slots)
}

module.exports = curryN(3, commitOpen)
