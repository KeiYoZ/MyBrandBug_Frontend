import { mapGetters, mapActions } from 'vuex'
import { createPostService } from '@/utils/services/post-services'

const spinner = () => import('vue-simple-spinner')
const SweetModal = () => import('sweet-modal-vue').then(({SweetModal}) => SweetModal)

export default {
  data () {
    return {
      postData: {
        caption: '',
        location: '',
        media: '',
        hashtag: ''
      },
      postErrors: {
        caption: [],
        location: [],
        media: [],
        hashtag: []
      },
      fileName: '',
      isLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'accountDetails',
      'accountFullName'
    ])
  },
  methods: {
    ...mapActions([
      'setSelfPosts'
    ]),
    createPost () {
      this.switchLoadingState()
      if (this.postData.hashtag.indexOf('#mbb_') > -1) {
        this.postData.hashtag = this.postData.hashtag.split('#mbb_').pop()
      }
      const formData = new FormData()
      formData.append('caption', this.postData.caption)
      formData.append('location', this.postData.location)
      formData.append('media', this.postData.media)
      formData.append('hashtag', this.postData.hashtag)
      createPostService(formData)
    },
    clearPostData () {
      this.postData = {
        caption: '',
        location: '',
        media: '',
        hashtag: ''
      }
      this.fileName = ''
    },
    processFile (event) {
      this.fileName = event.target.files[0].name
      this.postData.media = event.target.files[0]
    },
    switchLoadingState () {
      this.isLoading = !this.isLoading
    },
    resetFormErrors () {
      this.postErrors = {
        caption: [],
        location: [],
        media: [],
        hashtag: []
      }
    }
  },
  mounted () {
    Event.$on('createPostSuccess', (response) => {
      this.switchLoadingState()
      this.resetFormErrors()
      this.clearPostData()
      this.setSelfPosts()
    })
    Event.$on('createPostFailed', (errors) => {
      this.switchLoadingState()
      this.resetFormErrors()
      for (let key in this.postErrors) {
        let errorMsg = errors[key]

        if (errorMsg) {
          this.postErrors[key] = errorMsg
        }
      }
    })
  },
  beforeDestroy () {
    Event.$off('createPostSuccess')
    Event.$off('createPostFailed')
  },
  components: {
    spinner,
    sweetModal: SweetModal
  }
}
