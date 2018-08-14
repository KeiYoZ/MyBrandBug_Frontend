import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

export default {
  state: {
    selfPosts: [],
    hivePosts: [],
    bugPosts: [],
    singleUserPosts: [],
    singlePost: {}
  },
  getters,
  mutations,
  actions
}
