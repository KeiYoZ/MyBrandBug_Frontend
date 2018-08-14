export function setAccessToken (accessToken) {
  return localStorage.setItem('accessToken', accessToken)
}

export function getAccessToken () {
  return localStorage.getItem('accessToken')
}

export function removeAccessToken () {
  return localStorage.removeItem('accessToken')
}
