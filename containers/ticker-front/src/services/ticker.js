import Axios from 'axios'


const baseURL = '/api/v1/ticker/'


const API = Axios.create({ baseURL })


export function get ({ pair, provider }) {
  const uri = `${pair}/${provider}`

  return API
    .get(uri)
    .then(res => res.data)
}
