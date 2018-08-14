import { mapGetters, mapActions } from 'vuex'

const post = () => import('@/components/base/post')

export default {
  computed: {
    ...mapGetters([
      'hivePosts'
    ])
  },
  components: {
    post
  },
  methods: {
    ...mapActions([
      'setHivePosts'
    ])
  },
  mounted() {
    Event.$on('updatePostSuccess', () => {
      this.setHivePosts()
    })
  },
  beforeDestroy() {
    Event.$off('updatePostSuccess')
  }
}
