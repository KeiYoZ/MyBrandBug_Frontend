import _ from 'lodash'

function setPlaceholderImage (state, payload) {
  state.accountDetails = payload
  return new Promise((resolve, reject) => {
    if (!payload.image_path) {
      resolve('https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png')
    }
  })
}

export const imgPreview = (state, image) => {
  let reader = new FileReader()
  reader.onload = (e) => {
    state.temporaryDisplayPicture = e.target.result
  }
  reader.readAsDataURL(image)
}

export const removeImgPreview = (state) => {
  state.temporaryDisplayPicture = state.accountOrigPicture
}

export const setAccountDetails = (state, payload) => {
  if (payload.image_path) {
    state.accountDetails = payload
    state.accountOrigPicture = state.accountDetails.image_path
    state.temporaryDisplayPicture = state.accountDetails.image_path
  } else {
    setPlaceholderImage(state, payload)
      .then(response => {
        state.accountDetails.image_path = response
      })
  }
}

export const setMyHive = (state, payload) => {
  state.myHive = payload
}

export const updateMyHive = (state, payload) => {
  state.myFilteredHive = _.filter(state.myHive, (o) => {
    return _.includes(o.attributes.full_name.toLowerCase(), payload)
  })
}

export const removeFilterMyHive = (state) => {
  state.myFilteredHive = []
}

export const setBugs = (state, payload) => {
  state.bugs = payload
}

export const updateBugs = (state, payload) => {
  state.filteredBugs = _.filter(state.bugs, (o) => {
    return _.includes(o.attributes.full_name.toLowerCase(), payload)
  })
}

export const removeFilterBugs = (state) => {
  state.filteredBugs = []
}

export const searchUsers = (state, payload) => {
  state.searchResults = payload
}

export const setMyBugLife = (state, payload) => {
  state.myBugLife = payload
}

export const setPollen = (state, payload) => {
  state.pollen = payload
}
