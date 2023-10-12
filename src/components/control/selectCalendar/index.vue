<template>
  <el-select v-model="selectValue" multiple :placeholder="placeholder" :filterable="filterable" :filter-method="dataFilter" :popper-append-to-body="append_to_body" @visible-change="handleVisibleChange" @remove-tag="removeTag" @clear="clearAll" :clearable="clearable" style="width:100%" :disabled="disable">
    <el-option :value="selectTree" v-loading="treeLoading" element-loading-background="rgba(255, 255, 255, 0.5)" element-loading-text="loading" class="option-style" disabled>
      <el-tree :data="options" :props="default_props" class="tree-style" ref="treeNode" show-checkbox :node-key="default_props.value" :filter-node-method="filterNode" :default-expanded-keys="default_expanded_keys" :default-checked-keys="default_checked_keys" :check-strictly="check_strictly" @check-change="handleNodeChange">
      </el-tree>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'TreeSelect',
  props: {
    //
    form: {
      type: Object,
      default: () => ({})
    },
    config: {
      type: Object,
      default: () => ({})
    },
    // 父子不互相关联
    // checkStrictly: {
    //   type: Boolean,
    //   default: true
    // },
    // clearable: {
    //   type: Boolean,
    //   default: true
    // },
    // placeholder: {
    //   type: String,
    //   default: '请选择'
    // },
    //可用选项的数组
    // options: {
    //   type: Array,
    //   default: function () {
    //     return (
    //       [
    //         {
    //           id: 1,
    //           label: '节点1',
    //           children: [
    //             {
    //               id: 2,
    //               label: '节点1-1'
    //             },
    //             {
    //               id: 3,
    //               label: '节点1-2'
    //             }
    //           ]
    //         },
    //         {
    //           id: 4,
    //           label: '节点2',
    //           children: [
    //             {
    //               id: 5,
    //               label: '节点2-1'
    //             },
    //             {
    //               id: 6,
    //               label: '节点2-2'
    //             }
    //           ]
    //         },
    //         {
    //           id: 115,
    //           label: '节点115'
    //         },
    //         {
    //           id: 116,
    //           label: '节点116'
    //         },
    //         {
    //           id: 7,
    //           label: '节点7'
    //         },
    //         {
    //           id: 8,
    //           label: '节点8'
    //         },
    //         {
    //           id: 9,
    //           label: '节点8'
    //         },
    //         {
    //           id: 10,
    //           label: '节点10'
    //         },
    //         {
    //           id: 11,
    //           label: '节点11'
    //         },
    //         {
    //           id: 12,
    //           label: '节点12'
    //         },
    //         {
    //           id: 13,
    //           label: '节点13'
    //         },
    //         {
    //           id: 14,
    //           label: '节点14'
    //         },
    //         {
    //           id: 15,
    //           label: '节点15'
    //         }
    //       ]
    //     )
    //   }
    // },
    // 配置选项
    // default_props: {
    //   type: Object,
    //   default: () => ({ // 属性值为后端返回的对应的字段名
    //     children: 'children',
    //     label: 'label',
    //     value: 'id'
    //   })
    // },
  },
  data () {
    return {
      selectTree: [], // 绑定el-option的值
      selectValue: [], // 文本框中的标签
      treeLoading: false // 加载loading~
    }
  },
  computed: {
    append_to_body () {
      return this.config.append_to_body || false
    },
    disable () {
      return this.config.disable || false
    },
    clearable () {
      return this.config.clearable || true
    },
    filterable () {
      return this.config.filterable || true
    },
    placeholder () {
      return this.config.placeholder || '请选择'
    },
    check_strictly () { // 关联
      return this.config.check_strictly || true
    },
    default_checked_keys () { // 选中
      return this.config.default_checked_keys || []
    },
    default_expanded_keys () { // 展开
      return this.config.default_expanded_keys || []
    },
    options () {
      return this.config.options || []
    },
    default_props () {
      return this.config.default_props || { children: 'children', label: 'label', value: 'id' }
    }
  },
  watch: {
    // 监听回显的数据
    default_checked_keys: {
      handler (val) {
        if (val.length) {
          this.$nextTick(() => {
            let datalist = this.$refs.treeNode.getCheckedNodes()
            this.selectTree = datalist
            console.log(datalist.map(v => v[this.default_props.label]), '-1-')
            // this.selectValue = datalist.map(v => v[this.default_props.label])
          })
        }
      },
      immediate: true
    }
  },
  methods: {
    // 输入框关键字
    dataFilter (val) {
      this.$refs.treeNode.filter(val)
    },
    filterNode (value, data) { // 检索
      if (!value) return true
      return data[this.default_props.label].toLowerCase().indexOf(value.toLowerCase()) !== -1
    },
    handleVisibleChange (e) {
      if (!e) return false
      this.$refs.treeNode.filter('')
    },
    handleNodeChange (data) { // 复选框事件
      // debugger
      let datalist = this.$refs.treeNode.getCheckedNodes()
      this.selectTree = datalist
      console.log(datalist, '-datalist-', this.default_props.label, '--', this.default_props)
      this.selectValue = datalist.map(v => v[this.default_props.label])
      this.$emit('changeSelectDataList', this.selectTree)
    },
    // 移除单个标签
    removeTag (tagName) {
      this.selectTree = this.selectTree.filter(v => v[this.default_props.label] !== tagName)
      const selectTreeValue = this.selectTree.map(v => v[this.default_props.value])
      this.$nextTick(() => {
        this.$refs.treeNode.setCheckedKeys(selectTreeValue)
      })
      this.$emit('changeSelectDataList', this.selectTree)
    },
    // 文本框清空
    clearAll () {
      this.selectTree = []
      this.$refs.treeNode.setCheckedKeys([])
      this.$emit('changeSelectDataList', this.selectTree)
    }
  }

}
</script>

<style lang="scss" scoped>
/deep/.el-scrollbar {
  height: 280px;
  .el-select-dropdown__wrap {
    max-height: 280px;
    overflow: hidden;
    .el-select-dropdown__list {
      padding: 0;
    }
  }
}
.option-style {
  height: 280px;
  padding: 0 0 10px 0 !important;
  margin: 0;
  overflow-y: auto;
  cursor: default !important;
}
</style>
