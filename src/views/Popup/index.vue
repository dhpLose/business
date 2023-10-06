<template>
  <div class="popup">
    <div @click="handleDialog">dialog</div>
    <m-dialog :flag.sync="dialog_add_flag" top="5vh" @callbackOpened="opened" @callbackOpen="open" @callbackClose="close">
      <div style="height: 100%">
        内容区域
      </div>
      <template v-slot:footer>
        <el-button type="text" @click="dialog_add_flag=false">取消</el-button>
        <el-button type="primary" @click="dialog_add_flag=false">确定</el-button>
      </template>
    </m-dialog>
  </div>
</template>
<script>
export default {
  name: 'popup',
  components: {
    'm-dialog': () => import("@/components/dialog")
  },
  data () {
    return {
      dialog_add_flag: false
    }
  },
  methods: {
    handleDialog () {
      this.dialog_add_flag = true
    },
    open () { },
    opened () { },
    close () { }
  }
}
</script>