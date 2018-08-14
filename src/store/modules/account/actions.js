import * as api from '@/utils/api'
import axios from 'axios'
import { getAccessToken } from '@/utils/authentication'
import _ from 'lodash'
import moment from 'moment'

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

function groupResults (results) {
  return new Promise((resolve, reject) => {
    if (results) {
      resolve(_.groupBy(results, (result) => {
        return moment(result.attributes.created_at.date).format('MMMM D, YYYY')
      }))
    } else {
      reject(Error('No activities found'))
    }
  })
}

function filterResults (results) {
  return new Promise((resolve, reject) => {
    if (results) {
      for (const activity in results) {
        const value = _.uniqBy(results[activity], (data) => {
          return data.attributes.activity
        })
        results[activity] = value
      }
      resolve(results)
    } else {
      reject(Error('No activities were found'))
    }
  })
}

export const setAccountDetails = ({commit}) => {
  axios.get(api.userDetails(), getHeader())
    .then(response => {
      commit('setAccountDetails', response.data.data)
    })
    .catch(error => {
      console.error(error)
    })
}

export const setMyHive = ({commit}) => {
  axios.get(api.myHive(), getHeader())
    .then(response => {
      commit('setMyHive', response.data.data)
    })
    .catch(error => {
      console.error(error)
    })
}

export const updateMyHive = ({commit}, payload) => {
  commit('updateMyHive', payload)
}

export const removeFilterMyHive = ({commit}) => {
  commit('removeFilterMyHive')
}

export const setBugs = ({commit}) => {
  axios.get(api.bugs(), getHeader())
    .then(response => {
      commit('setBugs', response.data.data)
    })
    .catch(error => {
      console.error(error)
    })
}

export const updateBugs = ({commit}, payload) => {
  commit('updateBugs', payload)
}

export const removeFilterBugs = ({commit}) => {
  commit('removeFilterBugs')
}

export const getSingleUserDetails = ({commit}, payload) => {
  // unused
  commit('getSingleUserDetails', payload)
}

export const promoteUser = ({commit, dispatch}, payload) => {
  axios.get(api.promote(payload.id), getHeader())
    .then(response => {
      dispatch('setBugs')
    })
    .catch(error => {
      console.error(error)
    })
}

export const demoteUser = ({commit, dispatch}, payload) => {
  // this demotes a user from My Hive to Bugs
  axios.get(api.demote(payload.id), getHeader())
    .then(response => {
      dispatch('setMyHive')
    })
    .catch(error => {
      console.error(error)
    })
}

export const pestUser = ({commit, dispatch}, payload) => {
  axios.get(api.pest(payload.id), getHeader())
    .then(response => {
      if (payload.currentRoute === 'My Hive Page') {
        dispatch('setMyHive')
      } else {
        dispatch('setBugs')
      }
    })
    .catch(error => {
      console.error(error)
    })
}

export const searchUsers = ({commit, dispatch}, payload) => {
  axios.get(api.search(payload), getHeader())
    .then(response => {
      dispatch('switchLoading')
      commit('searchUsers', response.data.data)
    })
    .then(response => {
    })
    .catch(error => {
      console.error(error)
    })
}

export const setMyBugLife = ({commit}) => {
  axios.get(api.logs(), getHeader())
    .then(response => {
      return groupResults(response.data.data)
    })
    .then(response => {
      return filterResults(response)
    })
    .then(response => {
      commit('setMyBugLife', response)
    })
    .catch(error => {
      console.error(error)
    })
}

export const setPollen = ({commit}) => {
  axios.get(api.pollen(), getHeader())
    .then(response => {
      commit('setPollen', response.data.pollen)
    })
    .catch(error => {
      console.error(error)
    })
}
