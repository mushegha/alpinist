import test from 'ava'

import {
  getBaseURL
} from '../lib/helpers'

test('getBaseURL', t => {
  const baseURL = getBaseURL()

  t.is(baseURL, 'http://localhost:5984')
})
