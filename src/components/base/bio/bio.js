import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'accountDetails',
      'accountFullName'
    ])
  }
}
