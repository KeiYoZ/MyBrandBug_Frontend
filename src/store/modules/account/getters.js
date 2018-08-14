import _ from 'lodash'

export const getTemporaryPicture = state => {
  return state.temporaryDisplayPicture
}

export const accountDetails = state => {
  return state.accountDetails
}

export const accountFullName = state => {
  return `${state.accountDetails.fname} ${state.accountDetails.lname}`
}

export const myHive = state => {
  return state.myHive
}

export const myFilteredHive = state => {
  return state.myFilteredHive
}

export const myHiveLetters = state => {
  let myHiveLetters = []
  let myHive = []

  if (state.myFilteredHive !== undefined && state.myFilteredHive.length !== 0) {
    myHive = state.myFilteredHive
  } else {
    myHive = state.myHive
  }

  _.forEach(myHive, (o) => {
    myHiveLetters.push(o.attributes.full_name.charAt(0).toUpperCase())
  })

  myHiveLetters = _.uniq(myHiveLetters)

  return myHiveLetters.sort()
}

export const myHiveCount = state => {
  return state.myHive.length
}

export const bugs = state => {
  return state.bugs
}

export const filteredBugs = state => {
  return state.filteredBugs
}

export const bugsLetters = state => {
  let bugsLetters = []
  let bugs = []

  if (state.filteredBugs !== undefined && state.filteredBugs.length !== 0) {
    bugs = state.filteredBugs
  } else {
    bugs = state.bugs
  }

  _.forEach(bugs, (o) => {
    bugsLetters.push(o.attributes.full_name.charAt(0).toUpperCase())
  })

  bugsLetters = _.uniq(bugsLetters)

  return bugsLetters.sort()
}

export const bugsCount = state => {
  return state.bugs.length
}

export const singleUserDetails = state => {
  return state.singleUserDetails
}

export const searchResults = state => {
  return state.searchResults
}

export const myBugLife = state => {
  return state.myBugLife
}

export const pollen = state => {
  return state.pollen
}

export const pollenTotal = state => {
  return state.pollen.bites + state.pollen.stings + state.pollen.buzzes
}
