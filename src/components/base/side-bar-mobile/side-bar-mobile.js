import { mapGetters, mapActions } from 'vuex'
import 'vue-awesome/icons'
import { logoutService } from '@/utils/services/account-service'
import { removeAccessToken } from '@/utils/authentication'

const icon = () => import('vue-awesome/components/Icon')
const bio = () => import('@/components/base/bio')
const SweetModal = () => import('sweet-modal-vue').then(({SweetModal}) => SweetModal)

export default {
  data () {
    return {
      toggled: false
    }
  },
  computed: {
    ...mapGetters([
      'accountDetails',
      'accountFullName',
      'sideBarToggled'
    ])
  },
  methods: {
    ...mapActions([
      'switchLoading',
      'toggleSideBar'
    ]),
    displayImage () {
      this.$refs.profileImage.open()
    },
    logoutWarning () {
      this.$refs.logoutWarning.open()
    },
    logout () {
      this.$refs.logoutWarning.close()
      this.switchLoading()
      logoutService()
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
    bio,
    icon,
    sweetModal: SweetModal
  }
}
