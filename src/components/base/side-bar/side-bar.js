import { mapGetters } from 'vuex'
import 'vue-awesome/icons'

const icon = () => import('vue-awesome/components/Icon')
const bio = () => import('@/components/base/bio')
const SweetModal = () => import('sweet-modal-vue').then(({SweetModal}) => SweetModal)

export default {
  computed: {
    ...mapGetters([
      'accountDetails',
      'accountFullName'
    ])
  },
  methods: {
    displayImage () {
      this.$refs.profileImage.open()
    }
  },
  components: {
    bio,
    icon,
    sweetModal: SweetModal
  }
}
