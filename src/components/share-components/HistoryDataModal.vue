<template>
  <xu-modal @close='close'>
    <div class="title">
      <span>{{device.uuid}}的历史数据</span>
      <div class="data-size-wrapper">
        <span :class="{'active':sizeNow === ONE_DAY}" @click="getData(ONE_DAY)">一天以内</span>
        <span :class="{'active':sizeNow === THREE_DAY}" @click="getData(THREE_DAY)">三天以内</span>
        <span :class="{'active':sizeNow === TEN_DAY}" @click="getData(TEN_DAY)">十天以内</span>
      </div>
    </div>
    <div class="content">
      <div class="stress-chart" ref="stress-chart">1</div>
      <div class="temperature-chart" ref="temperature-chart">2</div>
    </div>
  </xu-modal>
</template>

<script>
import XuModal from '@/xu-view/modal/XuModal'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
const option = {
  color:'',
  tooltip:{
    trigger: 'axis',
  },
  grid: {
    top: '10px',
    left: '40px',
    right: '20px',
    bottom: '10px',
    containLabel: true
  },
  yAxis: {
    type:'value',
    name:'',
    nameLocation:'center',
    nameGap:40,
    min:0,
    axisLine:{
      lineStyle:{
        color:'#f7f7f7'
      }
    },
    axisLabel:{
      color:'#e0e3e9',
      fontSize:14
    },
    nameTextStyle:{
      color:'#e0e3e9',
      fontSize:16
    }
  },
  xAxis: {
    type:'time',
    boundaryGap: false,
    axisLine:{
      lineStyle:{
        color:'#f7f7f7'
      }
    },
    axisLabel:{
      interval:'auto',
      color:'#e0e3e9',
      fontSize:14
    },
    nameTextStyle:{
      color:'#e0e3e9'
    }
  },
  dataset: {
    dimensions:[{name:'time',type:'time'},{name:'value',type:'float'}],
    source: {
      'time':[],
      'value':[]
    }
  },
  series: [
    {
      type: 'line',
      smooth:true,
      name:'',
      encode:{
        x:'time',
        y:'value'
      }
    }
  ]
}

export default {
  components:{XuModal},
  props:['device'],
  data(){
    return {
      historyData:[],
      ONE_DAY:24,
      THREE_DAY:72,
      TEN_DAY:240,
      sizeNow:24,
    }
  },
  methods:{
    close:function(){
      this.$emit('close')
    },
    drawStress:function(x,y){
      const chart = echarts.init(this.$refs['stress-chart'])
      option.color = '#DC143C'
      option.yAxis.name = '压强/Mpa'
      option.dataset.source['time'] = x;
      option.dataset.source['value'] = y;
      chart.setOption(option)
    },
    drawTemperature:function(x,y){
      const chart = echarts.init(this.$refs['temperature-chart'])
      option.color = '#01a753'
      option.yAxis.name = '温度/℃'
      option.dataset.source['time'] = x;
      option.dataset.source['value'] = y;
      chart.setOption(option)
    },
    getData:function(size=this.ONE_DAY){
      this.sizeNow = size
      this.$http['getSensorDataInOneDev']({params:{uuid:this.device.uuid,size:size}})
      .then(res => {
        const {msg} = res
        const timeArr = msg.map(ele => this.$util.getFormatterDate(ele.gmtCreate*1000).YYYYMMDDHHMM).reverse()
        const stressArr = msg.map(ele => ele.stress).reverse() 
        const temperatureArr = msg.map(ele => ele.temperature).reverse() 
        this.drawStress(timeArr,stressArr)
        this.drawTemperature(timeArr,temperatureArr)
      })
    }
  },
  created(){
    this.getData()
  }
}
</script>

<style scoped>
.title {
  margin-bottom: 10px;
  color: #05bbca;
  position: relative;
}
.stress-chart,
.temperature-chart {
  height: 350px;
  width: 800px;
}
.stress-chart {
  margin-bottom: 15px;
}
.data-size-wrapper {
  position: absolute;
  top: 5px;
  right: 20px;
  font-size: 14px;
}
.data-size-wrapper > span {
  display: inline-block;
  padding: 2px 8px;
  border: 1px solid #3a9fd3;
  border-radius: 5px;
  cursor: pointer;
}
.data-size-wrapper > span:nth-child(2){
  margin: 0 15px;
}
.active {
  background-color: rgb(19, 43, 75);
}
</style>