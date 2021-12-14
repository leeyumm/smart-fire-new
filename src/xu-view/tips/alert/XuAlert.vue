<template>
  <div class="xu-alert-wrapper" v-show='show' :class="style">
    {{msg}}
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.xu-alert-wrapper {
  position: fixed;
  top:50%;
  left: 50%;
  text-align: center;
  transform: translateX(-50%) translateY(-50%);
  background-color: rgba(0,0,0,0.3);
  animation: ZoomIn .2s;
  padding: 15px 20px;
  border-radius: 5px;
  z-index: 1024;
}
.success {
  color: #f1f1f1;
}
.failure {
  color: #dc3545;
}
@keyframes ZoomIn {
  0% {
    opacity: 0;
  }
  25% {
    opacity: 0.25;
  }
  50% {
    opacity: 0.5;
  }
  75% {
    opacity: 0.75;
  }
  100% {
    opacity: 1;
  }
}
</style>