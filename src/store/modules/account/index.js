import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

export default {
  state: {
    accountDetails: {},
    myHive: [],
    myFilteredHive: [],
    bugs: [],
    filteredBugs: [],
    singleUserDetails: {},
    searchResults: [],
    myBugLife: {},
    pollen: {},
    accountOrigPicture: '',
    temporaryDisplayPicture: ''
  },
  getters,
  mutations,
  actions
}
