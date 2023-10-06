<template>
  <el-date-picker v-model="form[config.prop]" :type="model" :clearable="clearable" :disabled="disabled" :readonly="readonly" :format="value_format" :range-separator="range_separator" :placeholder="placeholder" :start-placeholder="start_placeholder" :end-placeholder="end_placeholder" :picker-options="pickerOptions()">
  </el-date-picker>
</template>
<script>
export default {
  name: 'dateComponents',
  props: {
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
      //
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
      return this.config.clearable || false
    },
    model () {
      return this.config.model || 'date'
    },
    range_separator () {
      return this.config.range_separator
    },
    value_format () {
      return this.config.value_format || 'yyyy-MM-dd'
    },
    placeholder () {
      return this.config.placeholder || '选择日期时间'
    },
    start_placeholder () {
      return this.config.start_placeholder || '选择开始时间'
    },
    end_placeholder () {
      return this.config.end_placeholder || '选择结束时间'
    }
  },
  methods: {
    pickerOptions () {
      const disabled_date = this.config.disabled_date || false
      const disabled_today = this.config.disabled_today || false
      const date_rule = this.config.date_rule && Object.prototype.toString.call(this.config.date_rule) === '[object Function]'
      if (date_rule) {
        return this.config.date_rule()
      }
      return {
        disabledDate: (time) => {
          if (disabled_date) {
            return time.getTime() < new Date() - 8.64e7
          } else if (disabled_today) {
            return time.getTime() < new Date()
          } else {
            return false
          }
        }
      }
    }
  }
}
</script>