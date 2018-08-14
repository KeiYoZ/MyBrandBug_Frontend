import { mapGetters, mapActions } from 'vuex'

const post = () => import('@/components/base/post')
const spinner = () => import('vue-simple-spinner')
export default {
  data() {
    return {
      ownTimeline: true,
      isLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'selfPosts'
    ])
  },
  methods: {
    toggleLoadingState(value) {
      this.isLoading = value
    },
    ...mapActions([
      'setSelfPosts'
    ])
  },
  components: {
    post, spinner
  },
  mounted() {
    Event.$on('postModified', value => {
      this.toggleLoadingState(value)
    }),
    Event.$on('updatePostSuccess', () => {
      this.setSelfPosts()
    })
  },
  beforeDestroy() {
    Event.$off('postModified')
    Event.$off('updatePostSuccess')
  }
}
