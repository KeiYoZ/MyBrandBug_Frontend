import { resetPasswordService } from '@/utils/services/account-service'

const SweetModal = () => import('sweet-modal-vue').then(({SweetModal}) => SweetModal)
const spinner = () => import('vue-simple-spinner')

export default {
  data () {
    return {
      resetPasswordFormFields: {
        new_password: '',
        new_password_confirmation: '',
        token: this.$route.params.token
      },
      resetPasswordFormErrors: {
        new_password: [],
        new_password_confirmation: [],
        token: []
      },
      isLoading: false,
      errorMessage: ''
    }
  },
  methods: {
    resetPassword () {
      this.switchLoadingState()
      resetPasswordService(this.resetPasswordFormFields)
    },
    switchLoadingState () {
      this.isLoading = !this.isLoading
    },
    resetFormErrors () {
      this.resetPasswordFormErrors = {
        new_password: [],
        new_password_confirmation: [],
        token: []
      }
    },
    resetFormFields () {
      this.resetPasswordFormFields = {
        new_password: '',
        new_password_confirmation: '',
        token: this.$route.params.token
      }
    }
  },
  mounted () {
    Event.$on('resetPasswordSuccess', (response) => {
      this.switchLoadingState()
      this.resetFormErrors()
      if (response.success === 'true') {
        this.resetFormFields()
        this.$refs.resetPasswordSuccess.open()
        setTimeout(() => {
          this.$router.push({ name: 'Login Page' })
        }, 1500)
      } else {
        this.errorMessage = response.message
        this.$refs.resetPasswordFailed.open()
      }
    })
    Event.$on('resetPasswordFailed', (error) => {
      this.switchLoadingState()
      this.resetFormErrors()
      let errors = error.errors
      for (let key in this.resetPasswordFormErrors) {
        let errorMsg = errors[key]
        if (errorMsg) {
          this.resetPasswordFormErrors[key] = errorMsg
        }
      }
    })
  },
  beforeDestroy () {
    Event.$off('resetPasswordSuccess')
    Event.$off('resetPasswordFailed')
  },
  components: {
    spinner,
    sweetModal: SweetModal
  }
}
