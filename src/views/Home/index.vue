<template>
  <div class="home">
    <!-- table使用 -->
    <m-table ref="table" :column="column" :check-list.sync="checkList" checkbox index :on-load="true" url="/api/name/" :data="data_argument" :init-request="false" :format="formatData" @onload="onload">
      <template v-slot:operation="{ data }">
        <el-button type="primary" @click="handleUpdate(data)">修改</el-button>
        <el-button type="danger">删除</el-button>
      </template>
    </m-table>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
    // 表格
    'm-table': () => import('@/components/table')
  },
  data () {
    return {
      // 表格
      data_argument: {
        name: 1
      },
      prams_argument: {
        name: 1
      },
      column: [
        {
          type: 'function',
          label: '日期',
          prop: 'create_date',
          width: 200,
          sortable: 'custom',
          sort_by: 'xiaopeng',
          callback: (row) => {
            return row['create_date']
          }
        },
        {
          label: '名称',
          prop: 'name',
        },
        {
          label: '地址',
          prop: 'address',
        },
        {
          label: '年龄',
          prop: 'age',
        },
        {
          type: 'slot',
          label: '操作',
          prop: 'operation',
          slot_name: 'operation',
          render_header: (h, { column, $index }) => {
            return (
              <div>
                <p style="margin: 0; padding: 0">操作</p>
                <el-input value="搜索" />
              </div>
            )
          }
        },
      ],
      checkList: []
    }
  },
  mounted () {
    // 表格
    setTimeout(() => {
      this.$refs.table && this.$refs.table.handlerRequest()
    }, 500);
  },
  methods: {
    // 表格
    handleUpdate (row) {
      // console.log(row, '-修改-')
    },
    onload (data) {
      // console.log(data, '-onload-')
    },
    formatData (data) { // 格式化子组件数据
      // console.log(data, '-format-')
      return data.slice(0, 3)
    }
  }
}
</script>
