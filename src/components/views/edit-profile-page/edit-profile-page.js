import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'

const editProfileForm = () => import('@/components/base/edit-profile-form')
const changePasswordForm = () => import('@/components/base/change-password-form')

export default {
  data () {
    return {
      fileName: '',
      hasFileUploaded : false,
    }
  },
  computed: {
    ...mapGetters([
      'accountDetails',
      'accountFullName',
      'getTemporaryPicture'
    ]),
  },
  methods: {
    ...mapMutations([
      'imgPreview', 'removeImgPreview'
    ]),
    processFile (event) {
      const image = event.target.files[0]
      this.fileName = image.name
      this.hasFileUploaded = true
      this.imgPreview(image)
      Event.$emit('profile-image-change', image)
    },
    resetInputFile() {
      this.hasFileUploaded = false
      this.fileName = ''
    }
  },
  mounted () {
    Event.$on('updateAccountSuccess', (response) => {
      this.fileName = ''
    })
  },
  beforeDestroy () {
    Event.$off('updateAccountSuccess')
  },
  components: {
    editProfileForm,
    changePasswordForm
  }
}
