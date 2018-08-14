import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions([
      'turnOffSideBar'
    ])
  },
  mounted () {
    this.turnOffSideBar()
  }
}
