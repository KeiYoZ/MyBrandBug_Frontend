import { mapGetters, mapActions } from 'vuex'
import 'vue-awesome/icons'

const icon = () => import('vue-awesome/components/Icon')
const profileBanner = () => import('@/components/base/profile-banner')
const userPostsContainer = () => import('@/components/base/posts-user-container')
const singleProfileModal = () => import('@/components/base/single-profile-modal')

export default {
  data () {
    return {
      filter: '',
      selectedId: 0,
      selectedUser: {}
    }
  },
  watch: {
    filter: function () {
      if (this.filter.length >= 1) {
        this.updateMyHive(this.filter)
      } else if (this.filter === '') {
        this.removeFilterMyHive()
      }
    }
  },
  computed: {
    ...mapGetters([
      'accountDetails',
      'myHiveCount',
      'myHive',
      'myHiveLetters'
    ])
  },
  methods: {
    ...mapActions([
      'setMyHive',
      'updateMyHive',
      'removeFilterMyHive',
      'getSingleUserPosts',
      'demoteUser',
      'pestUser',
      'turnOffSideBar'
    ]),
    filterHive () {
      if (this.filter.length >= 1) {
        this.updateMyHive(this.filter)
      } else if (this.filter === '') {
        this.removeFilterMyHive()
      }
    },
    nameSelected (details) {
      if (this.selectedId === details.id) return
      this.selectedId = details.id
      this.getSingleUserPosts(details.id)
      this.selectedUser = details
      if (this.$mq === 'mobile' || this.$mq === 'tablet') {
        Event.$emit('singleProfileModalOpen')
      }
    },
    bugs () {
      this.demoteUser({ id: this.selectedId, currentRoute: this.$route.name })
      this.selectedId = 0
    },
    pest () {
      this.pestUser({ id: this.selectedId, currentRoute: this.$route.name })
    }
  },
  created () {
    this.setMyHive()
  },
  mounted () {
    this.turnOffSideBar()
    Event.$on('singleProfileModalClose', () => {
      this.selectedId = 0
    })
  },
  beforeDestroy () {
    Event.$off('singleProfileModalClose')
  },
  components: {
    icon,
    profileBanner,
    userPostsContainer,
    singleProfileModal
  }
}
