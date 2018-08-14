import { mapActions } from 'vuex'

const profileBanner = () => import('@/components/base/profile-banner')
const userPostsContainer = () => import('@/components/base/posts-user-container')

export default {
  props: {
    userDetails: Object
  },
  data () {
    return {
      isClosed: true,
      currentRoute: this.$route.name
    }
  },
  methods: {
    ...mapActions([
      'promoteUser',
      'demoteUser',
      'pestUser'
    ]),
    modalClose () {
      this.isClosed = true
      Event.$emit('singleProfileModalClose')
    },
    hive () {
      this.promoteUser({ id: this.userDetails.id, currentRoute: this.$route.name })
      this.modalClose()
    },
    bugs () {
      this.demoteUser({ id: this.userDetails.id, currentRoute: this.$route.name })
      this.modalClose()
    },
    pest () {
      this.pestUser({ id: this.userDetails.id, currentRoute: this.$route.name })
      this.modalClose()
    }
  },
  mounted () {
    Event.$on('singleProfileModalOpen', () => {
      if (this.isClosed) {
        this.isClosed = !this.isClosed
      }
    })
  },
  beforeDestroy () {
    Event.$off('singleProfileModalOpen')
  },
  components: {
    profileBanner,
    userPostsContainer
  }
}
