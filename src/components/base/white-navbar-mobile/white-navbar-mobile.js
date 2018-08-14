import { getAccessToken } from '@/utils/authentication'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      searchText: ''
    }
  },
  computed: {
    accessToken: function () {
      return getAccessToken()
    }
  },
  methods: {
    ...mapActions([
      'searchUsers',
      'switchLoading'
    ]),
    search () {
      if (!this.searchText) return
      this.searchUsers(this.searchText)
      this.switchLoading()
      this.$router.push({ name: 'Search Page', query: { params: this.searchText } })
    },
    login () {
      this.$router.push({ name: 'Landing Page' })
    }
  }
}
