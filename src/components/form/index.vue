<template>
  <el-form ref="form" :model="field" :rules="rules" label-width="80px">
    <el-form-item v-for="item in form_item" :key="item.id" :label="item.label" :prop="item.prop" :rules="item.rules">
      <!-- <template v-if="item.type === 'input'">
        <el-input v-model="field[item.prop]"></el-input>
      </template>
      <template v-if="item.type === 'select'">
        <el-select v-model="field[item.prop]" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </template> -->
      <component :value.sync="field[item.prop]" :is="!item.type ? 'com-text': `com-${item.type}`" :config="item" :form="field" />
    </el-form-item>
    <el-form-item>
      <el-button v-for="item in button" :type="item.type" :loading="item.loading" @click="handlerButton(item)">{{ item.label }}</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
const modules = {}
const files = require.context('../control', true, /\index.vue/)
files.keys().forEach(ele => {
  const key = ele.split("/")
  const name = key[1]
  const component = files(ele).default
  // 组件集成
  modules[`com-${name}`] = component
})
//
import createRules from './createRules'
export default {
  name: 'Form',
  components: {
    ...modules
  },
  props: {
    item: {
      type: Array,
      default: () => ([])
    },
    button: {
      type: Array,
      default: () => ([])
    },
    field: {
      type: Object,
      default: () => ({})
    },
    rules: {
      type: Object,
      default: () => ({})
    },
    beforeSubmit: Function
  },
  data () {
    return {
      // rules: {},
      form_item: [],
      form_rules: {}
    }
  },
  beforeMount () {
    this.form_item = createRules(this.item)
    // this.form_rules = createRules(this.rules)
  },
  methods: {
    submit (data) {
      // 表单校验
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (typeof this.beforeSubmit === 'function') {
            this.$set(data, 'loading', true)
            this.beforeSubmit().then(response => {
              this.$set(data, 'loading', false)
            }).catch(() => {
              this.$set(data, 'loading', false)
            })
          }
        }
      })
    },
    cancel () {
      // 表单重置
      this.$refs['form'].resetFields();
    },
    handlerButton (data) {
      if (data.key === 'submit') {
        this.submit(data)
        data.callback && data.callback(data)
        return false
      }
      if (data.key === 'cancel') {
        this.cancel(data)
        data.callback && data.callback(data)
        return false
      }
      // 其他按钮
      data.callback && data.callback(data)
    }
  }
}
</script>