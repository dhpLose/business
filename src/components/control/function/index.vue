<template>
  <div v-html="config.callback && config.callback(data)"></div>
  <!-- <div>{{ data[prop] }}</div> -->
  <!-- <div>{{data}}</div> -->
</template>
<script>
export default {
  name: 'ComFunction',
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