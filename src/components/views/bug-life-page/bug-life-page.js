import moment from 'moment'
import numeral from 'numeral'
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'accountDetails',
      'myBugLife',
      'pollen',
      'pollenTotal'
    ])
  },
  methods: {
    ...mapActions([
      'setMyBugLife',
      'setPollen',
      'turnOffSideBar'
    ]),
    dateText (date) {
      const today = moment()
      if (moment(date, 'MMMM D, YYYY').diff(today, 'days') > -1) {
        return `Today, ${moment(date, 'MMMM D, YYYY').format('MMMM D, YYYY')}`
      } else if (moment(date, 'MMMM D, YYYY').diff(today, 'days') > -2) {
        return `Yesterday, ${moment(date, 'MMMM D, YYYY').format('MMMM D, YYYY')}`
      } else {
        return `${moment(date, 'MMMM D, YYYY').format('MMMM D, YYYY')}`
      }
    },
    shortDate (date) {
      return moment(date, 'MMMM D, YYYY').format('MMMM D')
    },
    numeral (num) {
      return numeral(num).format('0,0')
    }
  },
  mounted () {
    this.turnOffSideBar()
  },
  created () {
    this.setMyBugLife()
    this.setPollen()
  }
}
