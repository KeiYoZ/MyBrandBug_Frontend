import * as api from '@/utils/api'
import axios from 'axios'
import { getAccessToken } from '@/utils/authentication'

function getHeader () {
  if (getAccessToken()) {
    const header = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${getAccessToken()}`
      }
    }
    return header
  }
}

export function registerService (formData) {
  axios.post(api.register(), formData)
    .then(response => {
      Event.$emit('registerSuccess', response.data)
    })
    .catch(error => {
      Event.$emit('registerFailed', error.response.data.errors)
    })
}

export function loginService (formData) {
  axios.post(api.login(), formData)
    .then(response => {
      Event.$emit('loginSuccess', response.data)
    })
    .catch(error => {
      Event.$emit('loginFailed', error.response.data)
    })
}

export function forgotPasswordService (formData) {
  axios.post(api.forgotPassword(), formData)
    .then(response => {
      Event.$emit('forgotPasswordSuccess', response.data)
    })
    .catch(error => {
      Event.$emit('forgotPasswordFailed', error.response.data)
    })
}

export function resetPasswordService (formData) {
  axios.post(api.resetPassword(), formData)
    .then(response => {
      Event.$emit('resetPasswordSuccess', response.data)
    })
    .catch(error => {
      Event.$emit('resetPasswordFailed', error.response.data)
    })
}

export function logoutService () {
  axios.get(api.logout(), getHeader())
    .then(response => {
      Event.$emit('logoutSuccess', response.data)
    })
    .catch(error => {
      console.error(error)
    })
}

export function updateAccountService (formData) {
  axios.post(api.updateUser(), formData, getHeader())
    .then(response => {
      Event.$emit('updateAccountSuccess', response.data.data)
    })
    .catch(error => {
      Event.$emit('updateAccountFailed', error.response.data.errors)
    })
}

export function changePasswordService (formData) {
  axios.post(api.changePassword(), formData, getHeader())
    .then(response => {
      Event.$emit('changePasswordSuccess', response.data.data)
    })
    .catch(error => {
      Event.$emit('changePasswordFailed', error.response.data.errors)
    })
}
