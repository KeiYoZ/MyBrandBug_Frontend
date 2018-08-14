import _ from 'lodash'

export const setSelfPosts = (state, payload) => {
  state.selfPosts = payload
}

export const setHivePosts = (state, payload) => {
  state.hivePosts = payload
}

export const setBugPosts = (state, payload) => {
  state.bugPosts = payload
}

export const updatePost = (state, payload) => {
  const hivePostIndex = _.findIndex(state.hivePosts, (o) => {
    return o.id === payload.id
  })
  if (hivePostIndex === 0) {
    state.hivePosts.splice(hivePostIndex, 1, payload)
  }

  const selfPostIndex = _.findIndex(state.selfPosts, (o) => {
    return o.id === payload.id
  })
  if (selfPostIndex === 0) {
    state.selfPosts.splice(selfPostIndex, 1, payload)
  }

  const bugPostIndex = _.findIndex(state.bugPosts, (o) => {
    return o.id === payload.id
  })
  if (bugPostIndex === 0) {
    state.bugPosts.splice(bugPostIndex, 1, payload)
  }

  const userPostIndex = _.findIndex(state.singleUserPosts, (o) => {
    return o.id === payload.id
  })
  if (userPostIndex === 0) {
    state.singleUserPosts.splice(userPostIndex, 1, payload)
  }

  if (typeof payload === 'object') {
    state.singlePost = payload
  }
}

export const getSingleUserPosts = (state, payload) => {
  state.singleUserPosts = payload
}

export const setSinglePost = (state, payload) => {
  state.singlePost = payload
}
