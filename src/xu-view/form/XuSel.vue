<template>
  <div class="xu-sel-wrapper">
    <input 
    type="text" 
    @click="showOptions" 
    @blur="closeOptions" 
    :value="selOption"
    placeholder="--请选择--" 
    readonly>
    <ul class="options-wrapper" v-show='isOptionsShow' :class="{'slide-down-up':isOptionsShow}">
      <li v-for='(option,index) in options' :key="index" @mousedown="sel(option)">
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props:{
    //备选项
    options:{
      type:Array,
    },
    //已选择
    value:{
      type:String
    }
  },
  data(){
    return {
      isOptionsShow:false,
      selOption:''
    }
  },
  methods:{
    showOptions(){
      this.isOptionsShow = true
    },
    closeOptions(){
      this.isOptionsShow = false
    },
    sel(option){
      this.selOption = option
      this.$emit('input',option)
      this.closeOptions()
    }
  },
  watch:{
    value:{
      handler(newVal){
        this.selOption = newVal
      },
      immediate:true
    }
  }
}
</script>

<style scoped>
.xu-sel-wrapper {
  position: relative;
  color: #f1f1f1;
  display: inline-block;
}
.xu-sel-wrapper > input {
  border: 1px solid rgb(59, 61, 73);
  border-radius: 6px;
  padding: 8px 10px;
  vertical-align: middle;
  width: 100px;
  margin-right: 5px;
  box-sizing: border-box;
  cursor: pointer;
  text-align: center;
}
.options-wrapper {
  position: absolute;
  top:35px;
  width: 100px;
  left: 0;
  z-index: 1024;
  box-sizing: border-box;
  border: 1px solid #3a9fd3;
  max-height: 150px;
  background-color: rgba(28, 62, 107, 1);
  font-size: 14px;
}
.slide-down-up {
  animation: slideDownUp 0.2s;
}
.options-wrapper > li {
  padding: 5px 10px;
  cursor: pointer;
  text-align: center;
}
.options-wrapper > li:hover {
  background-color: rgb(22, 47, 80);
}



@keyframes slideDownUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>