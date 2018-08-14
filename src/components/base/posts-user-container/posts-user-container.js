import { mapGetters } from 'vuex'

const post = () => import('@/components/base/post')

export default {
  computed: {
    ...mapGetters([
      'singleUserPosts'
    ])
  },
  components: {
    post
  },
}
