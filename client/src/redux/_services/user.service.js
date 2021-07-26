import { LOCAL_API_URL } from '../../config'
import { authHeader } from '../_helpers'
import Cookies from 'universal-cookie'

export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  forgotPassword,
  resetPassword,
  delete: _delete,
}

const cookies = new Cookies()

function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }

  return fetch(`${LOCAL_API_URL}/users/authenticate`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      cookies.set('token', user.jwtToken, {
        path: '/',
        maxAge: 86400,
        sameSite: true,
      })
      cookies.set('email', user.email, {
        path: '/',
        maxAge: 86400,
        sameSite: true,
      })
      cookies.set('loggedIn', true, {
        path: '/',
        maxAge: 86400,
        sameSite: true,
      })
      return user
    })
}

function logout() {
  cookies.remove('loggedIn')
  cookies.remove('email')
  cookies.remove('token')
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  }

  return fetch(`${LOCAL_API_URL}/users`, requestOptions).then(handleResponse)
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  }

  return fetch(`${LOCAL_API_URL}/users/${id}`, requestOptions).then(
    handleResponse
  )
}

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  }

  return fetch(`${LOCAL_API_URL}/users/register`, requestOptions).then(
    handleResponse
  )
}

function update(user) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  }

  return fetch(`${LOCAL_API_URL}/users/${user.id}`, requestOptions).then(
    handleResponse
  )
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  }

  return fetch(`${LOCAL_API_URL}/users/${id}`, requestOptions).then(
    handleResponse
  )
}

function forgotPassword(email) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(email),
  }

  return fetch(`${LOCAL_API_URL}/users/forgot-password`, requestOptions).then(
    handleResponse
  )
}

function resetPassword({ token, password, confirmPassword }) {
  return fetch(`${LOCAL_API_URL}/users/reset-password`, {
    token,
    password,
    confirmPassword,
  })
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout()
        window.location.reload()
      }

      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }

    return data
  })
}
