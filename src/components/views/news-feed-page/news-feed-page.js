import { mapGetters, mapActions } from 'vuex'

const createPost = () => import('@/components/base/create-post')
const postsContainer = () => import('@/components/base/posts-container')
const hivePostsContainer = () => import('@/components/base/posts-hive-container')
const bugPostsContainer = () => import('@/components/base/posts-bug-container')

export default {
  data () {
    return {
      tab: ''
    }
  },
  watch: {
    mq: function () {
      if (this.mq === 'mobile' || this.mq === 'tablet') {
        this.tab = 'logs'
      } else {
        this.tab = 'hive'
      }
    }
  },
  computed: {
    ...mapGetters([
    ]),
    mq: function () {
      return this.$mq
    }
  },
  methods: {
    ...mapActions([
      'setSelfPosts',
      'setHivePosts',
      'setBugPosts',
      'turnOffSideBar'
    ]),
    logTabs () {
      this.tab = 'logs'
    },
    hiveTabs () {
      this.tab = 'hive'
    },
    bugsTabs () {
      this.tab = 'bugs'
    },
    webTabs () {
      this.tab = 'web'
    }
  },
  mounted () {
    if (this.mq === 'mobile' || this.mq === 'tablet') {
      this.tab = 'logs'
    } else {
      this.tab = 'hive'
    }
    this.turnOffSideBar()
  },
  created () {
    this.setSelfPosts()
    this.setHivePosts()
    this.setBugPosts()
  },
  components: {
    createPost,
    postsContainer,
    hivePostsContainer,
    bugPostsContainer
  }
}
