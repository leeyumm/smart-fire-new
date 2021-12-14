import Vue from 'vue'
import XuAlert from './XuAlert.vue'

const showAlert = function(msg,style='success'){
  const myComponent = Vue.extend(XuAlert)
  const alert = new myComponent({
    el:document.createElement('div'),
    data(){
      return {
        show:true,
        msg:msg,
        style:style
      }
    },
    methods:{
      disappear(){
        setTimeout(()=>{
          this.show = false,
          document.body.removeChild(alert.$el)
        },2000)
      }
    },
    mounted(){
      this.disappear()
    }
  })
  document.body.appendChild(alert.$el)
}
export default showAlert