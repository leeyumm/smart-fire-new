<template>
  <div id="xu-toastr-backdrop" @click.self="cancel" v-show="show">
    <div class="xu-toastr-wrapper">
      <div class="toastr-msg-wrapper">
        <span class="fa fa-warning"></span>
        <span>{{ msg }}</span>
      </div>
    <div>
        <button class="xu-btn xu-btn-sm xu-btn-cancel" @click="cancel">取消</button>
        <button class="xu-btn xu-btn-sm xu-btn-success" @click='confirm'>确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
#xu-toastr-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1025;
}
.xu-toastr-wrapper {
  background-color: rgb(39, 63, 95);
  animation: ZoomIn .2s;
  padding: 15px 20px;
  border-radius: 5px;
  border: #3a9fd3 1px solid;
  text-align: center;
}
.toastr-msg-wrapper > span{
  display: block;
  margin-bottom: 10px;
}
.toastr-msg-wrapper > span:first-child {
  color: coral;
  font-size: 20px;
}
.toastr-msg-wrapper > span:last-child {
  color: #f1f1f1;
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