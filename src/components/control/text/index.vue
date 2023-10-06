<template>
  <div>{{ data[prop] }}</div>
</template>
<script>
export default {
  name: 'ComText',
  props: {
    prop: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default: () => ({})
    },
    config: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    prop: {
      handler (val) {
        console.log(val, '-watch-')
      },
      imemdiate: true
    },
  },
  data () {
    return {
    }
  }
}
</script>