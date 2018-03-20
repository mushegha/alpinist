import Axios from 'axios'


const baseURL = '/api/v1/ladder/'


const API = Axios.create({ baseURL })


export function get ({ pair, provider }) {
  const uri = `${provider}/${pair}`

  return API
    .get(uri)
    .then(res => res.data)
}
