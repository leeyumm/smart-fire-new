<template>
  <xu-modal @close="close">
    <div class="edit-modal-wrapper">
      <div v-for="(form,index) in formItems.slice(0,5)" :key='index' class="form-item">
        <span>{{ form.label }}</span>
        <input :type="form.formType" v-model="form.value">
        <span class="valid-hint" v-show="form.value === ''">*必填</span>
      </div>
      <div class="form-item">
        <span>{{ formItems[5].label }}</span>
        <textarea v-model="formItems[5].value"></textarea>
      </div>
      <div class="btn-wrapper">
        <button class="xu-btn xu-btn-lg xu-btn-cancel" @click="reset()">重置</button>
        <button class="xu-btn xu-btn-lg xu-btn-success" @click="edit()">修改</button>
      </div>
    </div>
  </xu-modal>
</template>

<script>
import XuModal from '@/xu-view/modal/XuModal.vue'
import showAlert from '@/xu-view/tips/alert/XuAlert.js'
export default {
  components: {
    XuModal
  },
  props:['project'],
  data(){
    return{
      formItems:[
        {label:'项目(客户)名称',name:'projectName',value:'',formType:'text'},
        {label:'项目地址',name:'location',value:'',formType:'text'},
        {label:'经度',name:'longitude',value:'',formType:'text'},
        {label:'纬度',name:'latitude',value:'',formType:'text'},
        {label:'完工日期',name:'projectFinishDate',value:'',formType:'date'},
        {label:'备注',name:'remark',value:'',formType:'textarea'},
      ]
    }
  },
  methods:{
    close(){
      this.$emit('close')
    },
    initFormData(project){
      this.formItems = this.formItems.map(ele => {
        ele.value = project[ele.name]
        return ele
      })
    },
    reset(){
      this.initFormData(this.project)
    },
    edit(){
      const data = {}
      let isVaild = true
      this.formItems.forEach(ele => {
        if(ele.value === '' && ele.name !== 'remark'){
          isVaild = false
          return
        }
        data[ele.name] = ele.value
      })
      if(isVaild){
        data.projectId = this.project.projectId
        this.$http['editOneProject'](data)
        .then(res => {
          this.$emit('editSuccess')
        })
      } else {
        showAlert('请按照要求修改后再提交','failure')
      }
    }
  },
  created() {
    this.initFormData(this.project)
  }
}
</script>

<style scoped>
.edit-modal-wrapper {
  width:400px;
}
.btn-wrapper {
  font-size:14px;
  text-align:center;
}
</style>