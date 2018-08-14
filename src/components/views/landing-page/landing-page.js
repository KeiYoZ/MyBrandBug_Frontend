import { loginService } from '@/utils/services/account-service'
import { setAccessToken } from '@/utils/authentication'

const spinner = () => import('vue-simple-spinner')
const SweetModal = () => import('sweet-modal-vue').then(({SweetModal}) => SweetModal)
const registrationForm = () => import('@/components/base/registration-form')

export default {
  data () {
    return {
      loginForm: {
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
      loginService(this.loginForm)
    },
    switchLoadingState () {
      this.isLoading = !this.isLoading
    },
    resetLoginForm () {
      this.loginForm = {
        email: '',
        password: ''
      }
    },
    resetLoginFormErrors () {
      this.loginFormErrors = {
        email: [],
        password: []
      }
    }
  },
  mounted () {
    Event.$on('loginSuccess', (response) => {
      this.switchLoadingState()
      this.resetLoginForm()
      this.resetLoginFormErrors()
      setAccessToken(response.access_token)
      this.$refs.loginSuccess.open()
      setTimeout(() => {
        this.$router.push({ name: 'News Feed Page' })
      }, 1500)
    })
    Event.$on('loginFailed', (error) => {
      this.switchLoadingState()
      this.resetLoginFormErrors()
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
  components: {
    spinner,
    registrationForm,
    sweetModal: SweetModal
  }
}
