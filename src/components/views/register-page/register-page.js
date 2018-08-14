const registrationForm = () => import('@/components/base/registration-form')

export default {
  computed: {
    mq: function () {
      return this.$mq
    }
  },
  watch:{
    mq: function () {
      if (this.mq === 'mobile' || this.mq === 'tablet') {
        this.$router.push({ name: 'Landing Page' })
      }
    }
  },
  components: {
    registrationForm
  }
}
