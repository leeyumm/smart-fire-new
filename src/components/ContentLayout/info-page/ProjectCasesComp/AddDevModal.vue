<template>
  <xu-modal @close="close">
    <div class="add-dev-wrapper">
      <div v-for="form in formItems.slice(0,7)" :key='form.name' class="form-item">
        <span>{{ form.label }}</span>
        <input :type="form.formType" v-model="form.value">
        <span class="valid-hint" v-show="form.value === ''">*必填</span>
      </div>
      <div v-for="form in formItems.slice(7,9)" :key='form.name' class="form-item">
        <span>{{ form.label }}</span>
        <xu-sel v-model="form.value" :options="form.options"></xu-sel>
        <span class="valid-hint" v-show="form.value === ''">*必填</span>
      </div>
      <div class="form-item">
        <span>{{ formItems[9].label }}</span>
        <textarea v-model="formItems[9].value"></textarea>
      </div>
      <div class="btn-wrapper">
        <button class="xu-btn xu-btn-lg xu-btn-cancel" @click="reset()">重置</button>
        <button class="xu-btn xu-btn-lg xu-btn-success" @click="add()">添加</button>
      </div>
    </div>
  </xu-modal>
</template>

<script>
import XuModal from '@/xu-view/modal/XuModal.vue'
import XuSel from '@/xu-view/form/XuSel.vue'
import showAlert from '@/xu-view/tips/alert/XuAlert.js'
const TYPE = {
  '未知':0,
  '储压':1,
  '非储压':2
}
const COMMUNICATION = {
  '未知':0,
  'ZigBee':1,
  'NB-IoT':2
}
export default {
  components: {
    XuModal,
    XuSel
  },
  props:['project'],
  data(){
    return {
      formItems:[
        {label:'uuid(芯片编号)',name:'uuid',value:'',formType:'text'},
        {label:'设备编号',name:'simpleNumber',value:'',formType:'text'},
        {label:'发送周期(分钟)',name:'cycle',value:'',formType:'number'},
        {label:'设备安装位置',name:'location',value:'',formType:'text'},
        {label:'生产日期',name:'productionDate',value:this.$util.getFormatterDate().YYYYMMDD,formType:'date'},
        {label:'销售日期',name:'salesDate',value:this.$util.getFormatterDate().YYYYMMDD,formType:'date'},
        {label:'使用年限(年)',name:'serviceLife',value:'',formType:'number'},
        {label:'设备类型',name:'type',value:'',formType:'select',options:['储压','非储压','未知']},
        {label:'通信技术',name:'communication',value:'',formType:'select',options:['NB-IoT','ZigBee','未知']},
        {label:'备注',name:'remark',value:'',formType:'textarea'},
      ]
    }
  },
  methods:{
    close(){
      this.$emit('close')
    },
    reset(){
      this.formItems = this.formItems.map(ele => {
        if(ele.formType === 'date'){
          ele.value = this.$util.getFormatterDate().YYYYMMDD
        } else {
          ele.value = ''
        }
        return ele
      })
    },
    add(){
      const data = {}
      let isVaild = true
      this.formItems.forEach(ele => {
        if(ele.value === '' && ele.name !== 'remark'){
          isVaild = false
          return
        }
        if(ele.name === 'type'){
          data[ele.name] = TYPE[ele.value]
        } else if(ele.name === 'communication'){
          data[ele.name] = COMMUNICATION[ele.value]
        } else {
          data[ele.name] = ele.value
        }
      })
      data.projectId = this.project.projectId
      data.longitude = this.project.longitude
      data.latitude = this.project.latitude
      data.isEnable = true
      if(isVaild){
        this.$http['addOneDev'](data)
        .then(res => {
          console.log(res)
          this.$emit('addSuccess')
        })
      } else {
        showAlert('请按照要求填写后再提交','failure')
      }
    }
  },
}
</script>

<style scoped>
.add-dev-wrapper {
  width: 400px;
}
.btn-wrapper {
  font-size:14px;
  text-align:center;
}
</style>