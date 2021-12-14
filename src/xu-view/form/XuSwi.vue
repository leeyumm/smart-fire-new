<template>
  <div class="xu-swi-wrapper" @click="toggle()" :class="{'on':selValue,'off':!selValue}">
    <span class="toggle-circle"></span>
  </div>
</template>

<script>
export default {
  props:{
    value:{
      type:Boolean
    }
  },
  data(){
    return {
      selValue:this.value
    }
  },
  methods:{
    toggle(){
      this.selValue = !this.selValue
      this.$emit('input',this.selValue)
      this.$emit('toggle',this.selValue)
    }
  }
}
</script>

<style scoped>
.xu-swi-wrapper{
  display: inline-block;
  position: relative;
  width: 48px;
  height: 24px;
  border-radius: 12px;
  cursor: pointer;
  vertical-align: bottom;
  transition: background-color 0.2s;
  text-align: start;
}
.on {
  background-color: #1aa6ff;
}
.on > .toggle-circle {
  transform: translateX(1px);
}
.off {
  background-color: #999999;
}
.off > .toggle-circle {
  transform: translateX(23px);
}
.toggle-circle {
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #eeeeee;
  transition: transform 200ms ease-in 0s;
}
</style>