import { userConstants } from '../_constants'
import Cookies from 'universal-cookie'

const cookies = new Cookies()
const user = cookies.get('email')
const initialState = user ? { loggedIn: true, user } : {}

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      }
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      }
    case userConstants.LOGIN_FAILURE:
      return {}
    case userConstants.LOGOUT:
      return {}
    default:
      return state
  }
}
