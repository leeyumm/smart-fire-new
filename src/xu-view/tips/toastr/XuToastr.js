import Vue from 'vue'
import XuToastr from './XuToastr.vue'

const showToastr = function(msg,callback){
  const myComponent = Vue.extend(XuToastr)
  const ele = document.getElementById('xu-toastr-backdrop')
  if(ele){
    return
  }
  const toastr = new myComponent({
    el:document.createElement('div'),
    data(){
      return {
        show:true,
        msg:msg
      }
    },
    methods:{
      cancel(){
        this.show = false;
        document.body.removeChild(toastr.$el);
      },
      confirm(){
        this.show = false;
        document.body.removeChild(toastr.$el);
        callback();
      }
    }
  })
  document.body.appendChild(toastr.$el);
}
export default showToastr