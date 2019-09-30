import createRequest from '../core/request'

const request = createRequest()

const getLoginStatus = (username, password) => {
  return request.post('/test', { username, password })
}
export default {
  getLoginStatus
}