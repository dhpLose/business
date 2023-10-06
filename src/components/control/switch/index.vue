<template>
  <el-switch v-model="form[config.prop]" :disabled="disabled" :active-color="active_color" :inactive-color="inactive_color" :active-value="active_value" :inactive-value="inactive_value" :active-text="active_text" :inactive-text="inactive_text">
  </el-switch>
</template>
<script>
export default {
  name: 'switchComponents',
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
  computed: {
    disabled () {
      return this.config.disabled || false
    },
    active_value () { // 选中的值类型
      return this.config.active_value || true
    },
    inactive_value () { // 未选中的值类型
      return this.config.inactive_value || false
    },
    active_color () {
      return this.config.active_color || '#13ce66'
    },
    inactive_color () {
      return this.config.inactive_color || '#ff4949'
    },
    active_text () {
      return this.config.active_text || ''
    },
    inactive_text () {
      return this.config.active_text || ''
    }
  },
  data () {
    return {
      //
    }
  }
}
</script>