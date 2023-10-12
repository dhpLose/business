<template>
  <div class="about">
    <m-form :list="form_item" :field="form_field" :button="form_button" :before-submit="submitForm" />
  </div>
</template>
<script>
export default {
  name: 'about',
  components: {
    'm-form': () => import("@/components/form")
  },
  data () {
    let validateName = (rule, value, callback) => {
      if (value && (value !== '10')) {
        callback(new Error('请输入10'));
      } else {
        callback();
      }
    }
    return {
      form_field: {
        name: 'liangzai',
        class_room: '',
        class_room1: '',
        gender: '',
        age: '',
        phone: '',
        food: '',
        car: [],
        createDate: '',
        switch: 0
      },
      form_item: [
        {
          type: 'selectCalendar',
          prop: '',
          span: 12,
          label: '树形结构多选：',
          required: true,
          message: '请勾选',
          rules: [
          ],
          callback: (data) => {
            // console.log(data)
          },
          options: [
            {
              id: 1,
              label: '节点1',
              children: [
                {
                  id: 2,
                  label: '节点1-1'
                },
                {
                  id: 3,
                  label: '节点1-2'
                }
              ]
            },
            {
              id: 4,
              label: '节点2',
              children: [
                {
                  id: 5,
                  label: '节点2-1'
                },
                {
                  id: 6,
                  label: '节点2-2'
                }
              ]
            },
            {
              id: 115,
              label: '节点115'
            },
            {
              id: 116,
              label: '节点116'
            },
            {
              id: 7,
              label: '节点7'
            },
            {
              id: 8,
              label: '节点8'
            },
            {
              id: 9,
              label: '节点8'
            },
            {
              id: 10,
              label: '节点10'
            },
            {
              id: 11,
              label: '节点11'
            },
            {
              id: 12,
              label: '节点12'
            },
            {
              id: 13,
              label: '节点13'
            },
            {
              id: 14,
              label: '节点14'
            },
            {
              id: 15,
              label: '节点15'
            }
          ]
        },
        {
          type: 'upload',
          model: 'button',
          prop: 'file',
          span: 12,
          limit: 11,
          multiple: true,
          label: '上传图片',
          required: false,
          width: '150px',
          height: '150px',
          message: '请选择上传图片',
          url: '/api/upload/',
          method: 'post',
          max_size: 2,
          show_file_list: true,
          is_round: false,
          accept: '.png,.pdf,.doc,.docx,.xls,.xlsx,.zip',
        },
        {
          type: 'input',
          prop: 'name',
          span: 12,
          label: '活动名称',
          required: true,
          message: '请输入活动名称',
          rules: [
          ],
          callback: (data) => {
            // console.log(data)
          }
        },
        {
          type: 'switch',
          prop: 'switch',
          span: 12,
          label: '开关',
          required: true,
          message: '请选择开关',
          rules: [
          ],
          callback: (data) => {
            // console.log(data)
          }
        },
        {
          type: 'select',
          prop: 'class_room',
          span: 12,
          label: '教室',
          required: true,
          props: {
            label: 'name',
            value: 'id'
          },
          options: [
            { name: 'vue.js', id: '1' },
            { name: 'react.js', id: '2' },
          ]
        },
        {
          type: 'select',
          prop: 'class_room1',
          span: 12,
          label: '教室-1',
          required: true,
          callbackRequest: () => {
            return this.getClassRoom()
          },
          callback: (data) => {
            console.log(data)
          }
          // props: {
          //   label: 'name',
          //   value: 'id'
          // },
          // options: [
          //   { name: 'vue.js', id: '1' },
          //   { name: 'react.js', id: '2' },
          // ]
        },
        {
          type: 'checkbox',
          prop: 'car',
          span: 12,
          label: '交通工具',
          required: true,
          options: [
            { label: '本田', value: '1' },
            { label: '丰田', value: '2' },
          ]
        },
        {
          type: 'radio',
          prop: 'food',
          label: '食物',
          span: 12,
          required: true,
          options: [
            { label: 'vue.js', value: '1' },
            { label: 'react.js', value: '2' },
          ]
        },
        {
          type: 'date',
          model: 'date', // year/month/date/week/ datetime/datetimerange/daterange
          prop: 'createDate',
          span: 12,
          label: '日期',
          required: true,
          disabled_date: false,
          disabled_today: false,
          date_rule: () => {
            return {
              disabledDate: (time) => {
                return time.getTime() > new Date() - 8.64e7
              }
            }

          },
          placeholder: '请选择创建日期',
          rules: [
          ]
        }
      ],
      form_button: [
        // 确定 取消 其他按钮
        {
          label: '确定',
          key: 'submit',
          type: 'primary'
        },
        {
          label: '取消',
          key: 'cancel',
          type: 'primary'
        },
        {
          label: '下一步',
          key: 'next',
          type: 'primary',
          callback: (data) => this.next(data)
        },
      ]
    }
  },
  methods: {
    submitForm () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 2000);
      })
    },
    next (data) {
      console.log('-next-')
    },
    getClassRoom () {
      return new Promise((resolve, reject) => {
        this.$axios({
          url: '/api/classroom/',
          method: 'get'
        }).then(res => {
          let data = res.data && res.data.data
          let list = data.map(ele => ({ label: ele.class_name, value: ele.id, ...ele }))
          resolve(list)
        }).catch(() => {
          reject()
        })
      })
    }
  }
}
</script>
