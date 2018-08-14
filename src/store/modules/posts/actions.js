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

function updatePostDetails (id) {
  return new Promise((resolve, reject) => {
    axios.get(api.singlePost(id), getHeader())
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(Error(error))
      })
  })
}

export const setHivePosts = ({commit}) => {
  axios.get(api.hivePosts(), getHeader())
    .then(response => {
      commit('setHivePosts', response.data.data)
    })
    .catch(error => {
      console.error(error)
    })
}

export const bitePost = ({commit}, payload) => {
  axios.post(api.reactPost(), payload, getHeader())
    .then(response => {
      return updatePostDetails(payload.post_id)
    })
    .then(response => {
      commit('updatePost', response)
      Event.$emit('updatePostSuccess')
    })
    .catch(error => {
      console.error(error)
    })
}

export const stingPost = ({commit}, payload) => {
  axios.post(api.reactPost(), payload, getHeader())
    .then(response => {
      return updatePostDetails(payload.post_id)
    })
    .then(response => {
      commit('updatePost', response)
      Event.$emit('updatePostSuccess')
    })
    .catch(error => {
      console.error(error)
    })
}

export const setSelfPosts = ({commit}) => {
  axios.get(api.selfPosts(), getHeader())
    .then(response => {
      commit('setSelfPosts', response.data.data)
      Event.$emit('postModified', false)
    })
    .catch(error => {
      console.error(error)
    })
}

export const setBugPosts = ({commit}) => {
  axios.get(api.bugPosts(), getHeader())
    .then(response => {
      commit('setBugPosts', response.data.data)
    })
    .catch(error => {
      console.error(error)
    })
}

export const getSingleUserPosts = ({commit}, payload) => {
  axios.get(api.singleUserPosts(payload), getHeader())
    .then(response => {
      commit('getSingleUserPosts', response.data.data)
    })
    .catch(error => {
      console.error(error)
    })
}

export const buzzPost = ({commit}, payload) => {
  axios.get(api.buzzPost(payload), getHeader())
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
      console.error(error)
    })
}

export const setSinglePost = ({commit}, payload) => {
  axios.get(api.singlePost(payload), getHeader())
    .then(response => {
      commit('setSinglePost', response.data)
    })
    .catch(error => {
      console.error(error)
    })
}
