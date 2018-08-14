import 'flatpickr/dist/flatpickr.css'
import { mapGetters, mapActions } from 'vuex'
import { updateAccountService } from '@/utils/services/account-service'
import moment from 'moment'

const flatPickr = () => import('vue-flatpickr-component')
const spinner = () => import('vue-simple-spinner')
const SweetModal = () => import('sweet-modal-vue').then(({SweetModal}) => SweetModal)

export default {
  data () {
    return {
      formData: {
        fname: '',
        lname: '',
        birthday: '',
        affiliation: '',
        occupation: '',
        country: '',
        state: '',
        summary: '',
        image_path: ''
      },
      account: {},
      formErrors: {
        fname: [],
        lname: [],
        birthday: [],
        affiliation: [],
        occupation: [],
        country: [],
        state: [],
        summary: [],
        image_path: []
      },
      isLoading: false,
      config: {
        altFormat: 'F j, Y',
        altInput: true
      }
    }
  },
  computed: {
    ...mapGetters([
      'accountDetails'
    ])
  },
  methods: {
    ...mapActions([
      'setAccountDetails'
    ]),
    updateProfile () {
      this.switchLoadingState()
      let postData = new FormData()
      postData.append('fname', this.formData.fname === '' ? this.accountDetails.fname : this.formData.fname)
      postData.append('lname', this.formData.lname === '' ? this.accountDetails.lname : this.formData.lname)
      postData.append('birthday', this.formData.birthday === '' ? this.accountDetails.birthday : this.formData.birthday)
      postData.append('affiliation', this.formData.affiliation)
      postData.append('occupation', this.formData.occupation)
      postData.append('country', this.formData.country)
      postData.append('state', this.formData.state)
      postData.append('summary', this.formData.summary)
      postData.append('image_path', this.formData.image_path)
      updateAccountService(postData)
    },
    switchLoadingState () {
      this.isLoading = !this.isLoading
    },
    clearFormData () {
      this.formData = {
        fname: '',
        lname: '',
        birthday: '',
        affiliation: '',
        occupation: '',
        country: '',
        state: '',
        summary: '',
        image_path: ''
      }
    },
    clearFormErrors () {
      this.formErrors = {
        fname: [],
        lname: [],
        birthday: [],
        affiliation: [],
        occupation: [],
        country: [],
        state: [],
        summary: [],
        image_path: []
      }
    },
    copyDetails () {
      this.account = this.accountDetails
    },
    moment (date) {
      return moment(date).format('MMMM D, YYYY')
    }
  },
  mounted () {
    this.copyDetails()
    Event.$on('updateAccountSuccess', (response) => {
      this.switchLoadingState()
      this.clearFormData()
      this.clearFormErrors()
      this.$refs.updateProfileSuccess.open()
      this.setAccountDetails()
    })
    Event.$on('updateAccountFailed', (errors) => {
      this.switchLoadingState()
      this.clearFormErrors()
      console.log('errors :', errors)
      for (let key in this.formErrors) {
        let errorMsg = errors[key]

        if (errorMsg) {
          this.formErrors[key] = errorMsg
        }
      }
    })
    Event.$on('profile-image-change', (image) => {
      this.formData.image_path = image
    })
  },
  beforeDestroy () {
    Event.$off('updateAccountSuccess')
    Event.$off('updateAccountFailed')
    Event.$off('profile-image-change')
  },
  components: {
    flatPickr,
    spinner,
    sweetModal: SweetModal
  }
}
