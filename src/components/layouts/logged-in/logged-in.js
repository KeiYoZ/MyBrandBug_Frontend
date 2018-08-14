import { mapGetters, mapActions } from 'vuex'
import { getAccessToken } from '@/utils/authentication'

const whiteNavbar = () => import('@/components/base/white-navbar')
const sideNav = () => import('@/components/base/side-bar')
const loadingScreen = () => import('@/components/base/loading-screen')
const whiteNavbarMobile = () => import('@/components/base/white-navbar-mobile')
const sideNavMobile = () => import('@/components/base/side-bar-mobile')

export default {
  computed: {
    ...mapGetters({
      isLoading: 'loading',
      sideBarToggled: 'sideBarToggled'
    }),
    accessToken: function () {
      return getAccessToken()
    }
  },
  methods: {
    ...mapActions([
      'setAccountDetails',
      'turnOffLoading'
    ])
  },
  created () {
    if (getAccessToken()) {
      this.setAccountDetails()
    } else {
      this.turnOffLoading()
    }
  },
  components: {
    whiteNavbar,
    sideNav,
    loadingScreen,
    whiteNavbarMobile,
    sideNavMobile
  }
}
