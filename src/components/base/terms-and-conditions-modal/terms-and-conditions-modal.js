export default {
  data () {
    return {
      isClosed: true
    }
  },
  methods: {
    modalClose () {
      this.isClosed = true
    }
  },
  mounted () {
    Event.$on('termsClicked', () => {
      console.log('called')
      if (this.isClosed) {
        this.isClosed = !this.isClosed
      }
    })
  },
  beforeDestroy () {
    Event.$off('termsClicked')
  }
}
