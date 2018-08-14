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
        this.updateBugs(this.filter)
      } else if (this.filter === '') {
        this.removeFilterBugs()
      }
    }
  },
  computed: {
    ...mapGetters([
      'accountDetails',
      'bugsCount',
      'bugs',
      'bugsLetters'
    ])
  },
  methods: {
    ...mapActions([
      'setBugs',
      'updateBugs',
      'removeFilterBugs',
      'getSingleUserPosts',
      'promoteUser',
      'pestUser',
      'turnOffSideBar'
    ]),
    filterBugs () {
      if (this.filter.length >= 1) {
        this.updateBugs(this.filter)
      } else if (this.filter === '') {
        this.removeFilterBugs()
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
    hive () {
      this.promoteUser({ id: this.selectedId, currentRoute: this.$route.name })
      this.selectedId = 0
    },
    pest () {
      this.pestUser({ id: this.selectedId, currentRoute: this.$route.name })
    }
  },
  created () {
    this.setBugs()
  },
  mounted () {
    Event.$on('singleProfileModalClose', () => {
      this.selectedId = 0
    })
    this.turnOffSideBar()
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
