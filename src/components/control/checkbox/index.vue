<template>
  <el-checkbox-group v-model="form[config.prop]" @change="handleChange">
    <el-checkbox v-for="item in option" :key="item[props.value]" :label="item[props.value]">{{ item[props.label]}}</el-checkbox>
  </el-checkbox-group>
</template>
<script>
export default {
  name: 'checkboxComponents',
  props: {
    value: {
      type: [String, Number, Array, Date, Boolean],
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
      const row = this.option.filter(ele => val.includes(ele.value))
      this.config.callback && this.config.callback({ value: val, row, item: this.config })
    }
  }
}
</script>