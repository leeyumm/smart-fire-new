<template>
  <div class="form-item">
    <span>项目(客户)名称</span>
    <input type="text" @input="emitValue(value)" v-model="value" :placeholder="placeholder" :readonly="readonly">
    <span class="valid-hint" v-show="showHint">*必填</span>
  </div>
</template>

<script>
export default {
  props:{
    label:{
      type:String,
      default:'标签名'
    },
    showHint:{
      type:Boolean,
      default:true
    },
    value:{
      type:String
    },
    placeholder:{
      type:String
    },
    readonly:{
      type:Boolean,
      default:false
    }
  },
  methods:{
    emitValue(){
      this.$emit('input',value)
    }
  }
}
</script>

<style scoped>
.form-item {
  margin-bottom: 15px;
  font-size: 14px;
}
.form-item > span:first-child {
  display: inline-block;
  text-align: right;
  width: 100px;
  margin-right: 15px;
}
.form-item > input{
  border: 1px solid rgb(59, 61, 73);
  border-radius: 6px;
  padding: 8px 10px;
  vertical-align: middle;
  width: 200px;
  margin-right: 5px;
}
.form-item > input:focus,
.form-item > input:hover {
  border-color: #3a9fd3;
}
</style>