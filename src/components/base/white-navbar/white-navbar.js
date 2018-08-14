import { removeAccessToken, getAccessToken } from '@/utils/authentication'
import { logoutService } from '@/utils/services/account-service'
import { mapActions } from 'vuex'

const SweetModal = () => import('sweet-modal-vue').then(({SweetModal}) => SweetModal)

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
    logoutWarning () {
      this.$refs.logoutWarning.open()
    },
    logout () {
      this.$refs.logoutWarning.close()
      this.switchLoading()
      logoutService()
    },
    search () {
      if (!this.searchText) return
      this.searchUsers(this.searchText)
      this.switchLoading()
      this.$router.push({ name: 'Search Page', query: { params: this.searchText } })
    },
    login (mq) {
      if (mq === 'mobile' || mq === 'tablet') {
        this.$router.push({ name: 'Landing Page' })
      } else {
        this.$router.push({ name: 'Login Page' })
      }
    }
  },
  mounted () {
    Event.$on('logoutSuccess', (response) => {
      this.switchLoading()
      removeAccessToken()
      this.$refs.logoutSuccess.open()
      setTimeout(() => {
        if (this.$mq === 'mobile' || this.$mq === 'tablet') {
          this.$router.push({ name: 'Landing Page' })
        } else {
          this.$router.push({ name: 'Login Page' })
        }
      }, 2000)
    })
    Event.$on('logoutFailed', (error) => {
      console.error(error)
    })
  },
  beforeDestroy () {
    Event.$off('logoutSuccess')
    Event.$off('logoutFailed')
  },
  components: {
    sweetModal: SweetModal
  }
}
