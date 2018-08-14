import moment from 'moment'
import numeral from 'numeral'
import { mapActions } from 'vuex'
import 'vue-awesome/icons'
import { updatePostService, deletePostService } from '@/utils/services/post-services'

const icon = () => import('vue-awesome/components/Icon')
const SweetModal = () => import('sweet-modal-vue').then(({SweetModal}) => SweetModal)

export default {
  props: {
    postDetails: Object,
    ownTimeline: Boolean,
  },
  data () {
    return {
      shareToggled: false,
      editedPost: {
        caption: '',
        location: '',
        media: '',
        hashtag: ''
      },
      postData: new FormData(),
      imagePreview: '',
      editedFileName: '',
      edit: false,
    }
  },
  methods: {
    ...mapActions([
      'bitePost',
      'stingPost',
      'buzzPost',
      'setSelfPosts'
    ]),
    moment (data) {
      //return moment(data).format('MMMM d, YYYY h:mm A')
      return moment(data, "YYYY-MM-DD h:mm:ss").format('MMMM DD, YYYY h:mm A')
    },
    moment2 (data) {
      //return moment(data).format('MMMM d | h:mm A')
      return moment(data, "YYYY-MM-DD h:mm:ss").format('MMMM DD | h:mm A')
    },
    numeral (number) {
      return numeral(number).format(0, 0)
    },
    open (id) {
      this.buzzPost(id)
    },
    toggleShare () {
      this.shareToggled = !this.shareToggled
    },
    editPost(post){
      this.editedPost = {
        caption: post.attributes.caption,
        location: post.attributes.location,
        media: post.attributes.media,
        hashtag: post.relationships.hashtags.data[0].attributes.hashtag
      }
      this.imagePreview = post.attributes.media
      this.edit = true
      this.$refs.editPostModal.open()
    },
    resetEditedPostObject(){
      this.editedPost = {
        caption: '',
        location: '',
        media: '',
        hashtag: ''
      }
      this.postData = new FormData()
      this.edit = false
      this.editedFileName = ''
      this.imagePreview = ''
    },
    editUploadedFile(event){
      this.editedFileName = event.target.files[0].name
      this.editUploadImagePreview(event)
      this.editedPost.media = event.target.files[0]
      this.postData.append('media', event.target.files[0])
    },
    editUploadImagePreview(event){
      let reader = new FileReader()
      reader.onload = (e) => {
        this.imagePreview = e.target.result
      }
      reader.readAsDataURL(event.target.files[0])
    },
    updatePostAction(id) {
      Event.$emit('postModified', true)
      this.postData.append('caption', this.editedPost.caption)
      this.postData.append('location', this.editedPost.location)
      this.postData.append('hashtag', this.editedPost.hashtag)
      updatePostService(this.postData, id)
      this.closeUpdateModal()
    },
    closeUpdateModal(){
      this.$refs.editPostModal.close()
    },
    showDeleteModal(){
      this.$refs.deletePostModal.open()
    },
    closeDeleteModal(){
      this.$refs.deletePostModal.close()
    },
    deletePost(id){
      deletePostService(id)
      this.closeDeleteModal()
      this.setSelfPosts()
    },
  },
  components: {
    icon,
    sweetModal: SweetModal
  }
}
