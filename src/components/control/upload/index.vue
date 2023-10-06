<template>
  <div class="upload-box">
    <el-upload class="avatar-uploader" action="" :before-upload="handleBeforeUpload" :on-exceed="handleExceed" :http-request="handleRequest" :on-preview="handlePreview" :before-remove="handleBeforeRemove" :on-remove="handleRemove" :auto-upload="auto_upload" :show-file-list="show_file_list" :multiple="multiple" :accept="accept" :limit="limit">
      <el-button v-if="model === 'button'" type="primary" size="small">点击上传</el-button>
      <div v-if="model === 'card'" class="uplload-wrap" :class="{'is-round': is_round }" :style="[sizeStyle]">
        <img v-if="imageUrl" :src="imageUrl" width="100%" height="100%">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </div>

    </el-upload>
  </div>
</template>
<script>
export default {
  name: 'uploadComponents',
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
      imageUrl: ''
    }
  },
  computed: {
    url () {
      return this.config.url || '/api/upload/'
    },
    method () {
      return this.config.method || 'get'
    },
    model () {
      return this.config.model || 'button'
    },
    limit () {
      return this.config.limit || 1
    },
    accept () {
      return this.config.accept || '.pdf'
    },
    multiple () {
      return this.config.multiple || false
    },
    max_size () {
      return this.config.max_size || 50
    },
    show_file_list () {
      return this.config.show_file_list || false
    },
    auto_upload () {
      return this.config.auto_upload || true
    },
    is_round () {
      return this.config.is_round || false
    },
    sizeStyle () {
      const width = this.config.width || '100px'
      const height = this.config.width || '100px'
      return { width, height }
    }
  },
  methods: {
    handleExceed () {
      console.log('-超出-')
    },
    handleBeforeUpload (file) { // 上传前
      const boolean = file.size / 1024 / 1024 < this.max_size
      !boolean && this.$message({
        message: `请上传小于${this.max_size}M的文件`,
        type: 'warning'
      })
      return boolean
    },
    handleRequest (data) { // 自定义上传
      const file = data.file
      const form = new FormData()
      form.append('file', file)
      // 接口参数
      const request_data = {
        url: this.url,
        method: this.method,
        headers: {
          "Content-Type": 'multipart/form-data'
        },
        data: form
      }
      this.$axios(request_data).then(response => {
        this.imageUrl = response.data && response.data.url
      })
    },
    handlePreview (file) {
      console.log(file, '-handlePreview-')
    },
    handleBeforeRemove () {
      return new Promise((resolve, reject) => {
        this.$confirm('是否删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          resolve()
        }).catch(() => {
          reject()
        })
      })
    },
    handleRemove () { }
  }
}
</script>
<style lang="scss" scoped>
.uplload-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
  &:hover {
    border-color: #409eff;
  }
}
.is-round {
  border-radius: 50%;
}
</style>