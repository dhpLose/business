<template>
  <el-select v-model="val" :clearable="clearable" :disabled="disabled" :readonly="readonly" @change="handleChange" @clear="handleClear">
    <el-option v-for="item in option" :key="item[props.value]" :label="item[props.label]" :value="item[props.value]"></el-option>
  </el-select>
</template>
<script>
export default {
  name: 'selectComponents',
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
  data () {
    return {
      val: '',
      option: [],
      props: {
        label: 'label',
        value: 'value'
      }
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
  mounted () {
    this.initOption()
    this.initProps()
    this.config.callbackRequest && this.config.callbackRequest().then(data => {
      this.option = data
    })
  },
  methods: {
    // 初始化数据
    initOption () {
      const option = this.config.options
      if (option && Array.isArray(option) && option.length > 0) {
        this.option = option
      }
    },
    initProps () {
      const option = this.config.props
      const keys = Object.keys(this.props)
      if (option && Object.prototype.toString.call(option) === '[object Object]') {
        for (const key in option) {
          if (keys.includes(key)) {
            this.props[key] = option[key]
          }
        }
      }
    },
    handleChange (val) {
      const row = this.option.find(ele => ele.value === val)
      this.$emit('update:value', val)
      this.config.callback && this.config.callback({ value: val, row, item: this.config })
    },
    handleClear () {
      this.config.callbackClear && this.config.callbackClear({ form: this.form, item: this.config })
    }
  }
}
</script>