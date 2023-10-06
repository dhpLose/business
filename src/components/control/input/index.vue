<template>
  <div>
    <el-input v-model="val" :clearable="clearable" :disabled="disabled" :readonly="readonly" @input="inputEnter" @clear="handleClear"></el-input>
  </div>
</template>
<script>
export default {
  name: 'inputComponents',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    form: {
      type: Object,
      default: () => ({})
    },
    config: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    value: {
      handler (val) {
        if (val) {
          this.val = val
        }
      },
      immediate: true
    }
  },
  data () {
    return {
      val: ''
    }
  },
  computed: {
    readonly () {
      return this.config.readonly || false
    },
    disabled () {
      return this.config.disabled || false
    },
    clearable () {
      return this.config.clearable || true
    }
  },
  methods: {
    inputEnter (val) {
      this.$emit('update:value', val)
      this.config.callback && this.config.callback({ value: val, item: this.config })
    },
    handleClear () {
      this.config.callbackClear && this.config.callbackClear({ form: this.form, item: this.config })
    }
  }
}
</script>