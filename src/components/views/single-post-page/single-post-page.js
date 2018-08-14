import { getAccessToken } from '@/utils/authentication'
import { mapGetters, mapActions } from 'vuex'

const post = () => import('@/components/base/post')
const SweetModal = () => import('sweet-modal-vue').then(({SweetModal}) => SweetModal)

export default {
  computed: {
    ...mapGetters([
      'singlePost'
    ]),
    accessToken: function () {
      return getAccessToken()
    }
  },
  methods: {
    ...mapActions([
      'setSinglePost'
    ]),
    setPost () {
      this.setSinglePost(this.$route.params.id)
    }
  },
  created () {
    this.setPost()
  },
  components: {
    post,
    sweetModal: SweetModal
  }
}
