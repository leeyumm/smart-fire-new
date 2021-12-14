<template>
  <div class="modal-backdrop" @click.self="close">
    <div class="modal-wrapper">
      <slot>这是插槽的默认内容</slot>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    close:function(){
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top:0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
}

.modal-wrapper {
  position: relative;
  animation: ZoomIn 0.2s linear 0s;
  background-color: rgba(28, 62, 107, 1);
  padding: 10px;
  border:  1px solid #3a9fd3;
}

@keyframes ZoomIn {
  0% {
    transform: scale(0.5,0.5);
  }
  25% {
    transform: scale(1,1);
  }
  50% {
    transform: scale(1.2,1.2);
  }
  75% {
    transform: scale(1.1,1.1);
  }
  100% {
    transform: scale(1,1);
  }
}
</style>