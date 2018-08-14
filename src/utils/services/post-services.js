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

export function createPostService (formData) {
  axios.post(api.createPost(), formData, getHeader())
    .then(response => {
      Event.$emit('createPostSuccess', response)
    })
    .catch(error => {
      Event.$emit('createPostFailed', error)
    })
}

export const updatePostService = (formData, id) => {
  axios.post(api.updatePost(id), formData, getHeader())
    .then(response => {
      Event.$emit('updatePostSuccess')
    })
    .catch(err => console.log(err))
}

export const deletePostService = postID => {
  axios.get(api.deletePost(postID), getHeader())
    .then(response => console.log(response))
    .catch(err => console.log(err))
}
