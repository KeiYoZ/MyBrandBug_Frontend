import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'searchResults'
    ]),
    query: function () {
      return this.$route.query.params
    }
  },
  methods: {
    ...mapActions([
      'searchUsers',
      'promoteUser',
      'demoteUser',
      'pestUser',
      'switchLoading'
    ]),
    hive (id) {
      this.promoteUser({ id, currentRoute: this.$route.name })
      setTimeout(() => {
        Event.$emit('search')
      }, 1000)
    },
    bugs (id) {
      this.demoteUser({ id, currentRoute: this.$route.name })
      Event.$emit('search')
      setTimeout(() => {
        Event.$emit('search')
      }, 1000)
    },
    pest (id) {
      this.pestUser({ id, currentRoute: this.$route.name })
      Event.$emit('search')
      setTimeout(() => {
        Event.$emit('search')
      }, 1000)
    },
    search () {
      this.searchUsers(this.query)
      this.switchLoading()
    }
  },
  created () {
    this.searchUsers(this.query)
  },
  mounted () {
    this.switchLoading()
    Event.$on('search', () => {
      this.search()
    })
  },
  beforeDestroy () {
    Event.$off('search')
  }
}
