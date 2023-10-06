<template>
  <div>
    <el-table :data="tableData" @selection-change="handleSelectionChange" @sort-change="handleSortChange" style="width: 100%">
      <el-table-column v-if="checkbox" type="selection" width="55" align="center">
      </el-table-column>
      <el-table-column v-if="index" type="index" label="序号" width="50" align="center">
      </el-table-column>
      <el-table-column v-for="item in column" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width" :sortable="item.sortable" :sort-by="item.sort_by" :render-header="item.render_header">
        <template slot-scope="scope">
          <slot v-if="item.type === 'slot'" :name="item.slot_name" :data="scope.row"></slot>
          <component v-else :is="!item.type ? 'com-text': `com-${item.type}`" :data="scope.row" :config="item" :prop="item.prop" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
// 自动化规则，通过type属性，自动读取目录组件
// 自动化工程
// 参数1 路径
// 参数2 true 自动读取 control 子目录
// 参数3 文件后缀
const modules = {}
const files = require.context('../control', true, /\index.vue/)
files.keys().forEach(ele => {
  const key = ele.split("/")
  const name = key[1]
  const component = files(ele).default
  // 组件集成
  modules[`com-${name}`] = component
})
console.log(modules, '-modules-')
export default {
  name: 'Table',
  components: {
    ...modules
  },
  props: {
    checkbox: Boolean,
    index: Boolean,
    onLoad: Boolean,
    format: Function,
    initRequest: {
      type: Boolean,
      default: true
    },
    url: {
      type: String,
      default: '',
      require: true
    },
    method: {
      type: String,
      default: 'post'
    },
    column: {
      type: Array,
      default: () => ([])
    },
    checkList: {
      type: Array,
      default: () => ([])
    },
    data: {
      type: Object,
      default: () => ({})
    },
    prams: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      tableData: []
    }
  },
  beforeMount () {
    this.initRequest && this.getTableList()
  },
  methods: {
    getTableList () { // 获取表格信息
      if (!this.url) {
        return false
      }
      const request_data = {
        url: this.url,
        method: this.method
      }
      if (JSON.stringify(this.data) !== '{}') {
        request_data.data = this.data
      }
      if (JSON.stringify(this.data) !== '{}') {
        request_data.prams = this.prams
      }
      this.$axios(request_data).then(response => {
        let request_data = response.data && response.data.data || []
        if (this.format && typeof this.format === 'function') {
          request_data = this.format(request_data)
        }
        this.tableData = request_data || []
        // 回调数据
        this.onLoad && this.$emit('onload', request_data)
      })
    },
    handlerRequest () {
      this.getTableList()
    },
    handleSelectionChange (val) { // 复选框
      this.$emit('update:checkList', val)
    },
    handleSortChange ({ column, prop, order }) { // 远程排序
      const sort_by = column.sortBy
      console.log(sort_by, order, '-column, prop, order-')
    }
  }
}
</script>