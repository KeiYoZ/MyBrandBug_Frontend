import ribbon from '@/components/base/ribbon'

export default {
  data () {
    return {
      shown: true
    }
  },
  methods: {
    toggleNav () {
      this.shown = !this.shown
    }
  },
  components: {
    ribbon
  }
}
