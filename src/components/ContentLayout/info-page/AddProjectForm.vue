<template>
  <div class="xu-box h100">
    <div class="xu-box-title">新建项目</div>
    <div class="xu-box-content">
      <div class="form-item">
        <span>项目(客户)名称</span>
        <input type="text" v-model="formData.projectName">
        <span class="valid-hint" v-show="formData.projectName === ''">*必填</span>
      </div>
      <div class="form-item">
        <span>项目所在省</span>
        <input type="text" v-model="province" @change="emitProvince(province)">
        <span class="valid-hint" v-show="province === ''">*必填</span>
      </div>
      <div class="form-item">
        <span>项目具体位置</span>
        <input type="text" v-model="formData.location" @change="emitLocation(formData.location)">
        <span class="valid-hint" v-show="formData.location === ''">*必填</span>
      </div>
      <div class="form-item">
        <span>经度</span>
        <input type="text" placeholder="请在地图中选择" readonly v-model="formData.longitude">
        <span class="valid-hint" v-show="formData.longitude === ''">*必填</span>
      </div>
      <div class="form-item">
        <span>纬度</span>
        <input type="text" placeholder="请在地图中选择" readonly v-model="formData.latitude">
        <span class="valid-hint" v-show="formData.latitude === ''">*必填</span>
      </div>
      <div class="form-item">
        <span>完工日期</span>
        <input type="date" v-model="formData.projectFinishDate">
        <span class="valid-hint" v-show="formData.projectFinishDate === ''">*必填</span>
      </div>
      <div class="form-item">
        <span>备注</span>
        <textarea v-model="formData.remark"></textarea>
      </div>
      <div class="btn-wrapper">
        <button class="xu-btn xu-btn-lg xu-btn-cancel" @click="reset()">重置</button>
        <button 
        class="xu-btn xu-btn-lg xu-btn-success" 
        @click="submit()">
        提交
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import showAlert from '@/xu-view/tips/alert/XuAlert.js'
export default {
  props:{
    lngAndLat:{
      type:Object
    }
  },
  data(){
    return {
      province:'重庆',
      formData:{
        projectName:'',
        location:'',
        longitude:'',
        latitude:'',
        projectFinishDate:this.$util.getFormatterDate().YYYYMMDD,
        remark:''
      },
      cantSubmit: true
    }
  },
  methods:{
    emitProvince(province){
      this.$emit('selProvince',province)
    },
    emitLocation(loc){
      this.$emit('selLocation',loc)
    },
    //重置按钮
    reset(){
      this.province = '重庆'
      this.emitProvince('重庆')
      this.formData.projectName = ''
      this.formData.location = ''
      this.formData.longitude = ''
      this.formData.latitude = ''
      this.formData.projectFinishDate = this.$util.getFormatterDate().YYYYMMDD
      this.formData.remark = ''
    },
    //提交按钮
    submit(){
      for(let key in this.formData){
        if(this.formData[key] === '' && key !== 'remark'){
          showAlert('请按照要求填写后再提交','failure')
          return
        }
      }
      this.$http['addOneProject'](this.formData)
      .then(res => {
        this.$emit('submitSuccess')
        this.reset()
      })
    }
  },
  watch:{
    lngAndLat:{
      handler(newVal){
        this.formData.longitude = newVal.lng
        this.formData.latitude = newVal.lat
      },
      deep:true
    }
  }
}
</script>

<style scoped>
.btn-wrapper {
  font-size: 14px;
}
.btn-wrapper > button:last-child {
  float: right;
}
</style>