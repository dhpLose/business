<template>
  <el-dialog :title="title" :top="top" :width="width" :show-close="show_close" :visible.sync="visible" :custom-class="custom_class" :append-to-body="append_to_body" :destroy-on-close="destroy_on_close" :close-on-click-modal="close_on_click_modal" :modal-append-to-body="modal_append_to_body" @close="close" @open="open" @opened="opened">
    <slot />
    <div slot="footer" class="dialog-footer">
      <slot name="footer" />
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "DialogComponent",
  props: {
    title: {
      type: String,
      default: '靓仔'
    },
    top: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    },
    custom_class: {
      type: String,
      default: ''
    },
    flag: {
      type: Boolean,
      default: false
    },
    show_close: {
      type: Boolean,
      default: true
    },
    close_on_click_modal: {
      type: Boolean,
      default: true
    },
    destroy_on_close: {
      type: Boolean,
      default: false
    },
    append_to_body: {
      type: Boolean,
      default: false
    },
    modal_append_to_body: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      visible: false
    }
  },
  watch: {
    flag: {
      handler (val) {
        this.visible = val
      }
    }
  },
  methods: {
    close () {
      this.visible = false
      this.$emit("update:flag", false)
      this.$emit("callbackClose")
    },
    opened () {
      this.$emit("callbackOpened")
    },
    open () {
      this.$emit("callbackOpen")
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__header {
  padding: 20px 24px;
  background-color: #f7f4f4;
  border-bottom: 1px solid #e5e4e4;
  .el-dialog__title {
    font-size: 16px;
    font-weight: bold;
    line-height: 1;
  }
}
::v-deep .el-dialog__footer {
  padding: 20px;
  border-top: 1px solid #e5e4e4;
  background-color: #f7f4f4;
}
</style>