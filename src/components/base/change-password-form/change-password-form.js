import { changePasswordService } from '@/utils/services/account-service'

const spinner = () => import('vue-simple-spinner')
const SweetModal = () => import('sweet-modal-vue').then(({SweetModal}) => SweetModal)

export default {
  data () {
    return {
      passwords: {
        old_password: '',
        new_password: '',
        new_password_confirmation: ''
      },
      passwordErrors: {
        old_password: [],
        new_password: [],
        new_password_confirmation: []
      },
      isLoading: false
    }
  },
  methods: {
    updatePassword () {
      this.switchLoadingState()
      changePasswordService(this.passwords)
    },
    clearFormData () {
      this.passwords = {
        old_password: '',
        new_password: '',
        new_password_confirmation: ''
      }
    },
    clearFormErrors () {
      this.passwordErrors = {
        old_password: [],
        new_password: [],
        new_password_confirmation: []
      }
    },
    switchLoadingState () {
      this.isLoading = !this.isLoading
    }
  },
  mounted () {
    Event.$on('changePasswordSuccess', (response) => {
      this.switchLoadingState()
      this.clearFormData()
      this.clearFormErrors()
      this.$refs.changePasswordSuccess.open()
    })
    Event.$on('changePasswordFailed', (errors) => {
      console.error(errors)
      this.switchLoadingState()
      this.clearFormErrors()
      for (let key in this.passwordErrors) {
        let errorMsg = errors[key]

        if (errorMsg) {
          this.passwordErrors[key] = errorMsg
        }
      }
    })
  },
  beforeDestroy () {
    Event.$off('changePasswordSuccess')
    Event.$off('changePasswordFailed')
  },
  components: {
    spinner,
    sweetModal: SweetModal
  }
}
