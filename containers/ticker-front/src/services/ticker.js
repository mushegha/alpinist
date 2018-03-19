import Axios from 'axios'

import { Observable } from 'rxjs/Observable'


const api = Axios.create({
  baseURL: '/api/v1/ticker/'
})


function get ({ pair, provider }) {
  const uri = `${pair}/${provider}`

  return api
    .get(uri)
    .then(res => res.data)
}

export { get }
