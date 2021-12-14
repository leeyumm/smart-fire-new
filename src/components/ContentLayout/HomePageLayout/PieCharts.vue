<template>
    <div class="xu-box h100">
      <div class="xu-box-content xu-flex chart-wrapper">
        <div>
          <on-off-dev-pie @receivedData="receivedOnOffData($event)"></on-off-dev-pie>
        </div>
        <div>
          <two-rate-pie :onOffData="onOff" :abnorNorData="normalAndAbnoraml"></two-rate-pie>
        </div>
        <div>
          <normal-and-abnormal-dev-pie @receivedData="receivedNorData($event)"></normal-and-abnormal-dev-pie>
        </div>
      </div>
    </div>
</template>

<script>
import OnOffDevPie from './PieChartComp/OnOffDevPie.vue'
import NormalAndAbnormalDevPie from './PieChartComp/NormalAndAbnormalDevPie.vue'
import TwoRatePie from './PieChartComp/TwoRatePie.vue'
export default {
  components:{OnOffDevPie,NormalAndAbnormalDevPie,TwoRatePie},
  data(){
    return {
      normalAndAbnoraml:{},
      onOff:{}
    }
  },
  methods:{
    receivedNorData:function(data){
      this.normalAndAbnoraml = data
    },
    receivedOnOffData:function(data){
      this.onOff = data
    }
  }  
}
</script>

<style scoped>
.chart-wrapper > div {
  flex:1;
  height: 300px;
  box-sizing: border-box;
  padding: 5px;
}
.chart-wrapper > div:nth-child(2){
  border-left: 2px solid #3a9fd3;
  border-right: 2px solid #3a9fd3;
}
</style>