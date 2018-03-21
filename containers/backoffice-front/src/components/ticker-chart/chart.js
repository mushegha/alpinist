import { generate } from 'c3'

export function render (bindto) {

  const transition = {
    duration: 200
  }

  const data = {
    x: 'time',
    rows: []
  }

  const point = {
    show: false
  }

  const axis = {
    x: {
      type: 'timeseries',
      tick: {
        format: '%H:%M:%S',
      }
    }
  }

  return generate({
    bindto,
    transition,
    data,
    point,
    axis
  })
}
