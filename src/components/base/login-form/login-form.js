import { loginService } from '@/utils/services/account-service'
import { setAccessToken } from '@/utils/authentication'

const spinner = () => import('vue-simple-spinner')
const SweetModal = () => import('sweet-modal-vue').then(({SweetModal}) => SweetModal)

export default {
  data () {
    return {
      loginFormFields: {
        email: '',
        password: ''
      },
      loginFormErrors: {
        email: [],
        password: []
      },
      isLoading: false,
      errorMessage: ''
    }
  },
  methods: {
    login () {
      this.switchLoadingState()
      loginService(this.loginFormFields)
    },
    switchLoadingState () {
      this.isLoading = !this.isLoading
    },
    resetFormFields () {
      this.loginFormFields = {
        email: '',
        password: ''
      }
    },
    resetFormErrors () {
      this.loginFormErrors = {
        email: [],
        password: []
      }
    }
  },
  mounted () {
    Event.$on('loginSuccess', (response) => {
      this.switchLoadingState()
      this.resetFormFields()
      this.resetFormErrors()
      setAccessToken(response.access_token)
      this.$refs.loginSuccess.open()
      setTimeout(() => {
        this.$router.push({ name: 'News Feed Page' })
      }, 1500)
    })
    Event.$on('loginFailed', (error) => {
      this.switchLoadingState()
      this.resetFormErrors()
      if (error.errors) {
        let errors = error.errors

        for (let key in this.loginFormErrors) {
          let errorMsg = errors[key]
          if (errorMsg) {
            this.loginFormErrors[key] = errorMsg
          }
        }
      } else {
        this.errorMessage = error.error.detail
        this.$refs.loginFailed.open()
      }
    })
  },
  beforeDestroy () {
    Event.$off('loginSuccess')
    Event.$off('loginFailed')
  },
  components: {
    spinner,
    sweetModal: SweetModal
  }
}
