import axios from 'axios'

let createRequest = function () {
  const Request = axios.create({
    baseURL: 'http://0.0.0.0:7777/'
  })
  return Request
}
export default createRequest