import { forgotPasswordService } from '@/utils/services/account-service'

const SweetModal = () => import('sweet-modal-vue').then(({SweetModal}) => SweetModal)
const spinner = () => import('vue-simple-spinner')

export default {
  data () {
    return {
      forgotPasswordFormFields: {
        email: ''
      },
      forgotPasswordFormErrors: {
        email: []
      },
      isLoading: false,
      errorMessage: ''
    }
  },
  methods: {
    forgotPassword () {
      this.switchLoadingState()
      forgotPasswordService(this.forgotPasswordFormFields)
    },
    switchLoadingState () {
      this.isLoading = !this.isLoading
    },
    resetFormErrors () {
      this.forgotPasswordFormErrors = {
        email: []
      }
    },
    resetFormFields () {
      this.forgotPasswordFormFields = {
        email: ''
      }
    }
  },
  mounted () {
    Event.$on('forgotPasswordSuccess', (response) => {
      this.switchLoadingState()
      this.resetFormErrors()
      if (response.success === 'true') {
        this.resetFormFields()
        this.$refs.forgotPasswordSuccess.open()
        setTimeout(() => {
          this.$router.push({ name: 'Login Page' })
        }, 1500)
      } else {
        this.errorMessage = response.message
        this.$refs.forgotPasswordFailed.open()
      }
    })
    Event.$on('forgotPasswordFailed', (error) => {
      this.switchLoadingState()
      this.resetFormErrors()
      let errors = error.errors
      for (let key in this.forgotPasswordFormErrors) {
        let errorMsg = errors[key]
        if (errorMsg) {
          this.forgotPasswordFormErrors[key] = errorMsg
        }
      }
    })
  },
  beforeDestroy () {
    Event.$off('forgotPasswordSuccess')
    Event.$off('forgotPasswordFailed')
  },
  components: {
    spinner,
    sweetModal: SweetModal
  }
}
