import { mapActions } from 'vuex'

export default {
  computed: {
    pageName () {
      let disclaimer = ''
      if (this.$route.name === 'Bug Brands Page') {
        disclaimer = 'A List of Partner Brands'
      } else if (this.$route.name === 'Brand Stops Page') {
        disclaimer = 'Places of Interest'
      } else if (this.$route.name === 'Honeys Page') {
        disclaimer = 'List of Rewards'
      } else if (this.$route.name === 'Bug Life Page') {
        disclaimer = 'Logs'
      }
      return disclaimer
    }
  },
  methods: {
    ...mapActions([
      'turnOffSideBar'
    ])
  },
  mounted () {
    this.turnOffSideBar()
  }
}
