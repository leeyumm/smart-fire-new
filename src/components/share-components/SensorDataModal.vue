<template>
  <xu-modal @close='close'>
    <div class="table-wrapper xu-add-scrollBar">
      <table class="xu-table-center xu-table xu-table-hover xu-table-no-border xu-table-lg">
        <thead>
          <tr>
            <th>uuid</th>
            <th>温度/℃</th>
            <th>压强/Mpa</th>
            <th>状态</th>
            <th>失效原因</th>
            <th>历史数据</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data,index) in sensorData" :key="index">
            <td>{{ data.uuid }}</td>
            <td>{{ data.temperature }}</td>
            <td>{{ data.stress }}</td>
            <td>
              <!-- <span class="xu-badge" 
                    :class="{'xu-badge-success':data.state===1,
                             'xu-badge-warning':data.state===0,
                             'xu-badge-danger':data.state===-1,}">
                {{ data.state | fixState}}
              </span> -->

                <span class="xu-badge" 
                    :class="{'xu-badge-success':data.state===1,
                             'xu-badge-warning':data.state===0,
                             'xu-badge-danger':data.state===-1,}">
                {{ data.state | fixState}}
              </span>





              <!-- <span class="xu-badge" 
                    :class="{'xu-badge-success':data.isOnline,
                             'xu-badge-danger':!data.isOnline,}">
                {{ data.isOnline | fixIsOnline }}
              </span> -->

                   <span class="xu-badge" 
                    :class="{'xu-badge-success':data.isOnline,
                             'xu-badge-danger':!data.isOnline,}">
                {{ data.isOnline | fixIsOnline }}
              </span>




            </td>
            <td>{{ data.invalidReason | fixFailureReason}}</td>
            <td>
              <button class=" xu-btn xu-btn-sm xu-btn-primary" @click="showModal(data)">
                <span class="fa fa-line-chart"></span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 历史数据弹窗 -->
    <history-data-modal
    @close="isModalShow = false" 
    :device="deviceNow" 
    v-if="isModalShow"></history-data-modal>
  </xu-modal>
</template>

<script>
import XuModal from '@/xu-view/modal/XuModal'
import HistoryDataModal from './HistoryDataModal.vue'
export default {
  components:{XuModal,HistoryDataModal},
  props:{
    project:{
      type:Object,
    },
  },
  data(){
    return {
      sensorData:[],
      deviceNow:null,
      isModalShow:false,
      timer:null
    }
  },
  methods:{
    getData:function(){
      this.$http['getSensorDataInOneProject']({params:{projectId:this.project.projectId}})
      .then(res => {
        const {msg} = res
        this.sensorData = msg
        clearInterval(this.timer)
        this.timer = setInterval(() => {
          this.getData()
          }, 10000);
        })
    },
    close:function(){
      this.$emit('close')
    },
    //显示弹窗
    showModal:function(device){
      this.deviceNow = device
      this.isModalShow = true
    }
  },
  filters:{
    fixIsOnline:function (value) {
      switch (value) {
        case true:
          return '在线';
        case false:
          return '离线';
        default:
          return 'unknown'
      }
    },
    fixState:function (value) {
      switch (value) {
        case 1:
          return '有效';
        case 0:
          return '未知';
        case -1:
          return '无效';
        default:
          return 'unknown'
      }
    },
    fixFailureReason:function (value) {
      switch (value) {
        case 0:
          return '';
        case 1:
          return '压力错误';
        case 2:
          return '温度错误';
        case 3:
          return '设备离线';
        case 4:
          return '设备未启用';
        default:
          return '未知原因'

      }
    }
  },
  created(){
    this.getData()
  },
  beforeDestroy(){
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
.table-wrapper {
  max-height: 500px;
  width: 700px;
}
</style>