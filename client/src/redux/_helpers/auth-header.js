import Cookies from 'universal-cookie'

const cookies = new Cookies()

export function authHeader() {
  // return authorization header with jwt token
  const token = cookies.get('token')

  if (token) {
    return { Authorization: 'Bearer ' + token }
  } else {
    return {}
  }
}
