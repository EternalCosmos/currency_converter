import axios from 'axios';

export const makeRequest = (method, url, string) => {
  return axios({
    method,
    url,
    string
  })
}
