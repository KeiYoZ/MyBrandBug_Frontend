import 'flatpickr/dist/flatpickr.css'
import { registerService } from '@/utils/services/account-service'

const termsAndConditionsModal = () => import('@/components/base/terms-and-conditions-modal')
const flatPickr = () => import('vue-flatpickr-component')
const spinner = () => import('vue-simple-spinner')
const SweetModal = () => import('sweet-modal-vue').then(({SweetModal}) => SweetModal)

export default {
  data () {
    return {
      registrationFormFields: {
        fname: '',
        lname: '',
        birthday: '',
        email: '',
        password: '',
        gender: '',
        has_read_tac: false
      },
      registrationFormErrors: {
        fname: [],
        lname: [],
        birthday: [],
        email: [],
        password: [],
        gender: [],
        has_read_tac: []
      },
      config: {
        altFormat: 'F j, Y',
        altInput: true
      },
      isLoading: false,
      isModalHidden: true
    }
  },
  methods: {
    register () {
      this.switchLoadingState()
      registerService(this.registrationFormFields)
    },
    openModal () {
      Event.$emit('termsClicked')
    },
    termsAndConditionsClick () {
      this.registrationFormFields.has_read_tac = !this.registrationFormFields.has_read_tac
    },
    switchLoadingState () {
      this.isLoading = !this.isLoading
    },
    resetFormErrors () {
      this.registrationFormErrors = {
        fname: [],
        lname: [],
        birthday: [],
        email: [],
        password: [],
        gender: [],
        has_read_tac: []
      }
    },
    resetFormFields () {
      this.registrationFormFields = {
        fname: '',
        lname: '',
        birthday: '',
        email: '',
        password: '',
        gender: '',
        has_read_tac: false
      }
    }
  },
  mounted () {
    Event.$on('registerSuccess', (response) => {
      this.switchLoadingState()
      this.resetFormFields()
      this.resetFormErrors()
      this.$refs.registrationSuccess.open()
      setTimeout(() => {
        if (this.$mq === 'tablet' || this.$mq === 'mobile') {
          this.$router.push({ name: 'Landing Page' })
        } else {
          this.$router.push({ name: 'Login Page' })
        }
      }, 1500)
    })
    Event.$on('registerFailed', (errors) => {
      this.switchLoadingState()
      this.resetFormErrors()
      for (let key in this.registrationFormErrors) {
        let errorMsg = errors[key]

        if (errorMsg) {
          this.registrationFormErrors[key] = errorMsg
        }
      }
    })
  },
  beforeDestroy () {
    Event.$off('registerSuccess')
    Event.$off('registerFailed')
  },
  components: {
    flatPickr,
    spinner,
    termsAndConditionsModal,
    sweetModal: SweetModal
  }
}
